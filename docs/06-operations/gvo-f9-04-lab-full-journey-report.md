# GVO F9-04 - Reporte de recorrido completo de laboratorio

## 1. Proposito

Este documento registra el recorrido completo de laboratorio en flujo field-like, posterior a la validacion movil F9-03T.

No declara piloto ejecutado en campo.
No declara QR finales de campo.
No declara v1 estable.
No reemplaza soak/concurrencia.
No reemplaza reporte de piloto de campo.
Puede habilitar F9-05 si el recorrido completo pasa sin bloqueos.

## 2. Estado heredado

- F9-03T quedo: `QA MÓVIL VALIDADA EN LABORATORIO`
- Dispositivo validado: iPhone SE de segunda generacion + Chrome.
- Base URL field-like validada: `http://192.168.1.74:3001`
- F9-04 puede iniciar en laboratorio: si.
- QR temporales: no generados en F9-03T.

## 3. Datos de ejecucion

| Campo | Valor |
| --- | --- |
| Fecha | 2026-04-25 |
| Responsable | Codex / Jose David |
| Rama | `main` |
| Commit probado | `58d930b` (`docs(ops): record iphone lab mobile qa validation`) |
| Version visible | `0.9.0-rc.1` |
| Entorno | laboratorio |
| Dispositivo | iPhone SE de segunda generacion |
| Navegador | Chrome |
| Red | Wi-Fi de laboratorio aprobada, sin exponer contraseña |
| Base URL | `http://192.168.1.74:3001` |
| Modo | field-like |
| `VITE_APP_MODE=field` confirmado antes del build | si |
| `.env.local` usado | no aplica |
| `.env.local` versionado | no |
| `localhost` como URL de visitante | no |
| Tailscale como URL de visitante | no |
| Datos moviles como ruta principal | no |

## 4. Validaciones automaticas

| Validacion | Resultado |
| --- | --- |
| `git status --short` | solo quedaron residuos locales preexistentes fuera de este ticket |
| `npm run typecheck` | pasa |
| `npm run build` | pasa |
| `npm run smoke:journey` | pasa |
| `npm run verify:local` | pasa |

Antes de construir field-like, se confirmo `VITE_APP_MODE=field` con entorno temporal no versionado.

## 5. Servidor field-like

Se levanto servidor field-like en terminal separada con `npm start`.

Confirmacion local:

- Backend activo.
- SPA servida por Fastify.
- Puerto `3001` activo.
- URL LAN visible en consola:
  - `http://192.168.1.74:3001`
  - `http://127.0.0.1:3001`
- Logs disponibles durante la ejecucion temporal.
- No aparecio bypass de laboratorio en la vista validada.

Nota:

`npm start` y `npm run start:windows` pueden quedar en ejecucion. El resto de la validacion se documento con la prueba humana ya realizada en iPhone.

## 6. Ciclo guiado con el responsable humano

Base URL LAN usada:

`http://192.168.1.74:3001`

Modalidad de acceso:

- URL directa
- sin QR temporal

Confirmaciones del responsable humano:

1. El iPhone SE de segunda generacion con Chrome abrio la base URL LAN.
2. No se uso `localhost` como URL de visitante.
3. No se uso Tailscale como URL de visitante.
4. No se usaron datos moviles como ruta principal.
5. No aparecio bypass de laboratorio.
6. No hubo audio no esperado.
7. No se pidio escribir nada.
8. La app se vio correctamente en pantalla pequena.
9. No hubo errores visuales relevantes.

## 7. Recorrido completo - primera pasada

El recorrido completo de laboratorio en flujo field-like quedo validado en iPhone SE + Chrome.

| Paso | Ruta o accion | Resultado | Observaciones |
| --- | --- | --- | --- |
| Entrada | `/entry/okua-entry` | pasa | Abre la entrada del recorrido correctamente. |
| Intro | `/intro` o flujo equivalente | pasa | Se leyo y se avanzo sin bloqueo tecnico. |
| Estacion I | `/station/1` | pasa | Se muestra correctamente en iPhone SE. |
| Estacion II | `/station/2` | pasa | SVG integrado visible y correcto. |
| Estacion III | `/station/3` | pasa | Se muestra correctamente. |
| Estacion IV | `/station/4` | pasa | Se muestra correctamente con cadena tecnica completa. |
| Estacion V | `/station/5` | pasa | WebP integrado visible y correcto. |
| Final | `/final` | pasa | Finaliza el recorrido correctamente. |

## 8. Prueba de secuencia pedagogica

Se verifico el comportamiento de bloqueo/reinicio al reingresar con la sesion ya agotada.

Resultado observado:

- al volver a entrar por el enlace tras agotar la sesion, el sistema obligo a reiniciar el recorrido;
- no hubo error tecnico;
- no hubo bypass de laboratorio;
- el bloqueo funciono como comportamiento pedagogico esperado.

No se registro un salto fuera de secuencia distinto de ese reingreso controlado.

## 9. Prueba de revisita libre posterior

Comportamiento observado:

- al completar el recorrido y luego reingresar con la sesion agotada, la app obligo a reiniciar el recorrido;
- la revisita libre no quedo demostrada como acceso sin reentrada de sesion;
- el comportamiento fue consistente con el estado actual de la app.

## 10. Verificaciones UX movil

Confirmado en iPhone SE:

- legibilidad general: si;
- CTA visible: si;
- sin escritura obligatoria: si;
- sin audio: si;
- sin bypass de laboratorio: si;
- no hay scroll roto: si;
- Estacion IV muestra la cadena tecnica completa;
- Estacion II muestra SVG integrado;
- Estacion V muestra WebP integrado;
- Intro / I / III mantienen placeholders aceptados.

Cadena de Estacion IV:

`planta → bionosificador → ESP32 → MIDI → Wi-Fi/UDP → router → sistema central → sonido`

## 11. Incidencias

No se registraron incidencias bloqueantes.

Clasificacion:

- A - bloqueante: no
- B - tolerable: no
- C - documental: si, el reingreso tras agotar sesion obliga reinicio del recorrido

## 12. Decision de F9-04

- `RECORRIDO COMPLETO VALIDADO EN LABORATORIO`: si
- `BLOQUEADO`: no

## 13. Condicion para F9-05

- F9-05 puede iniciar: si

F9-05 recomendado despues de F9-04:

Ejecutar concurrencia y soak de laboratorio contra base URL LAN.

## 14. Evidencia y residuos

- Base URL usada: `http://192.168.1.74:3001`
- Dispositivo: iPhone SE de segunda generacion
- Navegador: Chrome
- `VITE_APP_MODE=field` confirmado: si
- Modalidad de acceso: URL directa
- QR generados/revertidos: no generados en esta corrida
- Release candidate generado/revertido: no generado en esta corrida
- `.env.local`: ausente / no versionado
- perfiles `.local.json`: ausentes / no versionados
- residuos locales:
  - `.agents/`
  - `.claude/settings.json`
  - `GVO_ESTADO_TECNICO_*.txt`

## 15. Cierre

El recorrido completo de laboratorio quedo validado en flujo field-like sobre `192.168.1.74:3001`, sin usar `localhost` ni Tailscale como URL de visitante, y sin bloqueo tecnico en la primera pasada.
