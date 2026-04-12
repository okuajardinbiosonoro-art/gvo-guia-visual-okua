import type { FC } from 'react';

interface GuideAvatarProps {
  size?: 'sm' | 'md' | 'lg';
}

// Placeholder SVG de Lía Andina — se reemplazará con asset 3D real
const AvatarLia: FC = () => (
  <svg viewBox="0 0 60 60" fill="none" aria-hidden="true" className="guide-avatar-svg">
    {/* Pétalos simplificados */}
    <ellipse cx="30" cy="18" rx="5" ry="12" fill="currentColor" opacity="0.5" />
    <ellipse cx="18" cy="30" rx="12" ry="5" fill="currentColor" opacity="0.4" />
    <ellipse cx="42" cy="30" rx="12" ry="5" fill="currentColor" opacity="0.4" />
    <ellipse cx="22" cy="40" rx="5" ry="10" fill="currentColor" opacity="0.35" transform="rotate(-15 22 40)" />
    <ellipse cx="38" cy="40" rx="5" ry="10" fill="currentColor" opacity="0.35" transform="rotate(15 38 40)" />
    {/* Cabeza cristal */}
    <circle cx="30" cy="28" r="9" fill="currentColor" opacity="0.85" />
    {/* Ojos media luna */}
    <path d="M26 27 Q27.5 25.5 29 27" stroke="var(--color-bg, #0d0d0d)" strokeWidth="1" fill="none" opacity="0.7" />
    <path d="M31 27 Q32.5 25.5 34 27" stroke="var(--color-bg, #0d0d0d)" strokeWidth="1" fill="none" opacity="0.7" />
    {/* Collar */}
    <ellipse cx="30" cy="33" rx="6" ry="1.5" fill="currentColor" opacity="0.6" />
    {/* Bulbo */}
    <ellipse cx="30" cy="42" rx="7" ry="9" fill="currentColor" opacity="0.55" />
  </svg>
);

export const GuideAvatar: FC<GuideAvatarProps> = ({ size = 'md' }) => {
  return (
    <div className={`guide-avatar guide-avatar--${size}`}>
      <AvatarLia />
    </div>
  );
};
