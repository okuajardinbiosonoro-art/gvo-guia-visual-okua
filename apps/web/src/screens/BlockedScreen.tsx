import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJourney } from '../state/JourneyProvider';

export const BlockedScreen: FC = () => {
  const navigate = useNavigate();
  const { session } = useJourney();

  const getReturnPath = (): string => {
    if (!session) return '/intro';
    if (session.completed) return '/final';
    if (!session.visitedSteps.includes(0)) return '/intro';

    const stationVisits = session.visitedSteps.filter((step) => step > 0);
    const lastStation = stationVisits.length > 0 ? Math.max(...stationVisits) : 0;
    if (lastStation > 0) return `/station/${lastStation}`;

    return '/intro';
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
