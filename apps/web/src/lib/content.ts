// Cargador de contenido narrativo para el frontend.
// Importa desde content/stations/ (alias @content en vite.config + tsconfig).
// La lógica de sesión/secuencia no toca este módulo.
//
// Los imports de assets binarios (.webp, .png, .svg) ocurren aquí,
// no en content/stations/*.ts. Ver vite-env.d.ts y assets/stations/README.md.

import type { IntroContent, StationContent } from '@gvo/shared';
import {
  intro,
  station1,
  station2,
  station3,
  station4,
  station5,
} from '@content/stations';
import heroStation2 from '../assets/stations/station-2/diagram-bioelectric-chain.svg';
import heroStation5 from '../assets/stations/station-5/hero-current-montage.webp';

export type { IntroContent, StationContent };

// ─── Overrides de hero.src por estación ──────────────────────────────────────
//
// Assets integrados en esta versión:
//   station-2 → diagram-bioelectric-chain.svg  ✓  F8-02
//   station-5 → hero-current-montage.webp      ✓  F8-03
//
// Patrón para agregar un asset nuevo:
//   1. import heroStationN from '../assets/stations/station-N/nombre-asset.svg';
//   2. Agregar N: heroStationN al mapa stationHeroSrc.
//   3. Cambiar hero.type a 'image' en content/stations/station-N.ts.
//   4. npm run typecheck && npm run build.

const stationHeroSrc: Partial<Record<number, string>> = {
  2: heroStation2,
  5: heroStation5,
};

// Para intro: asignar directamente cuando el asset exista.
// import heroIntro from '../assets/stations/intro/hero-lia-threshold.webp';
// const introHeroSrc: string | undefined = heroIntro;
const introHeroSrc: string | undefined = undefined;

// ─── Helpers de resolución ────────────────────────────────────────────────────

function withStationHero(content: StationContent): StationContent {
  const src = stationHeroSrc[content.id];
  if (
    !src ||
    !content.visual?.hero ||
    content.visual.hero.type !== 'image'
  ) {
    return content;
  }
  return {
    ...content,
    visual: {
      ...content.visual,
      hero: { ...content.visual.hero, src },
    },
  };
}

function withIntroHero(content: IntroContent): IntroContent {
  if (
    !introHeroSrc ||
    !content.visual?.hero ||
    content.visual.hero.type !== 'image'
  ) {
    return content;
  }
  return {
    ...content,
    visual: {
      ...content.visual,
      hero: { ...content.visual.hero, src: introHeroSrc },
    },
  };
}

// ─── Exports públicos ─────────────────────────────────────────────────────────

/** Todas las estaciones en orden con overrides de assets aplicados */
export const STATIONS: readonly StationContent[] = [
  station1,
  station2,
  station3,
  station4,
  station5,
].map(withStationHero);

/** Contenido de introducción (paso 0) con override de asset aplicado */
export function getIntroContent(): IntroContent {
  return withIntroHero(intro);
}

/** Contenido de una estación por id (1–5) */
export function getStationContent(id: number): StationContent | undefined {
  return STATIONS.find((s) => s.id === id);
}
