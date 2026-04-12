import type { FastifyPluginAsync } from 'fastify';
import * as sessions from '../sessions';
import { isValidEntryToken, resolveQrToken } from '@gvo/shared';

export const journeyRoutes: FastifyPluginAsync = async (fastify) => {
  // POST /api/journey/session — nueva sesión
  fastify.post('/api/journey/session', async (_req, reply) => {
    const session = sessions.createSession();
    return reply.status(201).send({ session });
  });

  // GET /api/journey/session/:sessionId — estado actual
  fastify.get<{ Params: { sessionId: string } }>(
    '/api/journey/session/:sessionId',
    async (req, reply) => {
      const session = sessions.getSession(req.params.sessionId);
      if (!session) return reply.status(404).send({ ok: false, error: 'session_not_found' });
      return { session };
    },
  );

  // POST /api/journey/session/:sessionId/intro
  fastify.post<{ Params: { sessionId: string } }>(
    '/api/journey/session/:sessionId/intro',
    async (req, reply) => {
      const result = sessions.visitIntro(req.params.sessionId);
      if (!result.ok) {
        return reply
          .status(result.error === 'session_not_found' ? 404 : 400)
          .send(result);
      }
      return result;
    },
  );

  // POST /api/journey/session/:sessionId/station/:stationId
  fastify.post<{ Params: { sessionId: string; stationId: string } }>(
    '/api/journey/session/:sessionId/station/:stationId',
    async (req, reply) => {
      const stationId = Number(req.params.stationId);
      if (!Number.isInteger(stationId)) {
        return reply.status(400).send({ ok: false, error: 'invalid_station' });
      }
      const result = sessions.visitStation(req.params.sessionId, stationId);
      if (!result.ok) {
        return reply
          .status(result.error === 'session_not_found' ? 404 : 400)
          .send(result);
      }
      return result;
    },
  );

  // POST /api/journey/session/:sessionId/finalize
  fastify.post<{ Params: { sessionId: string } }>(
    '/api/journey/session/:sessionId/finalize',
    async (req, reply) => {
      const result = sessions.finalizeSession(req.params.sessionId);
      if (!result.ok) {
        return reply
          .status(result.error === 'session_not_found' ? 404 : 400)
          .send(result);
      }
      return result;
    },
  );

  // POST /api/journey/entry/:token
  // Valida el token de acceso inicial al recorrido.
  // El frontend lo llama al procesar el QR de entrada; la gestión de sesión
  // permanece en el cliente (JourneyProvider).
  fastify.post<{ Params: { token: string } }>(
    '/api/journey/entry/:token',
    async (req, reply) => {
      const { token } = req.params;
      if (!isValidEntryToken(token)) {
        return reply.status(400).send({ ok: false, error: 'invalid_entry_token' });
      }
      return { ok: true };
    },
  );

  // POST /api/journey/session/:sessionId/scan/:token
  // Resuelve un token QR a una estación y registra el avance si la secuencia lo permite.
  fastify.post<{ Params: { sessionId: string; token: string } }>(
    '/api/journey/session/:sessionId/scan/:token',
    async (req, reply) => {
      const { sessionId, token } = req.params;

      const stationId = resolveQrToken(token);
      if (stationId === null) {
        return reply.status(400).send({ ok: false, error: 'invalid_token' });
      }

      const result = sessions.visitStation(sessionId, stationId);
      if (!result.ok) {
        return reply
          .status(result.error === 'session_not_found' ? 404 : 400)
          .send({ ok: false, error: result.error, session: result.session });
      }

      return { ok: true, stationId, session: result.session };
    },
  );
};
