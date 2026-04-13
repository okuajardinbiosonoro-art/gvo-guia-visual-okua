import type { StationContent } from '../../packages/shared/src/content';

export const station2: StationContent = {
  id: 2,
  title: 'Señales bioeléctricas',
  label: 'II',
  subtitle: 'Qué señal está en juego',
  blocks: [
    {
      type: 'paragraph',
      text: 'En esta estación quiero mostrarte con claridad qué señal está en juego antes de llegar al resultado musical.',
    },
    {
      type: 'paragraph',
      text: 'Una planta viva presenta actividad bioeléctrica: variaciones reales que cambian con su estado y con el entorno.',
    },
    {
      type: 'paragraph',
      text: 'Por sí sola, esa señal no equivale a música. Para volverla perceptible, necesitamos una mediación técnica.',
    },
    {
      type: 'note',
      text: 'En OKÚA la secuencia es esta: planta viva → señal bioeléctrica → captura → acondicionamiento → interpretación/mapeo → resultado musical.',
    },
    {
      type: 'paragraph',
      text: 'Esa cadena no inventa una historia ajena a la planta: traduce una señal existente para que podamos percibirla sin perder su origen.',
    },
    {
      type: 'hint',
      text: 'En la siguiente estación te mostraré cómo esta mediación se fue ajustando con prototipos, errores y decisiones reales de evolución.',
    },
  ],
  cta: 'Siguiente estación',
  qrHint: 'Escanea el código QR de la estación III para continuar.',
  visual: {
    hero: {
      type: 'placeholder',
      label: '[ Señales bioeléctricas ]',
      caption: 'Lo que el sistema registra',
    },
    tone: 'cool',
  },
};
