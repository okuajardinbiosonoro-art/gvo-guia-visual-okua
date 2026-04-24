import type { StationContent } from '../../packages/shared/src/content';

export const station5: StationContent = {
  id: 5,
  title: 'Estado actual',
  label: 'V',
  subtitle: 'Qué significa este montaje hoy',
  blocks: [
    {
      type: 'paragraph',
      text: 'Quiero cerrar el recorrido ubicándote en el presente: OKÚA no es una idea futura ni una demostración aislada. Es un sistema que ya existe y opera en este espacio.',
    },
    {
      type: 'paragraph',
      text: 'Lo que viste en las estaciones anteriores no está separado del montaje real. Aquí hay plantas conectadas, captura de señal, mediación técnica y un resultado sonoro que forma parte de la experiencia del lugar.',
    },
    {
      type: 'paragraph',
      text: 'Esta versión también condensa muchas decisiones previas. Algunas mejoraron la estabilidad, otras cambiaron la forma de disponer el sistema y otras hicieron posible que el montaje funcionara de manera más consistente.',
    },
    {
      type: 'note',
      text: 'Por eso el valor de OKÚA no está solo en el asombro inicial. Importa porque vuelve perceptible una señal viva mediante una mediación real, cuidada y verificable.',
    },
    {
      type: 'paragraph',
      text: 'El recorrido termina aquí, pero el proyecto sigue abierto: puede seguir afinándose, crecer y mostrar nuevas capas sin perder el sentido que sostiene hoy esta experiencia.',
    },
    {
      type: 'hint',
      text: 'En el cierre podrás revisar libremente las estaciones y recorrerlas otra vez con esta idea completa en mente.',
    },
  ],
  cta: 'Ir al cierre',
  visual: {
    hero: {
      type: 'placeholder',
      label: '[ Estado actual ]',
      caption: 'Qué significa este montaje hoy',
    },
    tone: 'warm',
  },
};
