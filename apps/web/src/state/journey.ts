// Datos de UI del recorrido GVO — helpers y constantes de frontend.
// La validación de secuencia reside en el backend desde Ticket 0.3.
// El contenido narrativo de estaciones reside en content/stations/ desde Ticket 0.6.

export type { GuideId } from '@gvo/shared';

export interface Guide {
  id: 'masculine' | 'feminine' | 'flower';
  name: string;
  description: string;
}

export const GUIDES: readonly Guide[] = [
  { id: 'masculine', name: 'Raíz',  description: 'Figura humana' },
  { id: 'feminine',  name: 'Hoja',  description: 'Figura humana' },
  { id: 'flower',    name: 'Flor',  description: 'Figura vegetal' },
];

export function getGuideName(id: 'masculine' | 'feminine' | 'flower'): string {
  return GUIDES.find((g) => g.id === id)?.name ?? id;
}
