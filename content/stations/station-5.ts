import type { StationContent } from '../../packages/shared/src/content';

export const station5: StationContent = {
  id: 5,
  title: 'Estado actual',
  label: 'V',
  subtitle: 'Lo que está vivo hoy en el montaje',
  blocks: [
    {
      type: 'paragraph',
      text: 'Llegamos al presente del recorrido. Quiero que te quedes con esto: OKÚA no es una promesa futura, es un sistema vivo operando aquí y ahora.',
    },
    {
      type: 'paragraph',
      text: 'Las plantas que ves en el espacio están conectadas, la captura sigue activa y el resultado sonoro que percibes corresponde a señales reales mediadas en tiempo real.',
    },
    {
      type: 'paragraph',
      text: 'Este estado actual existe porque el sistema fue cambiando con criterio: se ajustó la arquitectura, mejoró la estabilidad de lectura y se tomaron decisiones que hicieron más sólido el montaje.',
    },
    {
      type: 'paragraph',
      text: 'Lo que estás experimentando no es solo asombro inicial; es una forma de percibir la vida vegetal con más atención, usando mediación técnica sin falsear su origen.',
    },
    {
      type: 'note',
      text: 'Para mí, ese es el punto central: sostener una relación más consciente entre señal viva, tecnología y escucha.',
    },
    {
      type: 'hint',
      text: 'El recorrido guiado termina aquí. El proyecto continúa en el espacio, y ahora puedes pasar al cierre.',
    },
  ],
  cta: 'Ver el cierre',
  visual: {
    hero: {
      type: 'placeholder',
      label: '[ Estado actual ]',
      caption: 'Dónde está el proyecto hoy',
    },
    tone: 'default',
  },
};
