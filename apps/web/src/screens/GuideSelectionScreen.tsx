import { type FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GUIDES, type GuideId } from '../state/journey';
import { GuideAvatar } from '../components/GuideAvatar';
import { useJourney } from '../state/JourneyProvider';

export const GuideSelectionScreen: FC = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useJourney();
  const [selected, setSelected] = useState<GuideId | null>(state.guide);

  const handleSelect = (id: GuideId) => {
    setSelected(id);
    dispatch({ type: 'SELECT_GUIDE', guide: id });
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
            onClick={() => handleSelect(guide.id)}
            aria-pressed={selected === guide.id}
          >
            <GuideAvatar guide={guide.id} size="lg" selected={selected === guide.id} />
            <span className="guide-card-name">{guide.name}</span>
            <span className="guide-card-desc">{guide.description}</span>
          </button>
        ))}
      </div>

      <div className="screen-actions">
        <button
          className="btn btn-primary"
          onClick={() => navigate('/intro')}
          disabled={!selected}
        >
          Continuar
        </button>
      </div>
    </div>
  );
};
