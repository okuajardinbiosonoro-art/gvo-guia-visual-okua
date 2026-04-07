import type { StationContent } from '../../packages/shared/src/content';

export const station2: StationContent = {
  id: 2,
  title: 'Señales bioeléctricas',
  label: 'II',
  subtitle: 'Lo que el sistema mide',
  blocks: [
    {
      type: 'paragraph',
      text: 'Las plantas generan diferencias de potencial eléctrico a través de sus tejidos. Estas variaciones de voltaje responden a estímulos externos e internos.',
    },
    {
      type: 'paragraph',
      text: 'En OKÚA, sensores de contacto registran esas variaciones en tiempo real. La señal cruda es débil, irregular e intermitente. No sigue un patrón musical predefinido.',
    },
    {
      type: 'paragraph',
      text: 'El sistema captura, amplifica y procesa esa señal antes de traducirla. Lo que escuchas es una representación del estado eléctrico de la planta en ese momento.',
    },
    {
      type: 'note',
      text: 'Fiel no significa idéntica. Hay mediación técnica entre la señal y el sonido. Pero no hay invención.',
    },
  ],
  cta: 'Siguiente estación',
  qrHint: 'Escanea el código QR de la estación III para continuar.',
};
