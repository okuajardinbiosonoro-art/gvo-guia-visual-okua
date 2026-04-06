import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import type { GuideId, JourneySession } from '@gvo/shared';
import { journeyApi } from '../lib/api';

const SESSION_STORAGE_KEY = 'gvo_session_id';

export type SessionStatus = 'loading' | 'ready' | 'error';

export interface ActionResult {
  ok: boolean;
  error?: string;
}

interface JourneyActions {
  selectGuide: (guide: GuideId) => Promise<ActionResult>;
  visitIntro: () => Promise<ActionResult>;
  visitStation: (stationId: number) => Promise<ActionResult>;
  finalize: () => Promise<ActionResult>;
}

export interface JourneyContextValue {
  session: JourneySession | null;
  status: SessionStatus;
  errorMessage: string | null;
  actions: JourneyActions;
}

const JourneyContext = createContext<JourneyContextValue | null>(null);

async function resolveSession(): Promise<JourneySession> {
  const stored = sessionStorage.getItem(SESSION_STORAGE_KEY);
  if (stored) {
    try {
      const { session } = await journeyApi.getSession(stored);
      return session;
    } catch (err: unknown) {
      const e = err as { status?: number };
      if (e.status === 404) {
        sessionStorage.removeItem(SESSION_STORAGE_KEY);
        // La sesión expiró o no existe — crear una nueva
      } else {
        throw err; // error de red — propagar
      }
    }
  }
  const { session } = await journeyApi.createSession();
  sessionStorage.setItem(SESSION_STORAGE_KEY, session.sessionId);
  return session;
}

export function JourneyProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<JourneySession | null>(null);
  const [status, setStatus] = useState<SessionStatus>('loading');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    resolveSession()
      .then((s) => {
        setSession(s);
        setStatus('ready');
      })
      .catch(() => {
        setStatus('error');
        setErrorMessage(
          'No se pudo conectar con el servidor. Verifica que el servidor GVO está activo.',
        );
      });
  }, []);

  const callAction = async (
    fn: (sessionId: string) => Promise<{ ok: boolean; session: JourneySession }>,
  ): Promise<ActionResult> => {
    if (!session) return { ok: false, error: 'no_session' };
    try {
      const result = await fn(session.sessionId);
      setSession(result.session);
      return { ok: true };
    } catch (err: unknown) {
      const e = err as { code?: string };
      return { ok: false, error: e.code ?? 'network_error' };
    }
  };

  const actions: JourneyActions = {
    selectGuide: (guide) => callAction((id) => journeyApi.selectGuide(id, guide)),
    visitIntro:  ()      => callAction((id) => journeyApi.visitIntro(id)),
    visitStation: (stationId) =>
      callAction((id) => journeyApi.visitStation(id, stationId)),
    finalize: () => callAction((id) => journeyApi.finalize(id)),
  };

  return (
    <JourneyContext.Provider value={{ session, status, errorMessage, actions }}>
      {children}
    </JourneyContext.Provider>
  );
}

export function useJourney(): JourneyContextValue {
  const ctx = useContext(JourneyContext);
  if (!ctx) throw new Error('useJourney debe usarse dentro de JourneyProvider');
  return ctx;
}
