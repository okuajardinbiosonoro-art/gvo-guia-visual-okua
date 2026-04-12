import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';

export const WelcomeScreen: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="screen screen--welcome screen--standalone">
      <div className="welcome-identity">
        <p className="welcome-project">OKÚA</p>
        <h1 className="welcome-title">
          Guía<br />Visual
        </h1>
        <p className="welcome-tagline">
          Una experiencia de recorrido por el proyecto de bionosificación.
        </p>
      </div>

      <div className="screen-actions">
        <button
          className="btn btn-primary"
          onClick={() => navigate('/intro')}
        >
          Comenzar recorrido
        </button>
        <p className="screen-note">Sin audio · Sin Internet · Solo tu presencia</p>
      </div>
    </div>
  );
};
