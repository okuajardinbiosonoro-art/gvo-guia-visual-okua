import type { FC, ReactNode } from 'react';

type Props = {
  stationId: number;
  fallback: ReactNode;
  scene?: ReactNode;
};

const Station3DHost: FC<Props> = ({ stationId, fallback, scene }) => {
  void stationId;

  if (!scene) return <>{fallback}</>;

  return <>{scene}</>;
};

export { Station3DHost };
