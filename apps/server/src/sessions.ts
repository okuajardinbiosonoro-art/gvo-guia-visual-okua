import { randomUUID } from 'crypto';
import type { JourneySession } from '@gvo/shared';

const SESSION_TTL_MS =
  Number(process.env.SESSION_TTL_MS) || 4 * 60 * 60 * 1000; // 4 horas por defecto

const store = new Map<string, JourneySession>();

// Limpieza periódica de sesiones expiradas (cada 15 min)
// .unref() evita que este interval impida el cierre natural del proceso
setInterval(() => {
  const now = Date.now();
  for (const [id, s] of store.entries()) {
    if (s.expiresAt < now) store.delete(id);
  }
}, 15 * 60 * 1000).unref();

function touch(session: JourneySession): void {
  const now = Date.now();
  session.updatedAt = now;
  session.expiresAt = now + SESSION_TTL_MS;
}

function snapshot(session: JourneySession): JourneySession {
  return { ...session, visitedSteps: [...session.visitedSteps] };
}

export type StepResult =
  | { ok: true; session: JourneySession }
  | { ok: false; error: string; session?: JourneySession };

// ─── Operaciones públicas ──────────────────────────────────────────────────

export function createSession(): JourneySession {
  const now = Date.now();
  const session: JourneySession = {
    sessionId: randomUUID(),
    guide: 'flower',
    visitedSteps: [],
    completed: false,
    createdAt: now,
    updatedAt: now,
    expiresAt: now + SESSION_TTL_MS,
  };
  store.set(session.sessionId, session);
  return snapshot(session);
}

export function getSession(sessionId: string): JourneySession | null {
  const session = store.get(sessionId);
  if (!session) return null;
  if (session.expiresAt < Date.now()) {
    store.delete(sessionId);
    return null;
  }
  return snapshot(session);
}

export function visitIntro(sessionId: string): StepResult {
  const session = store.get(sessionId);
  if (!session || session.expiresAt < Date.now()) {
    return { ok: false, error: 'session_not_found' };
  }
  if (!session.visitedSteps.includes(0)) {
    session.visitedSteps = [...session.visitedSteps, 0];
  }
  touch(session);
  return { ok: true, session: snapshot(session) };
}

export function visitStation(sessionId: string, stationId: number): StepResult {
  const session = store.get(sessionId);
  if (!session || session.expiresAt < Date.now()) {
    return { ok: false, error: 'session_not_found' };
  }
  if (stationId < 1 || stationId > 5) {
    return { ok: false, error: 'invalid_station', session: snapshot(session) };
  }
  if (!session.completed) {
    // Validación de secuencia — solo en primera pasada
    if (!session.visitedSteps.includes(0)) {
      return { ok: false, error: 'intro_required', session: snapshot(session) };
    }
    for (let i = 1; i < stationId; i++) {
      if (!session.visitedSteps.includes(i)) {
        return { ok: false, error: 'sequence_violation', session: snapshot(session) };
      }
    }
  }
  if (!session.visitedSteps.includes(stationId)) {
    session.visitedSteps = [...session.visitedSteps, stationId];
  }
  touch(session);
  return { ok: true, session: snapshot(session) };
}

export function finalizeSession(sessionId: string): StepResult {
  const session = store.get(sessionId);
  if (!session || session.expiresAt < Date.now()) {
    return { ok: false, error: 'session_not_found' };
  }
  if (!session.visitedSteps.includes(5)) {
    return { ok: false, error: 'station5_required', session: snapshot(session) };
  }
  session.completed = true;
  touch(session);
  return { ok: true, session: snapshot(session) };
}
