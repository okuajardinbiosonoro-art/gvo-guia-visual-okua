#!/usr/bin/env node
/**
 * smoke-journey.mjs
 * Smoke test portable para el flujo de recorrido GVO.
 *
 * Requiere Node >= 18 (fetch nativo).
 * Asume que el backend ya está corriendo (npm run dev:server o npm run dev).
 *
 * Uso:
 *   node scripts/smoke-journey.mjs
 *   npm run smoke:journey
 *
 * Variable de entorno opcional:
 *   GVO_SERVER_URL=http://localhost:3001  (por defecto)
 */

const BASE = process.env.GVO_SERVER_URL ?? 'http://localhost:3001';
let passed = 0;
let failures = 0;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function ok(label) {
  console.log(`  ✓  ${label}`);
  passed++;
}

function fail(label, detail) {
  console.error(`  ✗  ${label}`);
  if (detail) console.error(`     ${detail}`);
  failures++;
}

function check(label, condition, detail) {
  condition ? ok(label) : fail(label, detail);
}

async function GET(path) {
  const res = await fetch(`${BASE}${path}`);
  const body = await res.json().catch(() => ({}));
  return { status: res.status, body };
}

async function POST(path, payload) {
  const hasBody = payload !== undefined;
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    ...(hasBody && {
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }),
  });
  const body = await res.json().catch(() => ({}));
  return { status: res.status, body };
}

// ─── Preflight: verificar que el backend está activo ─────────────────────────

console.log(`\nGVO Smoke Test — backend: ${BASE}\n`);

try {
  const res = await fetch(`${BASE}/health`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
} catch (err) {
  console.error('ERROR: No se pudo conectar al backend.\n');
  console.error(`  URL: ${BASE}`);
  console.error(`  Detalle: ${err.message}\n`);
  console.error('  Asegúrate de que el servidor esté corriendo:');
  console.error('    npm run dev:server       (solo backend)');
  console.error('    npm run dev              (backend + frontend)\n');
  process.exit(1);
}

// ─── Tests ───────────────────────────────────────────────────────────────────

// 1. GET /health
{
  const { status, body } = await GET('/health');
  check(
    'GET /health → 200, status ok',
    status === 200 && body.status === 'ok',
    `status=${status} body=${JSON.stringify(body)}`,
  );
}

// 2. GET /api/meta
{
  const { status, body } = await GET('/api/meta');
  check(
    'GET /api/meta → 200, tiene version',
    status === 200 && typeof body.version === 'string',
    `status=${status} body=${JSON.stringify(body)}`,
  );
}

// 3. POST /api/journey/entry/okua-entry (token válido)
{
  const { status, body } = await POST('/api/journey/entry/okua-entry');
  check(
    'POST /api/journey/entry/okua-entry → 200, ok:true',
    status === 200 && body.ok === true,
    `status=${status} body=${JSON.stringify(body)}`,
  );
}

// 4. POST /api/journey/entry/<token inválido>
{
  const { status, body } = await POST('/api/journey/entry/token-invalido');
  check(
    'POST /api/journey/entry/token-invalido → 400, ok:false, error:invalid_entry_token',
    status === 400 && body.ok === false && body.error === 'invalid_entry_token',
    `status=${status} body=${JSON.stringify(body)}`,
  );
}

// 5. POST /api/journey/session → crear sesión
let sessionId;
{
  const { status, body } = await POST('/api/journey/session');
  const valid = status === 201 && typeof body.session?.sessionId === 'string';
  check(
    'POST /api/journey/session → 201, devuelve sessionId',
    valid,
    `status=${status} body=${JSON.stringify(body)}`,
  );
  if (!valid) {
    console.error('\nNo se pudo crear sesión — se detienen los tests dependientes.\n');
    process.exit(1);
  }
  sessionId = body.session.sessionId;
}

// 6. POST …/guide
{
  const { status, body } = await POST(`/api/journey/session/${sessionId}/guide`, { guide: 'masculine' });
  check(
    'POST …/guide (masculine) → 200, ok:true',
    status === 200 && body.ok === true,
    `status=${status} body=${JSON.stringify(body)}`,
  );
}

// 7. POST …/intro
{
  const { status, body } = await POST(`/api/journey/session/${sessionId}/intro`);
  check(
    'POST …/intro → 200, ok:true',
    status === 200 && body.ok === true,
    `status=${status} body=${JSON.stringify(body)}`,
  );
}

// 8. POST …/scan/okua-e1 (en secuencia)
{
  const { status, body } = await POST(`/api/journey/session/${sessionId}/scan/okua-e1`);
  check(
    'POST …/scan/okua-e1 (en secuencia) → 200, ok:true, stationId:1',
    status === 200 && body.ok === true && body.stationId === 1,
    `status=${status} body=${JSON.stringify(body)}`,
  );
}

// 9. POST …/scan/okua-e3 fuera de secuencia (estación 2 no visitada)
{
  const { status, body } = await POST(`/api/journey/session/${sessionId}/scan/okua-e3`);
  check(
    'POST …/scan/okua-e3 (fuera de secuencia) → 400, ok:false, error:sequence_violation',
    status === 400 && body.ok === false && body.error === 'sequence_violation',
    `status=${status} body=${JSON.stringify(body)}`,
  );
}

// 10. Contratos de error — ok:false + error string en respuestas de error
{
  const [r1, r2, r3] = await Promise.all([
    POST('/api/journey/entry/x'),
    GET('/api/journey/session/session-inexistente'),
    POST(`/api/journey/session/${sessionId}/guide`, { guide: 'invalido' }),
  ]);
  const allValid = [r1, r2, r3].every(
    ({ body }) => body.ok === false && typeof body.error === 'string',
  );
  check(
    'Contratos de error → ok:false + error string en entry/session/guide',
    allValid,
    [
      `entry/x: ${JSON.stringify(r1.body)}`,
      `session/inexistente: ${JSON.stringify(r2.body)}`,
      `guide/invalido: ${JSON.stringify(r3.body)}`,
    ].join(' | '),
  );
}

// ─── Resultado final ──────────────────────────────────────────────────────────

const total = passed + failures;
console.log('');
if (failures === 0) {
  console.log(`✓  Smoke test completo — ${total}/${total} verificaciones OK\n`);
} else {
  console.error(`✗  ${failures} de ${total} verificación(es) fallida(s)\n`);
}

process.exit(failures > 0 ? 1 : 0);
