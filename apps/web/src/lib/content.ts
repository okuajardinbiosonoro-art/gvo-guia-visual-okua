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

export type { IntroContent, StationContent };

// ─── Overrides de hero.src por estación ──────────────────────────────────────
//
// Cuando un asset real esté listo:
//   1. Importarlo aquí: import heroStation2 from '../assets/stations/station-2/diagram-bioelectric-chain.webp';
//   2. Asignarlo al id correspondiente: 2: heroStation2
//
// Los overrides solo aplican a estaciones con hero.type === 'image'.
// Station IV (type:'diagram') queda protegida — no recibe src por este mapa.

const stationHeroSrc: Partial<Record<number, string>> = {
  // 2: heroStation2,
  // 5: heroStation5,
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
