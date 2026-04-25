import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import type { JourneySession } from '@gvo/shared';
import { journeyApi } from '../lib/api';

const SESSION_STORAGE_KEY = 'gvo_session_id';

export type SessionStatus = 'loading' | 'ready' | 'error';

export interface ActionResult {
  ok: boolean;
  error?: string;
  /** Solo presente en la acción scanQr cuando ok === true */
  stationId?: number;
}

interface JourneyActions {
  visitIntro: () => Promise<ActionResult>;
  visitStation: (stationId: number) => Promise<ActionResult>;
  finalize: () => Promise<ActionResult>;
  scanQr: (token: string) => Promise<ActionResult>;
  /** Valida el token de acceso inicial contra el backend. No modifica la sesión. */
  validateEntry: (token: string) => Promise<ActionResult>;
}

export interface JourneyContextValue {
  session: JourneySession | null;
  status: SessionStatus;
  errorMessage: string | null;
  actions: JourneyActions;
}

const JourneyContext = createContext<JourneyContextValue | null>(null);

function readStoredSessionId(): string | null {
  if (typeof window === 'undefined') return null;

  // El recorrido QR externo puede abrirse en otra pestaña o contexto del navegador
  // al volver desde la cámara del móvil; por eso se prioriza un almacenamiento
  // compartido entre pestañas antes que el estado efímero de una sola pestaña.
  try {
    const local = window.localStorage.getItem(SESSION_STORAGE_KEY);
    if (local) return local;
  } catch {
    // Si localStorage está bloqueado, seguimos con sessionStorage.
  }

  try {
    const session = window.sessionStorage.getItem(SESSION_STORAGE_KEY);
    return session || null;
  } catch {
    return null;
  }
}

function writeStoredSessionId(sessionId: string): void {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.setItem(SESSION_STORAGE_KEY, sessionId);
  } catch {
    // Ignorar si el navegador bloquea localStorage.
  }

  try {
    window.sessionStorage.setItem(SESSION_STORAGE_KEY, sessionId);
  } catch {
    // Ignorar si el navegador bloquea sessionStorage.
  }
}

function clearStoredSessionId(): void {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.removeItem(SESSION_STORAGE_KEY);
  } catch {
    // Ignorar si el navegador bloquea localStorage.
  }

  try {
    window.sessionStorage.removeItem(SESSION_STORAGE_KEY);
  } catch {
    // Ignorar si el navegador bloquea sessionStorage.
  }
}

async function resolveSession(): Promise<JourneySession> {
  const stored = readStoredSessionId();
  if (stored) {
    try {
      const { session } = await journeyApi.getSession(stored);
      return session;
    } catch (err: unknown) {
      const e = err as { status?: number };
      if (e.status === 404) {
        clearStoredSessionId();
        // La sesión expiró o no existe — crear una nueva
      } else {
        throw err; // error de red — propagar
      }
    }
  }
  const { session } = await journeyApi.createSession();
  writeStoredSessionId(session.sessionId);
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
    visitIntro:  ()      => callAction((id) => journeyApi.visitIntro(id)),
    visitStation: (stationId) =>
      callAction((id) => journeyApi.visitStation(id, stationId)),
    finalize: () => callAction((id) => journeyApi.finalize(id)),
    scanQr: async (token) => {
      if (!session) return { ok: false, error: 'no_session' };
      try {
        const result = await journeyApi.scanQr(session.sessionId, token);
        if (result.session) setSession(result.session);
        if (result.ok && result.stationId !== undefined) {
          return { ok: true, stationId: result.stationId };
        }
        return { ok: false, error: result.error ?? 'unknown_error' };
      } catch (err: unknown) {
        const e = err as { code?: string };
        return { ok: false, error: e.code ?? 'network_error' };
      }
    },
    validateEntry: async (token) => {
      try {
        const result = await journeyApi.validateEntry(token);
        return result.ok ? { ok: true } : { ok: false, error: result.error ?? 'invalid_entry_token' };
      } catch (err: unknown) {
        const e = err as { code?: string };
        return { ok: false, error: e.code ?? 'network_error' };
      }
    },
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
