import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJourney } from '../state/JourneyProvider';

export const BlockedScreen: FC = () => {
  const navigate = useNavigate();
  const { state } = useJourney();

  // Determinar el último punto válido del recorrido para el botón de retorno
  const getReturnPath = (): string => {
    if (!state.guide) return '/guide';
    if (!state.visitedSteps.includes(0)) return '/intro';
    const lastStation = Math.max(0, ...state.visitedSteps.filter((s) => s > 0));
    if (lastStation === 0) return '/intro';
    if (state.completed) return '/final';
    return `/station/${lastStation}`;
  };

  return (
    <div className="screen screen--blocked screen--standalone screen--centered">
      <div className="blocked-icon" aria-hidden="true" />

      <div className="screen-header">
        <h2 className="screen-title">Estación no disponible</h2>
        <p className="screen-subtitle">
          Este punto del recorrido requiere seguir el orden de las estaciones.
        </p>
      </div>

      <div className="screen-body">
        <p className="screen-text screen-text--muted">
          En la primera pasada, el recorrido debe hacerse en secuencia.
          Al finalizar, podrás revisitar cualquier estación libremente.
        </p>
        {/* TODO (Ticket 0.3): este bloqueo se validará por QR + sesión real */}
      </div>

      <div className="screen-actions">
        <button className="btn btn-primary" onClick={() => navigate(getReturnPath())}>
          Volver al recorrido
        </button>
        <button className="btn btn-secondary" onClick={() => navigate('/')}>
          Ir al inicio
        </button>
      </div>
    </div>
  );
};
