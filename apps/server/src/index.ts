import Fastify from 'fastify';
import cors from '@fastify/cors';
import { journeyRoutes } from './routes/journey';

const PORT = Number(process.env.PORT) || 3001;
const HOST = process.env.HOST || '0.0.0.0';

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
    name: 'GVO — Guía Visual OKÚA',
    version: '0.5.0',
    status: 'entry-and-modes',
    features: {
      sessions: true,
      qr: true,
      sequence: true,
      entry: true,
      stations: false, // Ticket 0.2+ — estaciones reales
    },
  }));

  try {
    await server.listen({ port: PORT, host: HOST });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

bootstrap();
