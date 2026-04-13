import type { StationContent } from '../../packages/shared/src/content';

export const station1: StationContent = {
  id: 1,
  title: 'Origen y propósito',
  label: 'I',
  subtitle: 'Por qué empezó este proyecto',
  blocks: [
    {
      type: 'paragraph',
      text: 'Quiero empezar por el origen. OKÚA no nació para producir un efecto llamativo, sino para abrir otra forma de relación con la vida vegetal.',
    },
    {
      type: 'paragraph',
      text: 'Muchas veces pasamos junto a una planta sin pensar en ella como un sistema vivo, activo y sensible. Este proyecto surge de esa distancia: de la necesidad de volver perceptible algo que normalmente no vemos ni escuchamos de forma directa.',
    },
    {
      type: 'paragraph',
      text: 'La intención nunca fue “hacer hablar” a las plantas. La intención fue construir una mediación honesta para registrar señales reales y traducirlas sin falsear su origen.',
    },
    {
      type: 'note',
      text: 'Traducir no es inventar. En OKÚA, la experiencia artística aparece después de una captura y una interpretación técnica de datos reales.',
    },
    {
      type: 'paragraph',
      text: 'Por eso esta primera estación no trata todavía de explicarte toda la cadena técnica. Primero necesitábamos responder algo más básico: por qué valía la pena construirla.',
    },
    {
      type: 'hint',
      text: 'En la siguiente estación vamos a mirar qué tipo de señal está presente en una planta viva y por qué esa señal no equivale, por sí sola, a música.',
    },
  ],
  cta: 'Siguiente estación',
  qrHint: 'Escanea el código QR de la estación II para continuar.',
};
