#!/usr/bin/env node

import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import process from 'node:process';
import { performance } from 'node:perf_hooks';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DEFAULT_BASE_URL = 'http://localhost:3001';
const DEFAULT_SESSIONS = 3;
const DEFAULT_REPORT_DIR = 'reports/pilot-validation';
const require = createRequire(import.meta.url);
const { ENTRY_TOKEN, QR_TOKENS } = require('@gvo/shared');
const DEFAULT_STATION_TOKEN = Object.keys(QR_TOKENS).sort((a, b) => QR_TOKENS[a] - QR_TOKENS[b])[0];

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

function normalizeBaseUrl(value) {
  const trimmed = String(value ?? '').trim();
  if (!trimmed) {
    throw new Error('Base URL vacía. Usa --base-url o GVO_PILOT_BASE_URL.');
  }

  const parsed = new URL(trimmed);
  if (!['http:', 'https:'].includes(parsed.protocol)) {
    throw new Error(`Base URL inválida: ${trimmed}`);
  }

  return trimmed.replace(/\/+$/, '');
}

function toNumber(value, fallback) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function timestampSlug(date = new Date()) {
  return date.toISOString().replace(/[:.]/g, '-');
}

async function ensureReportDir(reportDir) {
  await mkdir(reportDir, { recursive: true });
  return reportDir;
}

async function fetchWithTiming(baseUrl, path, options = {}) {
  const startedAt = performance.now();
  const controller = new AbortController();
  const timeoutMs = options.timeoutMs ?? 10_000;
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(`${baseUrl}${path}`, {
      method: options.method ?? 'GET',
      headers: options.headers,
      body: options.body,
      signal: controller.signal,
    });

    const contentType = response.headers.get('content-type') ?? '';
    const body = contentType.includes('application/json')
      ? await response.json().catch(() => null)
      : await response.text();

    return {
      ok: true,
      status: response.status,
      contentType,
      body,
      ms: Math.round(performance.now() - startedAt),
    };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : String(error),
      ms: Math.round(performance.now() - startedAt),
    };
  } finally {
    clearTimeout(timeout);
  }
}

async function runSessionPipeline(baseUrl, index, entryToken, stationToken) {
  const startedAt = performance.now();
  const steps = [];

  const pushStep = (step, result) => {
    steps.push({
      step,
      ...result,
    });
  };

  const created = await fetchWithTiming(baseUrl, '/api/journey/session', {
    method: 'POST',
  });
  pushStep('create_session', created);

  const sessionId = created.ok && created.status === 201 && created.body?.session?.sessionId
    ? created.body.session.sessionId
    : null;

  if (!sessionId) {
    return {
      sessionIndex: index,
      ok: false,
      steps,
      error: 'No se pudo crear sessionId',
      ms: Math.round(performance.now() - startedAt),
    };
  }

  const entry = await fetchWithTiming(baseUrl, `/api/journey/entry/${entryToken}`, {
    method: 'POST',
  });
  pushStep('entry_token', entry);

  const intro = await fetchWithTiming(baseUrl, `/api/journey/session/${sessionId}/intro`, {
    method: 'POST',
  });
  pushStep('intro', intro);

  const scan = await fetchWithTiming(baseUrl, `/api/journey/session/${sessionId}/scan/${stationToken}`, {
    method: 'POST',
  });
  pushStep('scan_station', scan);

  const sessionCheck = await fetchWithTiming(baseUrl, `/api/journey/session/${sessionId}`);
  pushStep('session_check', sessionCheck);

  const ok =
    created.ok &&
    created.status === 201 &&
    entry.ok &&
    entry.status === 200 &&
    intro.ok &&
    intro.status === 200 &&
    scan.ok &&
    scan.status === 200 &&
    sessionCheck.ok &&
    sessionCheck.status === 200 &&
    sessionCheck.body?.session?.visitedSteps?.includes(0) &&
    sessionCheck.body?.session?.visitedSteps?.includes(1);

  return {
    sessionIndex: index,
    ok,
    sessionId,
    steps,
    ms: Math.round(performance.now() - startedAt),
  };
}

function renderSummary(report) {
  const lines = [];
  lines.push('Pilot concurrency probe summary');
  lines.push(`Base URL: ${report.baseUrl}`);
  lines.push(`Start: ${report.startedAt}`);
  lines.push(`End: ${report.endedAt}`);
  lines.push(`Sessions: ${report.sessionsRequested}`);
  lines.push(`Successful sessions: ${report.successfulSessions}`);
  lines.push(`Failed sessions: ${report.failedSessions}`);
  lines.push(`Total ms: ${report.totalMs}`);
  lines.push('');
  for (const session of report.sessions) {
    lines.push(`Session ${session.sessionIndex + 1}: ${session.ok ? 'OK' : 'FAILED'} (${session.ms} ms)`);
    if (session.sessionId) {
      lines.push(`  sessionId: ${session.sessionId}`);
    }
    for (const step of session.steps) {
      const suffix = step.ok ? `${step.status} (${step.ms} ms)` : `ERR ${step.error ?? step.status ?? 'unknown'} (${step.ms} ms)`;
      lines.push(`  - ${step.step}: ${suffix}`);
    }
  }
  if (report.healthCheck) {
    lines.push('');
    lines.push(`Final /health: ${report.healthCheck.ok ? report.healthCheck.status : report.healthCheck.error}`);
    lines.push(`Final /api/meta: ${report.metaCheck.ok ? report.metaCheck.status : report.metaCheck.error}`);
  }
  return lines.join('\n');
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const baseUrl = normalizeBaseUrl(
    args['base-url'] ?? process.env.GVO_PILOT_BASE_URL ?? args._[0] ?? DEFAULT_BASE_URL,
  );
  const sessionsRequested = toNumber(args.sessions ?? process.env.GVO_PILOT_SESSIONS, DEFAULT_SESSIONS);
  const reportDir = resolve(repoRoot, args['report-dir'] ?? DEFAULT_REPORT_DIR);
  const entryToken = String(args['entry-token'] ?? ENTRY_TOKEN);
  const stationToken = String(args['station-token'] ?? DEFAULT_STATION_TOKEN);
  const startedAt = new Date();

  console.log('Pilot concurrency probe starting');
  console.log(`Base URL: ${baseUrl}`);
  console.log(`Sessions: ${sessionsRequested}`);
  console.log(`Entry token: ${entryToken}`);
  console.log(`Station token: ${stationToken}`);
  console.log('');

  await ensureReportDir(reportDir);

  const sessionResults = await Promise.all(
    Array.from({ length: sessionsRequested }, async (_value, index) =>
      runSessionPipeline(baseUrl, index, entryToken, stationToken),
    ),
  );

  const healthCheck = await fetchWithTiming(baseUrl, '/health');
  const metaCheck = await fetchWithTiming(baseUrl, '/api/meta');
  const endedAt = new Date();
  const totalMs = Math.round(endedAt.getTime() - startedAt.getTime());
  const successfulSessions = sessionResults.filter((session) => session.ok).length;
  const failedSessions = sessionResults.length - successfulSessions;
  const report = {
    kind: 'pilot-concurrency',
    baseUrl,
    sessionsRequested,
    startedAt: startedAt.toISOString(),
    endedAt: endedAt.toISOString(),
    totalMs,
    successfulSessions,
    failedSessions,
    sessions: sessionResults,
    healthCheck,
    metaCheck,
  };

  const stamp = timestampSlug(endedAt);
  const jsonPath = join(reportDir, `pilot-concurrency-${stamp}.json`);
  const txtPath = join(reportDir, `pilot-concurrency-${stamp}.txt`);

  await writeFile(jsonPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
  await writeFile(txtPath, `${renderSummary(report)}\n`, 'utf8');

  console.log(renderSummary(report));
  console.log('');
  console.log(`Report JSON: ${jsonPath}`);
  console.log(`Report TXT: ${txtPath}`);

  const overallOk =
    failedSessions === 0 &&
    healthCheck.ok &&
    healthCheck.status === 200 &&
    metaCheck.ok &&
    metaCheck.status === 200 &&
    metaCheck.body?.status === 'journey-core-live' &&
    metaCheck.body?.features?.stations === true;

  process.exit(overallOk ? 0 : 1);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
