#!/usr/bin/env node

import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { setTimeout as sleep } from 'node:timers/promises';
import process from 'node:process';
import { performance } from 'node:perf_hooks';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DEFAULT_BASE_URL = 'http://localhost:3001';
const DEFAULT_MINUTES = 1;
const DEFAULT_INTERVAL_SECONDS = 15;
const DEFAULT_REPORT_DIR = 'reports/pilot-validation';
const CORE_ROUTES = ['/health', '/api/meta'];
const JOURNEY_ROUTES = ['/entry/okua-entry', '/intro', '/station/1', '/station/2', '/station/3', '/station/4', '/station/5', '/final'];
const ROTATING_ROUTES_PER_CYCLE = 3;

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

function toNumber(value, fallback) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
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

function timestampSlug(date = new Date()) {
  return date.toISOString().replace(/[:.]/g, '-');
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

function expectJsonRoute(result, path, predicate) {
  if (!result.ok) {
    return { ok: false, detail: `${path} → ${result.error}` };
  }

  if (result.status !== 200) {
    return { ok: false, detail: `${path} → HTTP ${result.status}` };
  }

  if (typeof result.body !== 'object' || result.body === null || !predicate(result.body)) {
    return { ok: false, detail: `${path} → payload inesperado: ${JSON.stringify(result.body)}` };
  }

  return { ok: true };
}

async function ensureReportDir(reportDir) {
  await mkdir(reportDir, { recursive: true });
  return reportDir;
}

function renderSummary(report) {
  const lines = [];
  lines.push('Pilot soak test summary');
  lines.push(`Base URL: ${report.baseUrl}`);
  lines.push(`Start: ${report.startedAt}`);
  lines.push(`End: ${report.endedAt}`);
  lines.push(`Duration minutes: ${report.minutes}`);
  lines.push(`Interval seconds: ${report.intervalSeconds}`);
  lines.push(`Cycles: ${report.cycles}`);
  lines.push(`Checks: ${report.totals.checks}`);
  lines.push(`Failures: ${report.totals.failures}`);
  lines.push(`Unique routes: ${report.uniqueRoutes.length}`);
  lines.push(`Average ms: ${report.totals.averageMs}`);
  lines.push(`Min ms: ${report.totals.minMs}`);
  lines.push(`Max ms: ${report.totals.maxMs}`);
  lines.push('');
  lines.push('Routes checked by cycle:');
  for (const cycle of report.cycleRoutes) {
    lines.push(`- Cycle ${cycle.cycle}: ${cycle.routes.join(', ')}`);
  }
  if (report.failures.length > 0) {
    lines.push('');
    lines.push('Failures:');
    for (const failure of report.failures) {
      lines.push(`- ${failure}`);
    }
  }
  return lines.join('\n');
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const baseUrl = normalizeBaseUrl(
    args['base-url'] ?? process.env.GVO_PILOT_BASE_URL ?? args._[0] ?? DEFAULT_BASE_URL,
  );
  const minutes = toNumber(args.minutes ?? process.env.GVO_PILOT_SOAK_MINUTES, DEFAULT_MINUTES);
  const intervalSeconds = toNumber(
    args['interval-seconds'] ?? process.env.GVO_PILOT_SOAK_INTERVAL_SECONDS,
    DEFAULT_INTERVAL_SECONDS,
  );
  const reportDir = resolve(repoRoot, args['report-dir'] ?? DEFAULT_REPORT_DIR);
  const startedAt = new Date();
  const startedAtIso = startedAt.toISOString();
  const deadline = startedAt.getTime() + minutes * 60_000;
  const checks = [];
  const failures = [];
  const uniqueRoutes = new Set();
  const cycleRoutes = [];
  let cycles = 0;

  console.log(`Pilot soak test starting`);
  console.log(`Base URL: ${baseUrl}`);
  console.log(`Duration: ${minutes} minute(s)`);
  console.log(`Interval: ${intervalSeconds} second(s)`);
  console.log('');

  await ensureReportDir(reportDir);

  while (Date.now() < deadline) {
    cycles += 1;
    const routeCursor = ((cycles - 1) * ROTATING_ROUTES_PER_CYCLE) % JOURNEY_ROUTES.length;
    const rotatingRoutes = Array.from({ length: ROTATING_ROUTES_PER_CYCLE }, (_value, offset) =>
      JOURNEY_ROUTES[(routeCursor + offset) % JOURNEY_ROUTES.length],
    );
    const routesThisCycle = [...CORE_ROUTES, ...rotatingRoutes];
    cycleRoutes.push({ cycle: cycles, routes: routesThisCycle });
    console.log(`Cycle ${cycles}`);

    for (const route of routesThisCycle) {
      const result = await fetchWithTiming(baseUrl, route);
      checks.push({ route, ...result });
      uniqueRoutes.add(route);

      let validation;
      if (route === '/health') {
        validation = expectJsonRoute(result, route, (body) => body.status === 'ok');
      } else if (route === '/api/meta') {
        validation = expectJsonRoute(
          result,
          route,
          (body) => body.status === 'journey-core-live' && body.features?.stations === true,
        );
      } else {
        validation = result.ok && result.status === 200 && typeof result.body === 'string'
          ? { ok: true }
          : { ok: false, detail: `${route} → ${result.ok ? `HTTP ${result.status}` : result.error}` };
      }

      if (validation.ok) {
        console.log(`  ✓ ${route} (${result.ms} ms)`);
      } else {
        console.log(`  ✗ ${validation.detail}`);
        failures.push(validation.detail);
      }
    }

    const nextCycleAt = startedAt.getTime() + cycles * intervalSeconds * 1000;
    const waitUntil = Math.min(nextCycleAt, deadline);
    const waitMs = waitUntil - Date.now();
    if (waitMs > 0) {
      await sleep(waitMs);
    }
  }

  const endedAt = new Date();
  const timings = checks.map((item) => item.ms).filter((ms) => Number.isFinite(ms));
  const totals = {
    checks: checks.length,
    failures: failures.length,
    uniqueRoutes: uniqueRoutes.size,
    averageMs:
      timings.length > 0
        ? Math.round(timings.reduce((sum, value) => sum + value, 0) / timings.length)
        : 0,
    minMs: timings.length > 0 ? Math.min(...timings) : 0,
    maxMs: timings.length > 0 ? Math.max(...timings) : 0,
  };

  const report = {
    kind: 'pilot-soak',
    baseUrl,
    minutes,
    intervalSeconds,
    startedAt: startedAtIso,
    endedAt: endedAt.toISOString(),
    cycles,
    totals,
    checks,
    failures,
    uniqueRoutes: Array.from(uniqueRoutes).sort(),
    cycleRoutes,
  };

  const stamp = timestampSlug(endedAt);
  const jsonPath = join(reportDir, `pilot-soak-${stamp}.json`);
  const txtPath = join(reportDir, `pilot-soak-${stamp}.txt`);

  await writeFile(jsonPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
  await writeFile(txtPath, `${renderSummary(report)}\n`, 'utf8');

  console.log('');
  console.log(renderSummary(report));
  console.log('');
  console.log(`Report JSON: ${jsonPath}`);
  console.log(`Report TXT: ${txtPath}`);

  process.exit(failures.length > 0 ? 1 : 0);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
