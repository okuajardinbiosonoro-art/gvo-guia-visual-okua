import type { FC } from 'react';
import type { GuideId } from '../state/journey';

interface GuideAvatarProps {
  guide: GuideId;
  size?: 'sm' | 'md' | 'lg';
  selected?: boolean;
}

// Placeholders SVG honestos — se reemplazarán con ilustraciones reales en tickets posteriores
const AvatarMasculine: FC = () => (
  <svg viewBox="0 0 60 60" fill="none" aria-hidden="true" className="guide-avatar-svg">
    <circle cx="30" cy="19" r="10" fill="currentColor" opacity="0.75" />
    <rect x="16" y="32" width="28" height="22" rx="6" fill="currentColor" opacity="0.65" />
  </svg>
);

const AvatarFeminine: FC = () => (
  <svg viewBox="0 0 60 60" fill="none" aria-hidden="true" className="guide-avatar-svg">
    <circle cx="30" cy="17" r="10" fill="currentColor" opacity="0.75" />
    <path d="M14 56 Q14 30 30 30 Q46 30 46 56Z" fill="currentColor" opacity="0.65" />
  </svg>
);

const AvatarFlower: FC = () => (
  <svg viewBox="0 0 60 60" fill="none" aria-hidden="true" className="guide-avatar-svg">
    {[0, 60, 120, 180, 240, 300].map((angle) => (
      <ellipse
        key={angle}
        cx="30"
        cy="30"
        rx="5"
        ry="13"
        fill="currentColor"
        opacity="0.4"
        transform={`rotate(${angle} 30 30)`}
      />
    ))}
    <circle cx="30" cy="30" r="8" fill="currentColor" opacity="0.85" />
  </svg>
);

const AVATAR_COMPONENTS: Record<GuideId, FC> = {
  masculine: AvatarMasculine,
  feminine: AvatarFeminine,
  flower: AvatarFlower,
};

export const GuideAvatar: FC<GuideAvatarProps> = ({
  guide,
  size = 'md',
  selected = false,
}) => {
  const AvatarComponent = AVATAR_COMPONENTS[guide];

  return (
    <div
      className={[
        'guide-avatar',
        `guide-avatar--${size}`,
        selected ? 'guide-avatar--selected' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <AvatarComponent />
    </div>
  );
};
