import { type FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { GuideAvatar } from '../components/GuideAvatar';
import { canAccessFinal, STATIONS, getGuideName } from '../state/journey';
import { useJourney } from '../state/JourneyProvider';

export const FinalScreen: FC = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useJourney();

  useEffect(() => {
    if (!canAccessFinal(state)) {
      navigate('/blocked', { replace: true });
      return;
    }
    dispatch({ type: 'COMPLETE' });
    // Dependencias omitidas intencionalmente: guardia de entrada en montaje.
    // (Ticket 0.3 reemplaza con cierre de sesión real.)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout showProgress={false}>
      <div className="screen screen--final">
        {state.guide && (
          <div className="final-guide">
            <GuideAvatar guide={state.guide} size="lg" />
            <p className="final-guide-name">{getGuideName(state.guide)}</p>
          </div>
        )}

        <div className="screen-header">
          <h2 className="screen-title">Recorrido completado</h2>
          <p className="screen-subtitle">
            Has recorrido las cinco estaciones de OKÚA.
          </p>
        </div>

        <div className="screen-body">
          <p className="screen-text screen-text--muted">
            A partir de ahora puedes revisar cualquier estación en el orden que prefieras.
          </p>

          <div className="final-station-list">
            {STATIONS.map((s) => (
              <button
                key={s.id}
                className="final-station-link"
                onClick={() => navigate(`/station/${s.id}`)}
              >
                <span className="final-station-label">Estación {s.label}</span>
                <span className="final-station-title">{s.title}</span>
              </button>
            ))}
          </div>
          {/* TODO (Ticket 0.3): integrar cierre de sesión real + confirmación de finalización */}
        </div>
      </div>
    </Layout>
  );
};
