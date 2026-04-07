import type { StationContent } from '../../packages/shared/src/content';

export const station1: StationContent = {
  id: 1,
  title: 'Origen y propósito',
  label: 'I',
  subtitle: 'Por qué construir algo así',
  blocks: [
    {
      type: 'paragraph',
      text: 'OKÚA nació de una pregunta concreta: ¿qué pasa realmente dentro de una planta viva cuando su entorno cambia?',
    },
    {
      type: 'paragraph',
      text: 'Las plantas generan señales eléctricas como respuesta a estímulos: luz, temperatura, tacto, humedad. Esas señales son reales, medibles y recurrentes.',
    },
    {
      type: 'paragraph',
      text: 'El proyecto surgió como un intento de hacer esas señales perceptibles sin falsearlas. No para hacer hablar a las plantas, sino para escuchar lo que ya transmiten.',
    },
    {
      type: 'note',
      text: 'Traducir no es inventar. El sistema convierte datos reales en información que podemos percibir.',
    },
  ],
  cta: 'Siguiente estación',
  qrHint: 'Escanea el código QR de la estación II para continuar.',
  visual: {
    hero: {
      type: 'placeholder',
      label: '[ Origen y propósito ]',
      caption: '¿Por qué construir algo así?',
    },
    tone: 'warm',
  },
};
