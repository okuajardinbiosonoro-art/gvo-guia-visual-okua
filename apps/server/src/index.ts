import Fastify from 'fastify';
import cors from '@fastify/cors';

const PORT = Number(process.env.PORT) || 3001;
const HOST = process.env.HOST || '0.0.0.0';

async function bootstrap(): Promise<void> {
  const server = Fastify({ logger: true });

  // CORS — permisivo para acceso desde red local (móvil del visitante)
  await server.register(cors, { origin: true });

  // --- Rutas ---

  // Salud del servidor
  server.get('/health', async () => {
    return { status: 'ok', timestamp: Date.now() };
  });

  // Metadatos del proyecto — útil para depuración y futuros clientes
  server.get('/api/meta', async () => {
    return {
      name: 'GVO — Guía Visual OKÚA',
      version: '0.1.0',
      status: 'scaffold',
      // Los siguientes módulos se activan en tickets posteriores:
      features: {
        sessions: false,   // Ticket 0.3 — sesión temporal + gating
        qr: false,         // Ticket 0.3 — validación por QR
        sequence: false,   // Ticket 0.3 — control de secuencia
        stations: false,   // Ticket 0.2+ — estaciones reales
      },
    };
  });

  // TODO (Ticket 0.3): registrar plugin de sesiones aquí
  // TODO (Ticket 0.3): registrar rutas de QR aquí
  // TODO (Ticket 0.2+): registrar rutas de estaciones aquí

  try {
    await server.listen({ port: PORT, host: HOST });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

bootstrap();
