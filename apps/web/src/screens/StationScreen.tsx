import { type FC, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { canAccessStep, STATIONS } from '../state/journey';
import { useJourney } from '../state/JourneyProvider';

export const StationScreen: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { state, dispatch } = useJourney();

  const stationId = Number(id);
  const station = STATIONS.find((s) => s.id === stationId);

  useEffect(() => {
    if (!station || stationId < 1 || stationId > 5) {
      navigate('/', { replace: true });
      return;
    }
    if (!canAccessStep(state, stationId)) {
      navigate('/blocked', { replace: true });
      return;
    }
    dispatch({ type: 'VISIT_STEP', step: stationId });
    // Dependencias omitidas intencionalmente: guardia de entrada en montaje.
    // (Ticket 0.3 reemplaza con validación QR + sesión real.)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stationId]);

  if (!station) return null;

  const isLast = stationId === 5;
  const nextPath = isLast ? '/final' : `/station/${stationId + 1}`;
  const nextLabel = isLast ? 'Ver el cierre' : 'Siguiente estación';

  return (
    <Layout showProgress currentStep={stationId}>
      <div className="screen screen--station">
        <div className="screen-header">
          <p className="screen-label">Estación {station.label}</p>
          <h2 className="screen-title">{station.title}</h2>
        </div>

        <div className="screen-body">
          {/* TODO (Ticket 0.2+): reemplazar con contenido real de la estación */}
          <div className="station-placeholder">
            <p className="screen-text">
              Contenido de la estación <strong>{station.title}</strong>.
            </p>
            <p className="screen-text screen-text--muted">
              El contenido narrativo, visual e interactivo de esta estación
              se integra en tickets posteriores.
            </p>
          </div>
        </div>

        <div className="screen-actions">
          <button className="btn btn-primary" onClick={() => navigate(nextPath)}>
            {nextLabel}
          </button>
          {stationId > 1 && (
            <button
              className="btn btn-secondary"
              onClick={() => navigate(`/station/${stationId - 1}`)}
            >
              Estación anterior
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};
