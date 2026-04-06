// Configuración de entorno para apps/web.
// Los valores se inyectan en build-time por Vite desde .env.local (no versionado)
// o desde .env.example como referencia.
//
// En desarrollo con proxy Vite activo, API_BASE_URL es cadena vacía y las
// peticiones a /api/* se reenvían automáticamente al servidor local.
// En producción o acceso directo, debe definirse VITE_API_BASE_URL.

export const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL ?? '';

/**
 * Modo de operación de la aplicación.
 *
 * - 'lab'   → Desarrollo/pruebas. El botón "Continuar sin QR" es visible en
 *             estaciones para poder navegar sin escanear el QR físico.
 * - 'field' → Uso real en espacio. El bypass manual queda oculto; el visitante
 *             debe escanear el QR de cada estación para avanzar.
 *
 * Configurar en .env.local:
 *   VITE_APP_MODE=lab     (por defecto si no se define)
 *   VITE_APP_MODE=field
 */
export const APP_MODE: 'lab' | 'field' =
  import.meta.env.VITE_APP_MODE === 'field' ? 'field' : 'lab';
