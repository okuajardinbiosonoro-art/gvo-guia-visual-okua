#!/usr/bin/env node

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import process from 'node:process';
import QRCode from 'qrcode';

const require = createRequire(import.meta.url);
const { ENTRY_TOKEN, QR_TOKENS } = require('@gvo/shared');

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DEFAULT_OUT_DIR = 'content/qr/generated';
const DEFAULT_MANIFEST_NAME = 'qr-manifest';

function parseArgs(argv) {
  const result = {
    _: [],
  };

  for (let index = 0; index < argv.length; index += 1) {
    const current = argv[index];
    if (!current.startsWith('--')) {
      result._.push(current);
      continue;
    }

    const inline = current.includes('=') ? current.slice(2).split(/=(.*)/s, 2) : null;
    if (inline) {
      result[inline[0]] = inline[1];
      continue;
    }

    const key = current.slice(2);
    const next = argv[index + 1];
    if (next && !next.startsWith('--')) {
      result[key] = next;
      index += 1;
    } else {
      result[key] = true;
    }
  }

  return result;
}

function normalizeBaseUrl(rawValue) {
  const value = String(rawValue ?? '').trim();
  if (!value) {
    throw new Error('Base URL vacía. Pasa --base-url, GVO_QR_BASE_URL o --base-url-file.');
  }

  const parsed = new URL(value);
  if (!['http:', 'https:'].includes(parsed.protocol)) {
    throw new Error(`Base URL inválida: ${value}`);
  }

  return value.replace(/\/+$/, '');
}

function resolveRepoPath(inputPath) {
  if (!inputPath) return null;
  return resolve(repoRoot, inputPath);
}

async function readBaseUrlFromFile(filePath) {
  const resolvedPath = resolveRepoPath(filePath);
  if (!resolvedPath || !existsSync(resolvedPath)) {
    throw new Error(`No se encontró el archivo de base URL: ${filePath}`);
  }

  const raw = await readFile(resolvedPath, 'utf8');
  const lines = raw
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith('#'));

  if (lines.length === 0) {
    throw new Error(`El archivo de base URL está vacío: ${filePath}`);
  }

  return lines[0];
}

function toPilotUrl(baseUrl, relativePath) {
  return new URL(relativePath.replace(/^\/+/, ''), `${baseUrl}/`).toString();
}

function buildQrRecords(baseUrl) {
  const stationEntries = Object.entries(QR_TOKENS)
    .map(([token, stationId]) => ({
      kind: 'station',
      logicalName: `Estación ${stationId}`,
      stationId,
      token,
      relativePath: `qr/${token}`,
      fileName: `station-${stationId}-${token}.svg`,
    }))
    .sort((left, right) => left.stationId - right.stationId);

  return [
    {
      kind: 'entry',
      logicalName: 'Entrada',
      token: ENTRY_TOKEN,
      relativePath: `entry/${ENTRY_TOKEN}`,
      fileName: `entry-${ENTRY_TOKEN}.svg`,
    },
    ...stationEntries,
  ].map((record) => ({
    ...record,
    url: toPilotUrl(baseUrl, record.relativePath),
  }));
}

function escapeMarkdown(value) {
  return String(value).replace(/\|/g, '\\|');
}

function buildManifestMarkdown(manifest) {
  const lines = [
    '# Manifiesto QR del piloto',
    '',
    `- Base URL: \`${manifest.baseUrl}\``,
    `- Generado: \`${manifest.generatedAt}\``,
    '',
    '| Tipo | Nombre | Token | URL | Archivo |',
    '| --- | --- | --- | --- | --- |',
  ];

  for (const item of manifest.items) {
    lines.push(
      `| ${escapeMarkdown(item.kind)} | ${escapeMarkdown(item.logicalName)} | \`${escapeMarkdown(item.token)}\` | \`${escapeMarkdown(item.url)}\` | \`${escapeMarkdown(item.fileName)}\` |`,
    );
  }

  lines.push('', '## Notas', '', '- Este manifiesto se regenera con `node scripts/generate-qr-assets.mjs --base-url <BASE_URL>`.', '- Si la base URL final cambia, vuelve a generar antes de imprimir.', '');

  return lines.join('\n');
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const positional = args._[0] ?? null;
  const positionalFile = positional && /\.txt$/i.test(positional) ? positional : null;
  const positionalBaseUrl = positional && !/\.txt$/i.test(positional) ? positional : null;
  const baseUrlSource =
    args['base-url'] ??
    process.env.GVO_QR_BASE_URL ??
    (args['base-url-file'] ? await readBaseUrlFromFile(args['base-url-file']) : null) ??
    (positionalFile ? await readBaseUrlFromFile(positionalFile) : null) ??
    positionalBaseUrl;

  const baseUrl = normalizeBaseUrl(baseUrlSource);
  const outDir = resolveRepoPath(args['out-dir'] ?? DEFAULT_OUT_DIR);
  const manifestStem = args.manifest ?? DEFAULT_MANIFEST_NAME;
  const manifestJsonPath = join(outDir, `${manifestStem}.json`);
  const manifestMarkdownPath = join(outDir, `${manifestStem}.md`);

  await mkdir(outDir, { recursive: true });

  const items = buildQrRecords(baseUrl);
  const generatedAt = new Date().toISOString();

  for (const item of items) {
    const svg = await QRCode.toString(item.url, {
      type: 'svg',
      errorCorrectionLevel: 'M',
      margin: 1,
      width: 1024,
    });

    await writeFile(join(outDir, item.fileName), svg, 'utf8');
  }

  const manifest = {
    baseUrl,
    generatedAt,
    items: items.map((item) => ({
      kind: item.kind,
      logicalName: item.logicalName,
      stationId: item.stationId ?? null,
      token: item.token,
      url: item.url,
      fileName: item.fileName,
    })),
  };

  await writeFile(manifestJsonPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
  await writeFile(manifestMarkdownPath, `${buildManifestMarkdown(manifest)}\n`, 'utf8');

  process.stdout.write(
    [
      `QR generados en: ${outDir}`,
      `Manifiesto JSON: ${manifestJsonPath}`,
      `Manifiesto MD: ${manifestMarkdownPath}`,
      `Base URL: ${baseUrl}`,
      `Total: ${items.length} artefactos`,
    ].join('\n') + '\n',
  );
}

main().catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
  process.exit(1);
});
