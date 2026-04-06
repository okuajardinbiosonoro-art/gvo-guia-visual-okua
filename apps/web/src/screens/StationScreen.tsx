import { type FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { STATIONS } from '../state/journey';
import { useJourney } from '../state/JourneyProvider';

export const StationScreen: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { session, actions } = useJourney();
  const [ready, setReady] = useState(false);

  const stationId = Number(id);
  const station = STATIONS.find((s) => s.id === stationId);

  useEffect(() => {
    setReady(false);

    if (!station || stationId < 1 || stationId > 5) {
      navigate('/', { replace: true });
      return;
    }

    void actions.visitStation(stationId).then((result) => {
      if (!result.ok) {
        const sequenceErrors = new Set([
          'sequence_violation',
          'intro_required',
          'guide_required',
        ]);
        navigate(
          sequenceErrors.has(result.error ?? '') ? '/blocked' : '/',
          { replace: true },
        );
        return;
      }
      setReady(true);
    });

    // Dependencias omitidas intencionalmente: guardia de entrada en montaje.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stationId]);

  const isLast = stationId === 5;
  const nextPath = isLast ? '/final' : `/station/${stationId + 1}`;
  const isFirstPass = !session?.completed;

  if (!station || !ready) {
    return (
      <Layout showProgress currentStep={stationId}>
        <div className="screen screen--station">
          <div className="screen-loading">
            <p className="screen-text screen-text--muted">Verificando acceso…</p>
          </div>
        </div>
      </Layout>
    );
  }

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
          {isFirstPass && !isLast ? (
            <>
              <p className="screen-text screen-text--muted">
                Escanea el código QR de la siguiente estación para continuar.
              </p>
              <button
                className="btn btn-secondary"
                onClick={() => navigate(nextPath)}
              >
                Continuar sin QR
              </button>
            </>
          ) : (
            <button className="btn btn-primary" onClick={() => navigate(nextPath)}>
              {isLast ? 'Ver el cierre' : 'Siguiente estación'}
            </button>
          )}
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
