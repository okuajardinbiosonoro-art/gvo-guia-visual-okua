import type { StationContent } from '../../packages/shared/src/content';

export const station4: StationContent = {
  id: 4,
  title: 'Operación técnica',
  label: 'IV',
  subtitle: 'Cómo funciona el sistema actual',
  blocks: [
    {
      type: 'paragraph',
      text: 'El sistema actual combina electrónica de adquisición de señal, procesamiento en tiempo real y síntesis sonora. Cada capa opera a su propio ritmo.',
    },
    {
      type: 'paragraph',
      text: 'La señal bioeléctrica entra como voltaje analógico. Se convierte a datos digitales, se filtra y se mapea a parámetros de síntesis: frecuencia, amplitud, timbre.',
    },
    {
      type: 'paragraph',
      text: 'No hay inteligencia artificial ni aprendizaje automático. El mapeo es determinista: la misma señal produce la misma respuesta sonora. Lo que varía es la planta.',
    },
    {
      type: 'note',
      text: 'La variabilidad viene del organismo vivo, no del algoritmo.',
    },
  ],
  cta: 'Siguiente estación',
  qrHint: 'Escanea el código QR de la estación V para continuar.',
};
