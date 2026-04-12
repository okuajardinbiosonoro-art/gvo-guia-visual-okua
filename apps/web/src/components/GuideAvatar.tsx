import type { FC } from 'react';
import liaIdle from '../assets/lia/lia-idle.png';
import liaThreeQuarter from '../assets/lia/lia-three-quarter.png';
import liaCalm from '../assets/lia/lia-calm.png';
import liaCurious from '../assets/lia/lia-curious.png';

export type LiaState = 'idle' | 'three-quarter' | 'calm' | 'curious';

interface GuideAvatarProps {
  size?: 'sm' | 'md' | 'lg';
  state?: LiaState;
}

const IMAGE_BY_STATE: Record<LiaState, string> = {
  'idle': liaIdle,
  'three-quarter': liaThreeQuarter,
  'calm': liaCalm,
  'curious': liaCurious,
};

const ALT_BY_STATE: Record<LiaState, string> = {
  'idle': 'Lía Andina, tu guía del recorrido',
  'three-quarter': 'Lía Andina en vista de tres cuartos',
  'calm': 'Lía Andina en estado contemplativo',
  'curious': 'Lía Andina con expresión de curiosidad',
};

export const GuideAvatar: FC<GuideAvatarProps> = ({
  size = 'md',
  state = 'idle',
}) => {
  return (
    <div className={`guide-avatar guide-avatar--${size}`}>
      <img
        src={IMAGE_BY_STATE[state]}
        alt={ALT_BY_STATE[state]}
        className="guide-avatar-img"
      />
    </div>
  );
};
