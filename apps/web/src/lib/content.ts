// Cargador de contenido narrativo para el frontend.
// Importa desde content/stations/ (alias @content en vite.config + tsconfig).
// La lógica de sesión/secuencia no toca este módulo.

import type { IntroContent, StationContent } from '@gvo/shared';
import {
  intro,
  station1,
  station2,
  station3,
  station4,
  station5,
} from '@content/stations';

export type { IntroContent, StationContent };

/** Todas las estaciones en orden — sustituye STATIONS de journey.ts */
export const STATIONS: readonly StationContent[] = [
  station1,
  station2,
  station3,
  station4,
  station5,
];

/** Contenido de introducción (paso 0) */
export function getIntroContent(): IntroContent {
  return intro;
}

/** Contenido de una estación por id (1–5) */
export function getStationContent(id: number): StationContent | undefined {
  return STATIONS.find((s) => s.id === id);
}
