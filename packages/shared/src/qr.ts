// Mapa de tokens QR → estaciones del recorrido GVO.
// Cambiar tokens aquí sin tocar lógica de backend o frontend.

/**
 * Token QR de acceso inicial al recorrido.
 * Imprime este token en el QR de la entrada del espacio:
 *   http://<ip-servidor>:5173/entry/<ENTRY_TOKEN>
 */
export const ENTRY_TOKEN = 'okua-entry';

/**
 * Valida si un token es el token de acceso inicial.
 */
export function isValidEntryToken(token: string): boolean {
  return token === ENTRY_TOKEN;
}

/**
 * Mapa de token/slug → ID de estación (1–5).
 * Los tokens son identificadores de laboratorio; no contienen secretos.
 * Para producción, imprimir QR con la URL completa:
 *   http://<ip-servidor>:5173/qr/<token>
 */
export const QR_TOKENS: Readonly<Record<string, number>> = {
  'okua-e1': 1,
  'okua-e2': 2,
  'okua-e3': 3,
  'okua-e4': 4,
  'okua-e5': 5,
};

/**
 * Resuelve un token QR a su ID de estación.
 * Devuelve null si el token no existe en el mapa.
 */
export function resolveQrToken(token: string): number | null {
  return QR_TOKENS[token] ?? null;
}
