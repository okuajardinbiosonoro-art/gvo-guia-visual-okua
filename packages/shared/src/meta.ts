export const GVO_META = {
  name: 'GVO — Guía Visual OKÚA',
  version: '0.7.0',
  description: 'Experiencia guiada local para visitantes del proyecto de bionosificación OKÚA',
  constraints: {
    audio: false,
    requiresInternet: false,
    mobilePrimary: true,
    writingRequired: false,
    sequentialFirstPass: true,
  },
  stationCount: 5,
} as const;
