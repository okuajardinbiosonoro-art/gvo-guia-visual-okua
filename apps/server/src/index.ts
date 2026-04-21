import Fastify from 'fastify';
import cors from '@fastify/cors';
import rateLimit from '@fastify/rate-limit';
import fastifyStatic from '@fastify/static';
import { existsSync } from 'node:fs';
import { extname, resolve } from 'node:path';
import { journeyRoutes } from './routes/journey';
import { GVO_META } from '@gvo/shared';
import { appendLocalLog, attachLocalFileLogging, ensureLocalLogFile } from './logger';

const PORT = Number(process.env.PORT) || 3001;
const HOST = process.env.HOST || '0.0.0.0';
const SERVE_WEB = process.env.GVO_SERVE_WEB === 'true';
const WEB_DIST_PATH = resolve(__dirname, '../../web/dist');
const DEFAULT_CORS_MODE = SERVE_WEB ? 'same-origin' : 'permissive';
const JOURNEY_POST_RATE_LIMIT = {
  max: 10,
  timeWindow: '1 minute' as const,
};

type CorsMode = 'permissive' | 'same-origin' | 'allowlist';

function resolveCorsMode(): CorsMode {
  const rawMode = process.env.GVO_CORS_MODE?.trim().toLowerCase();

  if (rawMode === 'permissive' || rawMode === 'same-origin' || rawMode === 'allowlist') {
    return rawMode;
  }

  return DEFAULT_CORS_MODE;
}

function resolveAllowedOrigins(): string[] {
  return (process.env.GVO_ALLOWED_ORIGIN ?? '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);
}

function resolveCorsOriginOption(mode: CorsMode): boolean | string[] {
  if (mode === 'permissive') {
    return true;
  }

  if (mode === 'same-origin') {
    return false;
  }

  const allowedOrigins = resolveAllowedOrigins();
  return allowedOrigins.length > 0 ? allowedOrigins : false;
}

function shouldServeSpa(pathname: string): boolean {
  if (pathname.startsWith('/api/')) return false;
  if (pathname === '/health') return false;
  if (pathname.startsWith('/assets/')) return false;
  return extname(pathname) === '';
}

async function bootstrap(): Promise<void> {
  const server = Fastify({ logger: true });
  const corsMode = resolveCorsMode();
  const corsOrigin = resolveCorsOriginOption(corsMode);
  const localLogFilePath = ensureLocalLogFile();

  attachLocalFileLogging(server);

  appendLocalLog('info', 'server_boot', {
    port: PORT,
    host: HOST,
    serveWeb: SERVE_WEB,
    corsMode,
    corsOrigin: Array.isArray(corsOrigin) ? corsOrigin : corsOrigin === true ? 'permissive' : 'same-origin',
    rateLimit: {
      globalMax: 60,
      journeyPostMax: JOURNEY_POST_RATE_LIMIT.max,
    },
    logFilePath: localLogFilePath,
  });

  // CORS — explícito y configurable según modo de operación
  await server.register(cors, { origin: corsOrigin });

  // Rate limiting básico para evitar bucles o abuso accidental en red local
  await server.register(rateLimit, {
    global: true,
    max: 60,
    timeWindow: '1 minute',
    errorResponseBuilder: () => ({
      statusCode: 429,
      ok: false,
      error: 'rate_limit_exceeded',
    }),
  });

  // Rutas del recorrido (sesión + secuencia)
  await server.register(journeyRoutes);

  // Salud del servidor
  server.get('/health', async () => ({ status: 'ok', timestamp: Date.now() }));

  // Metadatos del proyecto
  server.get('/api/meta', async () => ({
    name: GVO_META.name,
    version: GVO_META.version,
    status: 'journey-core-live',
    features: {
      sessions: true,
      qr: true,
      sequence: true,
      entry: true,
      stations: true,
    },
  }));

  if (SERVE_WEB) {
    if (existsSync(WEB_DIST_PATH)) {
      await server.register(fastifyStatic, {
        root: WEB_DIST_PATH,
        index: false,
      });

      server.get('/', async (_request, reply) =>
        reply.type('text/html; charset=utf-8').sendFile('index.html'),
      );

      server.setNotFoundHandler((request, reply) => {
        const pathname = request.url.split('?')[0] ?? request.url;

        if ((request.method === 'GET' || request.method === 'HEAD') && shouldServeSpa(pathname)) {
          return reply.type('text/html; charset=utf-8').sendFile('index.html');
        }

        return reply.status(404).send({ ok: false, error: 'not_found' });
      });

      server.log.info({ webDistPath: WEB_DIST_PATH }, 'Serving compiled frontend from backend');
      appendLocalLog('info', 'frontend_static_enabled', {
        webDistPath: WEB_DIST_PATH,
      });
    } else {
      server.log.warn(
        { webDistPath: WEB_DIST_PATH },
        'GVO_SERVE_WEB is enabled but apps/web/dist was not found',
      );
      appendLocalLog('warn', 'frontend_static_missing', {
        webDistPath: WEB_DIST_PATH,
      });
    }
  }

  try {
    await server.listen({ port: PORT, host: HOST });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

bootstrap();
