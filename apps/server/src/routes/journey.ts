import type { FastifyPluginAsync } from 'fastify';
import * as sessions from '../sessions';

const VALID_GUIDES = new Set(['masculine', 'feminine', 'flower']);

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
      if (!session) return reply.status(404).send({ error: 'session_not_found' });
      return { session };
    },
  );

  // POST /api/journey/session/:sessionId/guide
  fastify.post<{ Params: { sessionId: string }; Body: { guide?: unknown } }>(
    '/api/journey/session/:sessionId/guide',
    async (req, reply) => {
      const { guide } = req.body;
      if (typeof guide !== 'string' || !VALID_GUIDES.has(guide)) {
        return reply.status(400).send({ error: 'invalid_guide' });
      }
      const result = sessions.setGuide(
        req.params.sessionId,
        guide as 'masculine' | 'feminine' | 'flower',
      );
      if (!result.ok) {
        return reply
          .status(result.error === 'session_not_found' ? 404 : 400)
          .send(result);
      }
      return result;
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
        return reply.status(400).send({ error: 'invalid_station' });
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
};
