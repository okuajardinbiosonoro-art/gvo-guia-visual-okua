# Autoarranque Windows

## Propósito

Dejar GVO listo para arrancar automáticamente en la PC Windows del piloto local mediante una Scheduled Task simple, reversible y entendible por una sola persona.

## Estrategia elegida

- Se instala una tarea programada al **inicio de sesión del usuario actual**.
- La tarea ejecuta `scripts/start-gvo.ps1`, que compila el repositorio y levanta el backend sirviendo el frontend compilado.
- Se evita un Windows Service nativo para no introducir más complejidad que la necesaria.

## Prerrequisitos

- Node.js 18 o superior.
- npm disponible en `PATH`.
- Dependencias instaladas (`npm install`).
- Permisos suficientes para registrar tareas programadas del usuario actual.

## Nombre de la tarea

- `GVO Local Autostart`

## Instalación

Desde la raíz del repo:

```bash
npm run autostart:install
```

La tarea queda registrada con:

- contexto: usuario actual
- trigger: logon del usuario actual
- working directory: raíz del repo
- comando: `powershell.exe -NoProfile -ExecutionPolicy Bypass -File scripts/start-gvo.ps1`

## Verificación de la tarea

Comprobar que la tarea existe:

```powershell
Get-ScheduledTask -TaskName 'GVO Local Autostart'
```

Si quieres ver el detalle completo:

```powershell
Get-ScheduledTask -TaskName 'GVO Local Autostart' | Format-List *
```

## Prueba de arranque

La forma más segura de probarla sin reiniciar toda la máquina es:

1. Registrar la tarea.
2. Confirmar que el backend local está arriba con `npm run verify:local`.
3. Cerrar el proceso local si ya estaba corriendo.
4. Cerrar sesión y volver a entrar, o reiniciar la PC.
5. Volver a ejecutar `npm run verify:local`.

## Desinstalación

```bash
npm run autostart:remove
```

Eso remueve la Scheduled Task sin fallar de forma agresiva si ya no existía.

## Verificación rápida post-arranque

```bash
npm run verify:local
```

El verificador consulta:

- `/health`
- `/api/meta`
- `/`

## Riesgos y limitaciones

- Esto no sustituye un Windows Service nativo.
- La tarea usa el contexto del usuario actual, así que depende de que esa sesión exista al iniciar.
- El arranque sigue apoyándose en `scripts/start-gvo.ps1`, que compila antes de levantar el backend.
- Si `apps/web/dist` no existe, el arranque fallará hasta que se ejecute `npm run build`.

## Reversión rápida

```bash
npm run autostart:remove
```

Si el piloto ya no debe autoiniciarse, ese es el único paso obligatorio para deshacer la instalación.
