import Fastify from 'fastify';
import cors from '@fastify/cors';
import fastifyStatic from '@fastify/static';
import { existsSync } from 'node:fs';
import { extname, resolve } from 'node:path';
import { journeyRoutes } from './routes/journey';
import { GVO_META } from '@gvo/shared';

const PORT = Number(process.env.PORT) || 3001;
const HOST = process.env.HOST || '0.0.0.0';
const SERVE_WEB = process.env.GVO_SERVE_WEB === 'true';
const WEB_DIST_PATH = resolve(__dirname, '../../web/dist');

function shouldServeSpa(pathname: string): boolean {
  if (pathname.startsWith('/api/')) return false;
  if (pathname === '/health') return false;
  if (pathname.startsWith('/assets/')) return false;
  return extname(pathname) === '';
}

async function bootstrap(): Promise<void> {
  const server = Fastify({ logger: true });

  // CORS — permisivo para acceso desde red local (móvil del visitante)
  await server.register(cors, { origin: true });

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
    } else {
      server.log.warn(
        { webDistPath: WEB_DIST_PATH },
        'GVO_SERVE_WEB is enabled but apps/web/dist was not found',
      );
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
