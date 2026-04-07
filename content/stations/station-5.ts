import type { StationContent } from '../../packages/shared/src/content';

export const station5: StationContent = {
  id: 5,
  title: 'Estado actual',
  label: 'V',
  subtitle: 'Dónde está el proyecto',
  blocks: [
    {
      type: 'paragraph',
      text: 'OKÚA es un proyecto en funcionamiento. No es un concepto ni una propuesta. Las plantas que ves en el espacio están conectadas y el sistema está midiendo ahora mismo.',
    },
    {
      type: 'paragraph',
      text: 'El estado actual incluye cinco canales de adquisición, un motor de síntesis activo y una instalación que ha operado en condiciones reales durante meses.',
    },
    {
      type: 'paragraph',
      text: 'Lo que sigue: mayor estabilidad del hardware, mejoras en la visualización y documentación técnica pública del protocolo de mediación.',
    },
    {
      type: 'note',
      text: 'Este recorrido termina aquí. El proyecto, no.',
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
