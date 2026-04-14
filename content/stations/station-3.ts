import type { StationContent } from '../../packages/shared/src/content';

export const station3: StationContent = {
  id: 3,
  title: 'Prototipos y evolución',
  label: 'III',
  subtitle: 'Cómo fuimos ajustando el sistema',
  blocks: [
    {
      type: 'paragraph',
      text: 'Quiero ser directa: este sistema no apareció resuelto desde el inicio. Lo fuimos construyendo con pruebas, fallos y decisiones concretas.',
    },
    {
      type: 'paragraph',
      text: 'Los primeros prototipos eran cableados y seriales. Funcionaban para empezar, pero también nos mostraban límites de lectura y de operación en el montaje real.',
    },
    {
      type: 'paragraph',
      text: 'Después pasamos a una arquitectura inalámbrica para sostener mejor la captura en condiciones reales, sin depender de una instalación rígida.',
    },
    {
      type: 'paragraph',
      text: 'En ese camino aparecieron problemas de ruido e interferencia. También tuvimos que ajustar el acondicionamiento para ganar estabilidad de lectura.',
    },
    {
      type: 'note',
      text: 'El cambio más visible fue físico: modificamos partes del montaje porque la técnica lo exigía. No fue solo software; cambió también cómo se disponía el sistema en el espacio.',
    },
    {
      type: 'hint',
      text: 'En la estación IV te mostraré cómo opera hoy esa versión ya estabilizada del sistema.',
    },
  ],
  cta: 'Continuar',
  qrHint: 'Escanea el QR de la estación IV para continuar.',
  visual: {
    hero: {
      type: 'placeholder',
      label: '[ Evolución de prototipos ]',
      caption: 'Lo que no funcionó, y por qué importa',
    },
    tone: 'neutral',
  },
};
