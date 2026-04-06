import { type FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GUIDES, type GuideId } from '../state/journey';
import { GuideAvatar } from '../components/GuideAvatar';
import { useJourney } from '../state/JourneyProvider';

export const GuideSelectionScreen: FC = () => {
  const navigate = useNavigate();
  const { session, actions } = useJourney();
  const [selected, setSelected] = useState<GuideId | null>(session?.guide ?? null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleContinue = async () => {
    if (!selected) return;
    setLoading(true);
    setError(null);
    const result = await actions.selectGuide(selected);
    setLoading(false);
    if (result.ok) {
      navigate('/intro');
    } else {
      setError('No se pudo registrar la selección. Intenta de nuevo.');
    }
  };

  return (
    <div className="screen screen--guide-selection screen--standalone">
      <div className="screen-header">
        <h2 className="screen-title">Elige tu guía</h2>
        <p className="screen-subtitle">
          Acompañará tu recorrido por las cinco estaciones.
        </p>
      </div>

      <div className="guide-grid">
        {GUIDES.map((guide) => (
          <button
            key={guide.id}
            className={`guide-card${selected === guide.id ? ' guide-card--selected' : ''}`}
            onClick={() => setSelected(guide.id)}
            aria-pressed={selected === guide.id}
          >
            <GuideAvatar guide={guide.id} size="lg" selected={selected === guide.id} />
            <span className="guide-card-name">{guide.name}</span>
            <span className="guide-card-desc">{guide.description}</span>
          </button>
        ))}
      </div>

      {error && <p className="screen-error">{error}</p>}

      <div className="screen-actions">
        <button
          className="btn btn-primary"
          onClick={handleContinue}
          disabled={!selected || loading}
        >
          {loading ? 'Registrando…' : 'Continuar'}
        </button>
      </div>
    </div>
  );
};
