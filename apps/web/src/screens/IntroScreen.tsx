import { type FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { useJourney } from '../state/JourneyProvider';

export const IntroScreen: FC = () => {
  const navigate = useNavigate();
  const { session, actions } = useJourney();

  useEffect(() => {
    if (!session?.guide) {
      navigate('/guide', { replace: true });
      return;
    }
    // Registrar visita al intro; no bloqueamos la pantalla en este paso
    void actions.visitIntro();
    // Dependencias omitidas intencionalmente: guardia de entrada en montaje.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout showProgress currentStep={0}>
      <div className="screen screen--intro">
        <div className="screen-header">
          <p className="screen-label">Introducción</p>
          <h2 className="screen-title">Proyecto OKÚA</h2>
        </div>

        <div className="screen-body">
          <p className="screen-text">
            OKÚA es un sistema de bionosificación que registra y traduce señales
            bioeléctricas de plantas en información observable.
          </p>
          <p className="screen-text">
            Este recorrido te guía por cinco estaciones que exploran el origen,
            el funcionamiento técnico y el significado de la instalación.
          </p>
          <p className="screen-text screen-text--muted">
            Sigue el orden de las estaciones en tu primera pasada. Al terminar,
            podrás revisitar cualquier estación libremente.
          </p>
          {/* TODO (Ticket 0.2+): reemplazar con contenido narrativo real de introducción */}
        </div>

        <div className="screen-actions">
          <button className="btn btn-primary" onClick={() => navigate('/station/1')}>
            Ir a la primera estación
          </button>
        </div>
      </div>
    </Layout>
  );
};
