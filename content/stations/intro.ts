import type { IntroContent } from '../../packages/shared/src/content';

export const intro: IntroContent = {
  title: 'Proyecto OKÚA',
  subtitle: 'Bionosificación — mediación entre señal viva y sentido',
  blocks: [
    {
      type: 'paragraph',
      text: 'OKÚA es un sistema de bionosificación. Registra señales bioeléctricas de plantas vivas y las traduce en información que podemos observar y escuchar.',
    },
    {
      type: 'paragraph',
      text: 'No son las plantas quienes producen la música. Son sus señales biológicas las que, mediante mediación tecnológica, se convierten en algo perceptible.',
    },
    {
      type: 'note',
      text: 'Este recorrido tiene cinco estaciones. Cada una explora una capa del proceso: su origen, su fundamento técnico, su historia de errores y su estado actual.',
    },
    {
      type: 'hint',
      text: 'Sigue el orden en tu primera pasada. Al terminar, puedes revisitar cualquier estación libremente.',
    },
  ],
  cta: 'Ir a la primera estación',
};
