// Datos de UI del recorrido GVO — helpers y constantes de frontend.
// Avatar único: Lía Andina (flower). Sin selección.

export type { GuideId } from '@gvo/shared';

/** Nombre visible del avatar-guía */
export const GUIDE_NAME = 'Lía';

/** Descripción corta del avatar-guía */
export const GUIDE_DESCRIPTION = 'Tu compañera de recorrido';

export function getGuideName(): string {
  return GUIDE_NAME;
}
