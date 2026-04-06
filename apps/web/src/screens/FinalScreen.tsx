import { type FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { GuideAvatar } from '../components/GuideAvatar';
import { STATIONS, getGuideName } from '../state/journey';
import { useJourney } from '../state/JourneyProvider';

export const FinalScreen: FC = () => {
  const navigate = useNavigate();
  const { session, actions } = useJourney();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    void actions.finalize().then((result) => {
      if (!result.ok) {
        navigate('/blocked', { replace: true });
        return;
      }
      setReady(true);
    });
    // Dependencias omitidas intencionalmente: guardia de entrada en montaje.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!ready) {
    return (
      <Layout showProgress={false}>
        <div className="screen screen--final">
          <div className="screen-loading">
            <p className="screen-text screen-text--muted">Finalizando recorrido…</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout showProgress={false}>
      <div className="screen screen--final">
        {session?.guide && (
          <div className="final-guide">
            <GuideAvatar guide={session.guide} size="lg" />
            <p className="final-guide-name">{getGuideName(session.guide)}</p>
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
        </div>
      </div>
    </Layout>
  );
};
