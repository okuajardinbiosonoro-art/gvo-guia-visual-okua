import type { StationContent } from '../../packages/shared/src/content';

export const station3: StationContent = {
  id: 3,
  title: 'Prototipos y evolución',
  label: 'III',
  subtitle: 'Lo que no funcionó y por qué importa',
  blocks: [
    {
      type: 'paragraph',
      text: 'El primer prototipo era ruidoso. Las lecturas eran inestables. La interfaz confundía más de lo que revelaba.',
    },
    {
      type: 'paragraph',
      text: 'Cada iteración respondió a fallas concretas: ruido electromagnético, pérdida de señal, deriva del sensor, latencia en la síntesis.',
    },
    {
      type: 'paragraph',
      text: 'Esa historia de ajustes no es un error del proyecto. Es su argumento más fuerte: un sistema que evolucionó en respuesta a datos reales tiene más credibilidad que uno que solo funciona en condiciones ideales.',
    },
    {
      type: 'note',
      text: 'Un prototipo que falla enseña más que uno que no se prueba.',
    },
  ],
  cta: 'Siguiente estación',
  qrHint: 'Escanea el código QR de la estación IV para continuar.',
};
