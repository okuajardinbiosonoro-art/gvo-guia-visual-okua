import type { FC } from 'react';
import type { StationVisual } from '@gvo/shared';
import { SignalFlowDiagram } from './SignalFlowDiagram';

interface Props {
  visual: StationVisual;
}

export const StationHero: FC<Props> = ({ visual }) => {
  const { hero, tone = 'default' } = visual;
  if (!hero) return null;

  return (
    <div className={`station-hero station-hero--${hero.type} station-hero--tone-${tone}`}>
      {hero.type === 'placeholder' && (
        <div className="station-hero-inner">
          <span className="station-hero-label">{hero.label}</span>
        </div>
      )}
      {hero.type === 'image' && hero.src && (
        <img src={hero.src} alt={hero.label} className="station-hero-image" />
      )}
      {hero.type === 'diagram' && hero.diagramId === 'signal-flow' && (
        <SignalFlowDiagram />
      )}
      {hero.type === 'diagram' && hero.diagramId !== 'signal-flow' && (
        <div className="station-hero-inner station-hero-diagram-placeholder">
          <span className="station-hero-label">{hero.label}</span>
        </div>
      )}
      {hero.caption && (
        <p className="station-hero-caption">{hero.caption}</p>
      )}
    </div>
  );
};
