import type { IntroContent } from '../../packages/shared/src/content';

export const intro: IntroContent = {
  title: 'Proyecto OKÚA',
  subtitle: 'Bionosificación — una señal viva, una mediación real',
  blocks: [
    {
      type: 'paragraph',
      text: 'Soy Lía Andina, y voy a acompañarte en este recorrido. Antes de seguir, quiero ordenar una idea importante: aquí no vas a ver plantas “haciendo música” por sí solas.',
    },
    {
      type: 'paragraph',
      text: 'Lo que existe en OKÚA es una mediación real. Las plantas vivas presentan señales bioeléctricas, el sistema las registra y luego las traduce en algo que podemos percibir.',
    },
    {
      type: 'note',
      text: 'Tal vez ya escuchaste una explicación breve al entrar. Ahora vamos a retomarla con calma, paso a paso, para entender qué ocurre realmente y por qué este proyecto no es un truco.',
    },
    {
      type: 'paragraph',
      text: 'Este recorrido tiene cinco estaciones. En la primera vamos a mirar por qué nació el proyecto. Después veremos qué tipo de señal está en juego, cómo evolucionó el sistema y cómo opera hoy.',
    },
    {
      type: 'hint',
      text: 'Sigue el orden en tu primera pasada. Cuando termines, podrás volver libremente a cualquier estación.',
    },
  ],
  cta: 'Ir a la primera estación',
  visual: {
    hero: {
      type: 'placeholder',
      label: '[ Introducción al proyecto ]',
      caption: 'Una señal viva, una mediación real',
    },
    tone: 'default',
  },
};
