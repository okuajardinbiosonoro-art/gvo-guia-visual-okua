// Datos de UI del recorrido GVO — helpers y constantes de frontend.
// La validación de secuencia reside en el backend desde Ticket 0.3.

export type { GuideId } from '@gvo/shared';

export interface Guide {
  id: 'masculine' | 'feminine' | 'flower';
  name: string;
  description: string;
}

// Nombres de trabajo — se ajustan con contenido real en tickets posteriores
export const GUIDES: readonly Guide[] = [
  { id: 'masculine', name: 'Raíz',  description: 'Forma humana — masculina' },
  { id: 'feminine',  name: 'Hoja',  description: 'Forma humana — femenina' },
  { id: 'flower',    name: 'Flor',  description: 'Forma orgánica — vegetal' },
];

export interface StationMeta {
  id: number;
  title: string;
  label: string; // etiqueta romana para el tracker de progreso
}

// Títulos de trabajo — contenido narrativo real se integra en tickets posteriores
export const STATIONS: readonly StationMeta[] = [
  { id: 1, title: 'Origen y propósito',     label: 'I'   },
  { id: 2, title: 'Señales bioeléctricas',  label: 'II'  },
  { id: 3, title: 'Prototipos y evolución', label: 'III' },
  { id: 4, title: 'Operación técnica',      label: 'IV'  },
  { id: 5, title: 'Estado actual',          label: 'V'   },
];

export function getGuideName(id: 'masculine' | 'feminine' | 'flower'): string {
  return GUIDES.find((g) => g.id === id)?.name ?? id;
}
