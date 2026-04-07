import { type FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { ContentRenderer } from '../components/ContentRenderer';
import { StationHero } from '../components/StationHero';
import { getStationContent } from '../lib/content';
import { useJourney } from '../state/JourneyProvider';
import { APP_MODE } from '../config';

export const StationScreen: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { session, actions } = useJourney();
  const [ready, setReady] = useState(false);

  const stationId = Number(id);
  const content = getStationContent(stationId);

  useEffect(() => {
    setReady(false);

    if (!content || stationId < 1 || stationId > 5) {
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

  if (!content || !ready) {
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
          <p className="screen-label">Estación {content.label}</p>
          <h2 className="screen-title">{content.title}</h2>
          {content.subtitle && (
            <p className="screen-subtitle">{content.subtitle}</p>
          )}
        </div>

        {content.visual && <StationHero visual={content.visual} />}

        <div className="screen-body">
          <ContentRenderer blocks={content.blocks} />
        </div>

        <div className="screen-actions">
          {isFirstPass && !isLast ? (
            <>
              {content.qrHint && (
                <p className="screen-text screen-text--muted">{content.qrHint}</p>
              )}
              {APP_MODE === 'lab' && (
                <button
                  className="btn btn-secondary"
                  onClick={() => navigate(nextPath)}
                >
                  Continuar sin QR
                </button>
              )}
            </>
          ) : (
            <button className="btn btn-primary" onClick={() => navigate(nextPath)}>
              {isLast ? content.cta : 'Siguiente estación'}
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
