# GVO F9-05 - Reporte de concurrencia y soak de laboratorio

## 1. Proposito

Este documento registra pruebas de concurrencia minima y soak de laboratorio contra la base URL LAN validada.

No declara piloto ejecutado en campo.
No declara QR finales de campo.
No declara v1 estable.
No reemplaza prueba de campo real.
No reemplaza el reporte go/no-go final.
Puede habilitar F9-06 si las pruebas pasan sin bloqueos.

## 2. Estado heredado

- F9-04 quedo: `RECORRIDO COMPLETO VALIDADO EN LABORATORIO`
- Base URL validada: `http://192.168.1.74:3001`
- Dispositivo validado: iPhone SE de segunda generacion + Chrome
- F9-05 puede iniciar: si

Observaciones heredadas:

- Salto directo fuera de secuencia `/qr/okua-e5` no fue probado como entrada directa antes de completar estaciones; quedo como reingreso controlado tras sesion agotada.
- Revisita libre sin reentrada de sesion no quedo demostrada como acceso libre puro; quedo documentado reinicio controlado.
- QR temporales de laboratorio no fueron la base de la validacion operativa; la validacion formal de F9-04 fue por URL directa.
- Campo real sigue pendiente.

## 3. Datos de ejecucion

| Campo | Valor |
| --- | --- |
| Fecha | 2026-04-25 |
| Responsable | Codex / Jose David |
| Rama | `main` |
| Commit probado | `26b62bf` (`docs(ops): record lab full journey validation`) |
| Version visible | `0.9.0-rc.1` |
| Entorno | laboratorio |
| Base URL | `http://192.168.1.74:3001` |
| Modo | field-like |
| `VITE_APP_MODE=field` confirmado | si |
| `localhost` como URL de visitante | no |
| Tailscale como URL de visitante | no |
| Servidor | `npm start` |
| Puerto | `3001` |

## 4. Validaciones automaticas previas

| Validacion | Resultado |
| --- | --- |
| `git status --short` | habia residuos locales preexistentes y QR temporales generados en la corrida |
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

## 6. Modalidad de acceso

Modalidad utilizada en esta corrida:

- URL directa
- QR temporal de laboratorio

Comando de QR temporal ejecutado por el responsable:

```bash
npm run qr:generate -- --base-url http://192.168.1.74:3001
```

Observacion humana aportada:

- el acceso por QR temporal abre la experiencia `Proyecto OKUA` con `Comenzar recorrido?`;
- la validacion completa de laboratorio para esta fase quedo mejor representada por acceso directo a la base URL LAN;
- si se intenta saltar pasos, el sistema bloquea como espera la secuencia pedagogica;
- al completar el recorrido por URL directa, el responsable indico que luego pudo revisar lo que quisiera.

## 7. Prueba de concurrencia

Comando ejecutado:

```bash
npm run pilot:concurrency -- --base-url http://192.168.1.74:3001 --sessions 3
```

Resultado:

- sesiones concurrentes: 3
- sesiones exitosas: 3
- sesiones fallidas: 0
- total: 273 ms
- `/health` final: 200
- `/api/meta` final: 200

Resumen por sesion:

- Session 1: OK (259 ms)
- Session 2: OK (111 ms)
- Session 3: OK (118 ms)

Archivos generados por el script:

- `reports/pilot-validation/pilot-concurrency-2026-04-25T14-18-41-836Z.json`
- `reports/pilot-validation/pilot-concurrency-2026-04-25T14-18-41-836Z.txt`

Regla de versionado:

- no versionados por defecto
- permanecen como evidencia local

## 8. Prueba de soak

Comando ejecutado:

```bash
npm run pilot:soak -- --base-url http://192.168.1.74:3001 --minutes 10 --interval-seconds 15
```

Resultado:

- duracion: 10 minutos
- intervalo: 15 segundos
- ciclos: 40
- checks: 200
- fallos: 0
- rutas unicas: 10
- promedio: 10 ms
- minimo: 2 ms
- maximo: 711 ms

Archivos generados por el script:

- `reports/pilot-validation/pilot-soak-2026-04-25T14-29-56-198Z.json`
- `reports/pilot-validation/pilot-soak-2026-04-25T14-29-56-198Z.txt`

Regla de versionado:

- no versionados por defecto
- permanecen como evidencia local

## 9. Verificacion manual posterior

Despues de la corrida, el responsable humano confirmo desde iPhone SE + Chrome:

- `<BASE_URL>/` abre
- `<BASE_URL>/entry/okua-entry` abre
- no hubo lentitud critica
- no hubo error de red
- la app siguio usable
- no se observo degradacion visible

## 10. Revisión de deudas heredadas de F9-04

- Salto directo fuera de secuencia `/qr/okua-e5`: no probado como entrada directa antes del recorrido; se mantuvo el comportamiento de bloqueo/reingreso controlado.
- Revisita libre sin reentrada: no probada como acceso libre puro; se mantuvo el reinicio controlado.
- QR temporales de laboratorio: probados solo como soporte local de acceso, no como artefacto versionado.

## 11. Incidencias

No se registraron incidencias bloqueantes.

Clasificacion:

- A - bloqueante: no
- B - tolerable: no
- C - documental: si, los QR temporales de laboratorio quedaron como evidencia local y no como artefacto versionado

## 12. Decision de F9-05

- `CONCURRENCIA Y SOAK VALIDADO EN LABORATORIO`: si
- `BLOQUEADO`: no

## 13. Condicion para F9-06

- F9-06 puede iniciar: si

F9-06 recomendado despues de F9-05:

Consolidar reporte operativo de laboratorio y preparar paquete go/no-go para piloto/campo, dejando explicito lo que sigue pendiente en campo.

## 14. Evidencia y residuos

- Base URL usada: `http://192.168.1.74:3001`
- Comandos ejecutados:
  - `npm run qr:generate -- --base-url http://192.168.1.74:3001`
  - `npm run pilot:concurrency -- --base-url http://192.168.1.74:3001 --sessions 3`
  - `npm run pilot:soak -- --base-url http://192.168.1.74:3001 --minutes 10 --interval-seconds 15`
- Reportes generados:
  - `reports/pilot-validation/pilot-concurrency-2026-04-25T14-18-41-836Z.json`
  - `reports/pilot-validation/pilot-concurrency-2026-04-25T14-18-41-836Z.txt`
  - `reports/pilot-validation/pilot-soak-2026-04-25T14-29-56-198Z.json`
  - `reports/pilot-validation/pilot-soak-2026-04-25T14-29-56-198Z.txt`
- Reportes generados versionados: no
- `.env.local`: ausente / no versionado
- perfiles `.local.json`: ausentes / no versionados
- QR generados: si, temporales de laboratorio
- QR revertidos: si, antes del cierre
- release candidate generado: no
- residuos locales:
  - `.agents/`
  - `.claude/settings.json`
  - `GVO_ESTADO_TECNICO_*.txt`

## 15. Cierre

La concurrencia y el soak de laboratorio quedaron validados sobre `192.168.1.74:3001` con `VITE_APP_MODE=field` confirmado, sin usar `localhost` ni Tailscale como URL de visitante, sin fallos bloqueantes y con verificacion manual posterior por iPhone SE + Chrome.
