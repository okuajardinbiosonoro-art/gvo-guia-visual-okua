// Tipos de contenido narrativo del recorrido GVO.
// Usados en content/stations/ y cargados por apps/web.

export interface ContentBlock {
  /** Tipo semántico del bloque — controla el estilo de renderizado */
  type: 'paragraph' | 'note' | 'hint' | 'heading';
  text: string;
}

/** Tono visual de la estación — afecta el color de acento del hero */
export type VisualTone = 'default' | 'warm' | 'cool' | 'cold' | 'neutral';

/** Hero visual de una estación o de la introducción */
export interface VisualHero {
  /** 'placeholder' = panel CSS; 'image' = imagen desde /assets; 'diagram' = componente delegado por diagramId */
  type: 'placeholder' | 'image' | 'diagram';
  /** Texto visible en el placeholder o alt text de la imagen */
  label: string;
  /** Ruta relativa al directorio /assets cuando type='image' */
  src?: string;
  /** Identificador del diagrama cuando type='diagram', ej. 'signal-flow' */
  diagramId?: string;
  /** Leyenda opcional bajo el hero */
  caption?: string;
}

/** Metadatos visuales de una estación o de la introducción */
export interface StationVisual {
  hero?: VisualHero;
  tone?: VisualTone;
}

/** Contenido de la pantalla de introducción (paso 0) */
export interface IntroContent {
  title: string;
  /** Etiqueta corta o subtítulo visible bajo el título */
  subtitle: string;
  blocks: readonly ContentBlock[];
  /** Texto del botón de acción principal */
  cta: string;
  /** Metadatos visuales opcionales */
  visual?: StationVisual;
}

/** Contenido de una estación del recorrido (pasos 1–5) */
export interface StationContent {
  id: number;
  title: string;
  /** Etiqueta romana usada en el progress tracker */
  label: string;
  /** Subtítulo visible en la cabecera de la estación */
  subtitle: string;
  blocks: readonly ContentBlock[];
  /** Texto del botón de avance en segunda pasada o estación final */
  cta: string;
  /** Pista contextual de QR para primera pasada (opcional) */
  qrHint?: string;
  /** Metadatos visuales opcionales */
  visual?: StationVisual;
}
