#!/usr/bin/env node

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import process from 'node:process';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DEFAULT_PROFILE = 'deploy/field-profile.example.json';
const DEFAULT_OUT_DIR = 'deploy/field-release-candidate';
const DEFAULT_QR_MANIFEST = resolve(repoRoot, 'content/qr/generated/qr-manifest.json');
const VERSION_MATCH = /version:\s*'([^']+)'/;
const ALLOWED_CORS_MODES = new Set(['same-origin', 'allowlist', 'permissive']);

function parseArgs(argv) {
  const result = { _: [] };

  for (let index = 0; index < argv.length; index += 1) {
    const current = argv[index];

    if (!current.startsWith('--')) {
      result._.push(current);
      continue;
    }

    if (current.includes('=')) {
      const [key, ...rest] = current.slice(2).split('=');
      result[key] = rest.join('=');
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

function resolveRepoPath(inputPath) {
  return resolve(repoRoot, inputPath);
}

function normalizeBaseUrl(rawValue) {
  const value = String(rawValue ?? '').trim();
  if (!value) {
    throw new Error('El perfil field debe incluir baseUrl.');
  }

  const parsed = new URL(value);
  if (!['http:', 'https:'].includes(parsed.protocol)) {
    throw new Error(`baseUrl inválida: ${value}`);
  }

  return value.replace(/\/+$/, '');
}

async function readJsonFile(filePath) {
  const raw = await readFile(filePath, 'utf8');
  return JSON.parse(raw);
}

async function readVersion(packageJsonPath) {
  const payload = await readJsonFile(packageJsonPath);
  if (!payload.version) {
    throw new Error(`No hay version en ${packageJsonPath}`);
  }
  return String(payload.version);
}

async function readMetaVersion() {
  const metaPath = resolveRepoPath('packages/shared/src/meta.ts');
  const raw = await readFile(metaPath, 'utf8');
  const match = raw.match(VERSION_MATCH);
  if (!match) {
    throw new Error('No se pudo leer la version de packages/shared/src/meta.ts');
  }
  return match[1];
}

function formatNotes(notes) {
  if (!notes) return [];
  if (Array.isArray(notes)) {
    return notes.map((note) => String(note).trim()).filter(Boolean);
  }
  return [String(notes).trim()].filter(Boolean);
}

function buildMarkdown(manifest) {
  const lines = [
    '# Release candidate de campo',
    '',
    `- Release label: \`${manifest.releaseLabel}\``,
    `- Version visible: \`${manifest.version}\``,
    `- Commit: \`${manifest.gitCommit}\``,
    `- Generado: \`${manifest.generatedAt}\``,
    `- Base URL: \`${manifest.baseUrl}\``,
    `- App mode: \`${manifest.appMode}\``,
    `- CORS mode: \`${manifest.corsMode}\``,
    `- Allowed origin: \`${manifest.allowedOrigin ?? ''}\``,
    '',
    '## Artefactos',
    '',
    `- Perfil usado: \`${manifest.profilePath}\``,
    `- QR manifest JSON: \`${manifest.qrManifest.jsonPath}\``,
    `- QR manifest MD: \`${manifest.qrManifest.mdPath}\``,
    `- Release JSON: \`${manifest.output.jsonPath}\``,
    `- Release MD: \`${manifest.output.mdPath}\``,
    '',
    '## QR regenerados',
    '',
  ];

  for (const item of manifest.qrManifest.items) {
    lines.push(`- ${item.logicalName}: \`${item.url}\` → \`${item.fileName}\``);
  }

  lines.push('', '## Revisión previa a impresión', '');
  lines.push('- Confirma que la base URL ya es la definitiva del espacio.');
  lines.push('- Revisa que el modo field y el CORS del perfil sean los esperados.');
  lines.push('- Si la red final cambia, vuelve a ejecutar la preparación antes de imprimir.');

  if (manifest.notes.length > 0) {
    lines.push('', '## Notas del perfil', '');
    for (const note of manifest.notes) {
      lines.push(`- ${note}`);
    }
  }

  return lines.join('\n');
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const profileArg = args.profile ?? args._[0] ?? DEFAULT_PROFILE;
  const profilePath = resolveRepoPath(profileArg);
  const outputDir = resolveRepoPath(args['out-dir'] ?? DEFAULT_OUT_DIR);

  if (!existsSync(profilePath)) {
    throw new Error(`No se encontró el perfil field: ${profileArg}`);
  }

  const profile = await readJsonFile(profilePath);
  const releaseLabel = String(profile.releaseLabel ?? '').trim();
  const appMode = String(profile.appMode ?? '').trim();
  const corsMode = String(profile.corsMode ?? '').trim();
  const allowedOrigin = String(profile.allowedOrigin ?? '').trim();
  const baseUrl = normalizeBaseUrl(profile.baseUrl);
  const notes = formatNotes(profile.notes);

  if (!releaseLabel) {
    throw new Error('El perfil field requiere releaseLabel.');
  }

  if (appMode !== 'field') {
    throw new Error(`El perfil field debe usar appMode="field", recibido: ${appMode || '(vacío)'}`);
  }

  if (!ALLOWED_CORS_MODES.has(corsMode)) {
    throw new Error(`corsMode inválido: ${corsMode}`);
  }

  if (corsMode === 'allowlist' && !allowedOrigin) {
    throw new Error('corsMode=allowlist requiere allowedOrigin.');
  }

  if (allowedOrigin) {
    const parsedOrigin = new URL(allowedOrigin);
    if (!['http:', 'https:'].includes(parsedOrigin.protocol)) {
      throw new Error(`allowedOrigin inválido: ${allowedOrigin}`);
    }
  }

  const rootVersion = await readVersion(resolveRepoPath('package.json'));
  const webVersion = await readVersion(resolveRepoPath('apps/web/package.json'));
  const serverVersion = await readVersion(resolveRepoPath('apps/server/package.json'));
  const sharedVersion = await readVersion(resolveRepoPath('packages/shared/package.json'));
  const metaVersion = await readMetaVersion();

  const expectedVersions = [rootVersion, webVersion, serverVersion, sharedVersion, metaVersion];
  const uniqueVersions = Array.from(new Set(expectedVersions));
  if (uniqueVersions.length !== 1) {
    throw new Error(`Versiones desalineadas: ${uniqueVersions.join(', ')}`);
  }

  const qrScript = resolveRepoPath('scripts/generate-qr-assets.mjs');
  const qrResult = spawnSync(process.execPath, [qrScript, '--base-url', baseUrl], {
    cwd: repoRoot,
    stdio: 'inherit',
    env: {
      ...process.env,
      GVO_QR_BASE_URL: baseUrl,
    },
  });

  if (qrResult.status !== 0) {
    throw new Error('Falló la regeneración de QR del release candidate.');
  }

  const qrManifest = await readJsonFile(DEFAULT_QR_MANIFEST);
  const generatedAt = new Date().toISOString();
  const gitCommitResult = spawnSync('git', ['rev-parse', 'HEAD'], {
    cwd: repoRoot,
    encoding: 'utf8',
  });
  if (gitCommitResult.status !== 0) {
    throw new Error('No se pudo leer el commit actual con git rev-parse HEAD.');
  }

  const gitCommit = gitCommitResult.stdout.trim();

  await mkdir(outputDir, { recursive: true });

  const manifest = {
    kind: 'field-release-candidate',
    generatedAt,
    releaseLabel,
    version: rootVersion,
    gitCommit,
    profilePath: profileArg,
    baseUrl,
    appMode,
    corsMode,
    allowedOrigin: allowedOrigin || null,
    notes,
    versions: {
      root: rootVersion,
      web: webVersion,
      server: serverVersion,
      shared: sharedVersion,
      meta: metaVersion,
    },
    qrManifest: {
      jsonPath: 'content/qr/generated/qr-manifest.json',
      mdPath: 'content/qr/generated/qr-manifest.md',
      items: qrManifest.items ?? [],
    },
    output: {
      jsonPath: 'deploy/field-release-candidate/field-release-candidate.json',
      mdPath: 'deploy/field-release-candidate/field-release-candidate.md',
    },
  };

  const jsonPath = join(outputDir, 'field-release-candidate.json');
  const mdPath = join(outputDir, 'field-release-candidate.md');

  await writeFile(jsonPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
  await writeFile(mdPath, `${buildMarkdown(manifest)}\n`, 'utf8');

  process.stdout.write(
    [
      'Field release candidate preparado.',
      `Release label: ${releaseLabel}`,
      `Version: ${rootVersion}`,
      `Commit: ${gitCommit}`,
      `Base URL: ${baseUrl}`,
      `App mode: ${appMode}`,
      `CORS mode: ${corsMode}`,
      `QR manifest: content/qr/generated/qr-manifest.json`,
      `Output JSON: ${jsonPath}`,
      `Output MD: ${mdPath}`,
    ].join('\n') + '\n',
  );
}

main().catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
  process.exit(1);
});
