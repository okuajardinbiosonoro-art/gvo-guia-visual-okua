import { type FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { ContentRenderer } from '../components/ContentRenderer';
import { StationHero } from '../components/StationHero';
import { getIntroContent } from '../lib/content';
import { useJourney } from '../state/JourneyProvider';

export const IntroScreen: FC = () => {
  const navigate = useNavigate();
  const { actions } = useJourney();
  const content = getIntroContent();

  useEffect(() => {
    // Registrar visita al intro; no bloqueamos la pantalla en este paso
    void actions.visitIntro();
    // Dependencias omitidas intencionalmente: guardia de entrada en montaje.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout showProgress currentStep={0}>
      <div className="screen screen--intro">
        <div className="screen-header">
          <p className="screen-label">{content.subtitle}</p>
          <h2 className="screen-title">{content.title}</h2>
        </div>

        {content.visual && <StationHero visual={content.visual} />}

        <div className="screen-body">
          <ContentRenderer blocks={content.blocks} />
        </div>

        <div className="screen-actions">
          <button className="btn btn-primary" onClick={() => navigate('/station/1')}>
            {content.cta}
          </button>
        </div>
      </div>
    </Layout>
  );
};
