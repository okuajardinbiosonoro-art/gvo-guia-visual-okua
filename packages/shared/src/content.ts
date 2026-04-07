// Tipos de contenido narrativo del recorrido GVO.
// Usados en content/stations/ y cargados por apps/web.

export interface ContentBlock {
  /** Tipo semántico del bloque — controla el estilo de renderizado */
  type: 'paragraph' | 'note' | 'hint' | 'heading';
  text: string;
}

/** Contenido de la pantalla de introducción (paso 0) */
export interface IntroContent {
  title: string;
  /** Etiqueta corta o subtítulo visible bajo el título */
  subtitle: string;
  blocks: readonly ContentBlock[];
  /** Texto del botón de acción principal */
  cta: string;
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
}
