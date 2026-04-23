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
npm run start:windows
```

Ambos ejecutan `scripts/start-gvo.ps1`, que valida el entorno, compila y luego levanta el backend en modo local con el frontend estático incluido.

## Autoarranque y recuperación básica

Si quieres que GVO vuelva a levantarse de forma automática al iniciar sesión en Windows, instala la tarea programada:

```bash
npm run autostart:install
```

La tarea creada se llama `GVO Local Autostart` y usa el contexto del usuario actual.

Para eliminarla:

```bash
npm run autostart:remove
```

Para comprobar rápidamente que el entorno local quedó arriba después de un reinicio o una instalación:

```bash
npm run verify:local
```

El verificador consulta `/health`, `/api/meta` y `/` y resume el resultado en consola.

## Política local activa

- CORS: `same-origin` por defecto en el arranque local del piloto.
- Rate limit: `60 req/min` global por IP y `10 req/min` para `POST` del journey.
- Log persistente: `logs/gvo-local.log`.

## Generación de QR

Antes de imprimir, generar los QR con la base URL final del piloto:

```bash
npm run qr:generate -- --base-url http://localhost:3001
```

Para el piloto de campo, sustituir `http://localhost:3001` por la IP o hostname final y revisar el manifiesto en `content/qr/generated/qr-manifest.md`.

La lista operativa para validar antes de imprimir está en `docs/06-operations/field-preflight-checklist.md`.
La interpretación del paquete de QR sample vs final está en `content/qr/README.md`.

## Corte de release candidate de campo

Antes de imprimir QR finales o mover el bundle a la PC de campo, prepara el release candidate con el perfil field:

```bash
npm run prepare:field-release -- --profile deploy/field-profile.example.json
```

Ese corte:

- valida que la versión visible y la metadata pública estén sincronizadas;
- regenera los QR finales usando la `baseUrl` del perfil;
- deja un manifiesto reproducible en `deploy/field-release-candidate/`;
- sirve como entrada directa al preflight de campo.

## Validación de laboratorio

Antes de acercarte a campo, usa el kit de validación reproducible:

```bash
npm run pilot:soak -- --base-url http://localhost:3001 --minutes 1
npm run pilot:concurrency -- --base-url http://localhost:3001 --sessions 3
```

Los resultados se escriben en `reports/pilot-validation/` y el formato de cierre está en `docs/templates/PILOT_VALIDATION_REPORT_TEMPLATE.md`.

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
- `429 rate_limit_exceeded`: se alcanzó el límite básico del piloto; esperar un minuto o reducir el ritmo de pruebas.
- `logs/gvo-local.log` no aparece: confirmar que el arranque se hizo desde `scripts/start-gvo.ps1` o `npm run start:windows`.
- El manifiesto QR muestra URLs viejas: volver a ejecutar `npm run qr:generate` con la base URL correcta.
- El release candidate de campo queda desalineado: volver a ejecutar `npm run prepare:field-release -- --profile deploy/field-profile.example.json`.
- El soak o la concurrencia fallan: revisar `reports/pilot-validation/` y reintentar con el backend arriba en `http://localhost:3001`.

## Limitaciones conocidas

- Sesiones en memoria: reiniciar el backend limpia el estado.
- Rate limiting básico sin política avanzada ni Redis.
- Logging persistente simple, sin rotación avanzada todavía.
- Autoarranque basado en Scheduled Task de inicio de sesión del usuario actual; no es un Windows Service nativo.
- Sin HTTPS local.
- Sin integración con QR físicos ni producción Windows final.
- El kit de validación de laboratorio no reemplaza la prueba real en el espacio.
