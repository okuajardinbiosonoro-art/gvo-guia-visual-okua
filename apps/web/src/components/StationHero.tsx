import type { FC } from 'react';
import type { StationVisual } from '@gvo/shared';

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
      {hero.caption && (
        <p className="station-hero-caption">{hero.caption}</p>
      )}
    </div>
  );
};
