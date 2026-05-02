import type { FC } from 'react';
import { GuideAvatar, type LiaState } from '../GuideAvatar';

type Props = {
  size?: 'sm' | 'md' | 'lg';
  state?: LiaState;
};

const Lia3D: FC<Props> = ({ size = 'md', state = 'idle' }) => {
  // GLB se conecta aquí cuando exista asset aprobado.
  return <GuideAvatar size={size} state={state} />;
};

export { Lia3D };
