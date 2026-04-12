import { type FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useJourney } from '../state/JourneyProvider';

type QrState =
  | { phase: 'resolving' }
  | { phase: 'invalid_token' }
  | { phase: 'session_error' }
  | { phase: 'intro_required' };

export const QrScreen: FC = () => {
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();
  const { status, actions } = useJourney();
  const [qrState, setQrState] = useState<QrState>({ phase: 'resolving' });

  useEffect(() => {
    // Esperar a que la sesión esté lista antes de intentar el escaneo
    if (status === 'loading') return;
    if (status === 'error') {
      setQrState({ phase: 'session_error' });
      return;
    }
    if (!token) {
      setQrState({ phase: 'invalid_token' });
      return;
    }

    void actions.scanQr(token).then((result) => {
      if (result.ok && result.stationId !== undefined) {
        navigate(`/station/${result.stationId}`, { replace: true });
        return;
      }

      const error = result.error ?? '';

      if (error === 'invalid_token') {
        setQrState({ phase: 'invalid_token' });
        return;
      }
      if (error === 'intro_required') {
        setQrState({ phase: 'intro_required' });
        return;
      }
      if (error === 'sequence_violation') {
        navigate('/blocked', { replace: true });
        return;
      }
      // Sesión expirada, no_session u otro error de red
      setQrState({ phase: 'session_error' });
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, token]);

  if (qrState.phase === 'resolving') {
    return (
      <div className="screen screen--standalone screen--centered">
        <p className="screen-text screen-text--muted">Verificando código QR…</p>
      </div>
    );
  }

  if (qrState.phase === 'invalid_token') {
    return (
      <div className="screen screen--standalone screen--centered">
        <div className="screen-header">
          <h2 className="screen-title">Código no reconocido</h2>
          <p className="screen-subtitle">
            Este código QR no corresponde a ninguna estación del recorrido.
          </p>
        </div>
        <div className="screen-body">
          <p className="screen-text screen-text--muted">
            Asegúrate de estar escaneando el QR oficial de la estación.
          </p>
        </div>
        <div className="screen-actions">
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            Ir al inicio
          </button>
        </div>
      </div>
    );
  }

  if (qrState.phase === 'intro_required') {
    return (
      <div className="screen screen--standalone screen--centered">
        <div className="screen-header">
          <h2 className="screen-title">Primero la introducción</h2>
          <p className="screen-subtitle">
            Antes de entrar a las estaciones, completa la introducción al recorrido.
          </p>
        </div>
        <div className="screen-actions">
          <button className="btn btn-primary" onClick={() => navigate('/intro')}>
            Ver introducción
          </button>
        </div>
      </div>
    );
  }

  // session_error
  return (
    <div className="screen screen--standalone screen--centered">
      <div className="screen-header">
        <h2 className="screen-title">Sesión no disponible</h2>
        <p className="screen-subtitle">
          No se pudo recuperar tu sesión. Vuelve al inicio para comenzar de nuevo.
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
