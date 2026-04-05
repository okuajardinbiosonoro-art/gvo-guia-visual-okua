// Configuración de entorno para apps/web.
// Los valores se inyectan en build-time por Vite desde .env.local (no versionado)
// o desde .env.example como referencia.
//
// En desarrollo con proxy Vite activo, API_BASE_URL es cadena vacía y las
// peticiones a /api/* se reenvían automáticamente al servidor local.
// En producción o acceso directo, debe definirse VITE_API_BASE_URL.

export const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL ?? '';
