import type { StationContent } from '../../packages/shared/src/content';

export const station1: StationContent = {
  id: 1,
  title: 'Origen y propósito',
  label: 'I',
  subtitle: 'De dónde nace este proyecto',
  blocks: [
    {
      type: 'paragraph',
      text: 'Empiezo por el origen: OKÚA nació de una intención sensible y concreta, no de una curiosidad técnica aislada.',
    },
    {
      type: 'paragraph',
      text: 'Quisimos abrir una forma de atención hacia la vida vegetal: percibir que las plantas responden, cambian y sostienen señales reales.',
    },
    {
      type: 'paragraph',
      text: 'Mi papel en este recorrido es orientarte en esa mediación: no hacemos hablar a las plantas; traducimos lo que ya está ocurriendo en ellas.',
    },
    {
      type: 'paragraph',
      text: 'Por eso trabajamos con señales bioeléctricas medibles y con una traducción cuidadosa: traducir no es inventar.',
    },
    {
      type: 'note',
      text: 'En la siguiente estación te mostraré qué mide el sistema y por qué esa señal necesita mediación.',
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
