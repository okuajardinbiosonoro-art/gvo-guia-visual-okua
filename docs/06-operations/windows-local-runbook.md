# Runbook local Windows

## Objetivo

Levantar GVO en una PC Windows de forma repetible para piloto local, con el frontend compilado servido desde el backend Fastify.

## Prerrequisitos

- Node.js 18 o superior.
- npm disponible en `PATH`.
- Dependencias instaladas en el repo (`npm install`).
- Workspace con build limpio o al menos compilación reciente.

## Comandos de build

```bash
npm run build
```

Esto compila `packages/shared`, `apps/web` y `apps/server`.

## Arranque operativo

Usar uno de estos comandos desde la raíz del repo:

```bash
npm start
```

O directamente:

```bash
npm run start:local
```

Ambos ejecutan `scripts/start-gvo.ps1`, que valida el entorno, compila y luego levanta el backend en modo local con el frontend estático incluido.

## Verificación básica

1. Abrir `http://localhost:3001/health`.
2. Confirmar respuesta `{"status":"ok", ...}`.
3. Abrir `http://localhost:3001/`.
4. Confirmar que carga `WelcomeScreen`.
5. Abrir `http://localhost:3001/api/meta`.
6. Confirmar `status: "journey-core-live"` y `features.stations: true`.

## Verificación de SPA

Probar una ruta profunda, por ejemplo:

- `/intro`
- `/station/1`
- `/final`
- `/entry/okua-entry`

Ninguna debe devolver 404 cuando el backend está sirviendo `apps/web/dist`.

## Cómo parar el sistema

- Si el proceso corre en la consola, detenerlo con `Ctrl + C`.
- Si el backend quedó como proceso aislado, cerrarlo desde el Administrador de tareas o con `Stop-Process` usando el PID correspondiente.

## Problemas comunes

- `apps/web/dist` no existe: correr `npm run build` antes de iniciar.
- `Node.js no encontrado`: instalar Node y reiniciar la consola.
- `npm run smoke:journey` falla por conexión: verificar que el backend realmente quedó arriba en `http://localhost:3001`.
- Una ruta SPA devuelve 404: confirmar que el arranque usó el backend en modo local y que `GVO_SERVE_WEB=true` se activó mediante `npm run start:local`.

## Limitaciones conocidas

- Sesiones en memoria: reiniciar el backend limpia el estado.
- Sin rate limiting.
- Sin logging persistente a archivo.
- Sin HTTPS local.
- Sin integración con QR físicos ni producción Windows final.

