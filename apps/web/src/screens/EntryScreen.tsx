import { type FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useJourney } from '../state/JourneyProvider';

type EntryPhase =
  | 'resolving'
  | 'invalid_token'
  | 'session_error'
  | 'resuming';   // token válido — esperando redirect

export const EntryScreen: FC = () => {
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();
  const { status, session, actions } = useJourney();
  const [phase, setPhase] = useState<EntryPhase>('resolving');

  useEffect(() => {
    // Esperar a que JourneyProvider resuelva/cree la sesión
    if (status === 'loading') return;

    if (status === 'error' || !session) {
      setPhase('session_error');
      return;
    }

    if (!token) {
      setPhase('invalid_token');
      return;
    }

    void actions.validateEntry(token).then((result) => {
      if (!result.ok) {
        setPhase(
          result.error === 'invalid_entry_token' ? 'invalid_token' : 'session_error',
        );
        return;
      }
      // Token válido: abrir la introducción. El progreso activo vive en la sesión.
      setPhase('resuming');
      navigate('/intro', { replace: true });
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, token]);

  if (phase === 'resolving' || phase === 'resuming') {
    return (
      <div className="screen screen--standalone screen--centered">
        <p className="screen-text screen-text--muted">Verificando acceso…</p>
      </div>
    );
  }

  if (phase === 'invalid_token') {
    return (
      <div className="screen screen--standalone screen--centered">
        <div className="screen-header">
          <h2 className="screen-title">Código no reconocido</h2>
          <p className="screen-subtitle">
            Este código QR no es un punto de acceso válido al recorrido OKÚA.
          </p>
        </div>
        <div className="screen-body">
          <p className="screen-text screen-text--muted">
            Busca el código QR de acceso en la entrada del espacio.
          </p>
        </div>
      </div>
    );
  }

  // session_error
  return (
    <div className="screen screen--standalone screen--centered">
      <div className="screen-header">
        <h2 className="screen-title">Sin conexión</h2>
        <p className="screen-subtitle">
          No se pudo conectar con el servidor. Verifica que el servidor GVO está activo
          y que estás en la red del espacio.
        </p>
      </div>
      <div className="screen-actions">
        <button className="btn btn-primary" onClick={() => navigate('/')}>
          Ir al inicio
        </button>
      </div>
    </div>
  );
};
