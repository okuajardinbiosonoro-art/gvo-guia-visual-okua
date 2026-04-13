import type { IntroContent } from '../../packages/shared/src/content';

export const intro: IntroContent = {
  title: 'Bienvenida al recorrido OKÚA',
  subtitle: 'Te acompaño en cinco etapas de mediación viva',
  blocks: [
    {
      type: 'paragraph',
      text: 'Soy Lía Andina. Te doy la bienvenida a este recorrido: vamos a mirar, paso a paso, cómo una señal viva se vuelve perceptible.',
    },
    {
      type: 'paragraph',
      text: 'Aquí retomo lo esencial para que avancemos con claridad: la mediación presencial abre la experiencia y esta guía la ordena y la profundiza.',
    },
    {
      type: 'paragraph',
      text: 'Las plantas no hacen música por sí solas. Lo que percibimos nace de sus señales bioeléctricas y de una mediación tecnológica real.',
    },
    {
      type: 'note',
      text: 'Este recorrido tiene cinco estaciones. En cada una verás una capa distinta del proceso: origen, fundamento, evolución y estado actual.',
    },
    {
      type: 'hint',
      text: 'Sigue el orden en tu primera pasada. Al terminar, podrás volver libremente a cualquier estación.',
    },
  ],
  cta: 'Comenzar con la estación I',
  visual: {
    hero: {
      type: 'placeholder',
      label: '[ Bienvenida al recorrido ]',
      caption: 'Señal viva, mediación real y comprensión por etapas',
    },
    tone: 'default',
  },
};
