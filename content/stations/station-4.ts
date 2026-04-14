import type { StationContent } from '../../packages/shared/src/content';

export const station4: StationContent = {
  id: 4,
  title: 'Operación técnica',
  label: 'IV',
  subtitle: 'Cómo funciona el sistema actual',
  blocks: [
    {
      type: 'paragraph',
      text: 'Ahora quiero mostrarte, con precisión, cómo opera hoy el sistema completo.',
    },
    {
      type: 'paragraph',
      text: 'Todo empieza en el bionosificador: los electrodos capturan la señal de la planta, y ahí mismo se realiza el filtrado y la amplificación para acondicionarla.',
    },
    {
      type: 'paragraph',
      text: 'Después, esa señal acondicionada llega al microcontrolador (ESP32), donde se interpreta y se mapea en eventos musicales.',
    },
    {
      type: 'paragraph',
      text: 'El formato principal de esos eventos es MIDI. Esa capa es clave porque permite traducir variaciones biológicas a información musical utilizable.',
    },
    {
      type: 'paragraph',
      text: 'Luego, los eventos se envían por la red local: viajan por Wi-Fi, pasan por el router y se transportan por UDP hasta el software central.',
    },
    {
      type: 'paragraph',
      text: 'En el sistema central, esa información se transforma en resultado sonoro y sale por los parlantes en tiempo real.',
    },
    {
      type: 'note',
      text: 'La cadena es clara: señal de la planta → captura y acondicionamiento → ESP32 → MIDI → red local → sistema central → sonido.',
    },
    {
      type: 'hint',
      text: 'En la estación V vamos a integrar todo esto en el estado actual del montaje y su sentido hoy.',
    },
  ],
  cta: 'Continuar',
  qrHint: 'Escanea el QR de la estación V para continuar.',
  visual: {
    hero: {
      type: 'placeholder',
      label: '[ Operación técnica ]',
      caption: 'Cómo funciona el sistema actual',
    },
    tone: 'cold',
  },
};
