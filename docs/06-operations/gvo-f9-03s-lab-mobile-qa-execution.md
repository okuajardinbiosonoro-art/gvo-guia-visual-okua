# GVO F9-03S - Ejecucion de QA movil en laboratorio con perfiles operativos

## 1. Proposito

Este documento registra la creacion de perfiles operativos seguros y la ejecucion o bloqueo de QA movil real en laboratorio.

No declara piloto ejecutado.
No declara recorrido completo validado.
No declara QR finales de campo.
Solo puede desbloquear F9-04 de laboratorio si hay movil real probado.
Las contraseñas Wi-Fi no se versionan.
Los SSID reales no se publican salvo aprobacion explicita del responsable.

## 2. Estado heredado

- F9-03R quedo `BLOQUEADO`.
- Motivo: no hubo movil real ni red de visitante.
- F9-04 no podia iniciar.

## 3. Perfiles creados

- `deploy/lab-profile.example.json`
- `deploy/field-profile.okua.example.json`

Confirmacion:

- No contienen contraseñas.
- No contienen `.env.local`.
- No usan Tailscale como URL de visitante.
- Usan `appMode: "field"`.

## 4. Configuracion de laboratorio

- Red Wi-Fi usada:
  - `LAB_WIFI_2G`
  - `LAB_WIFI_5G`
  - no ejecutado
- SSID real:
  - no registrado en repo / registrado con aprobacion explicita
- Contraseña:
  - no registrada en repo; gestionada por responsable humano.
- IP servidor:
  - `192.168.1.74`
  - `192.168.1.72`
- Base URL:
  - `http://192.168.1.74:3001`
  - `http://192.168.1.72:3001`

## 5. Preparacion local

| Validacion | Resultado |
| --- | --- |
| `git status --short` | Se verifico; solo quedaron residuos preexistentes fuera de este ticket |
| `npm run typecheck` | pasa |
| `npm run build` | pasa |
| `npm run smoke:journey` | pasa |
| `npm run verify:local` | pasa |
| `npm start` | levantado temporalmente para validacion local; no persistido |

Confirmaciones observadas durante la verificacion local:

- Backend levantado.
- SPA servida por Fastify.
- Puerto `3001` activo.
- `HOST` permitio acceso LAN en la verificacion local.
- `logs/gvo-local.log` estuvo disponible durante la ejecucion temporal.

## 6. Generacion temporal de QR de laboratorio

No ejecutado en esta corrida por bloqueo de QA movil real.

La salida baseline de QR sigue siendo referencia versionada, no paquete final de campo.

## 7. Preparacion temporal de release candidate de laboratorio

No ejecutado en esta corrida por bloqueo de QA movil real.

## 8. QA movil real en laboratorio

No ejecutado.

No hubo movil real disponible para probar:

- `/`
- `/entry/okua-entry`
- `/qr/okua-e1`
- `/station/1`

## 9. Criterios de bloqueo

Esta ejecucion queda bloqueada porque:

- No hubo movil real disponible.
- No se pudo ejecutar prueba fisica de QR Wi-Fi de laboratorio.
- No se pudo ejecutar prueba fisica de QR de entrada GVO.
- No se pudo ejecutar prueba fisica de QR de estacion GVO.
- No se pudo confirmar acceso desde navegador real en red de visitante.

## 10. Decision

- `QA MÓVIL VALIDADA EN LABORATORIO`: no.
- `BLOQUEADO`: si.

## 11. Condicion para F9-04

- F9-04 puede iniciar en laboratorio: no.

Motivo:

Falta QA movil real con al menos un dispositivo navegando desde una red local de laboratorio. Sin esa evidencia no se debe iniciar F9-04 como recorrido completo validado.

## 12. Evidencia y residuos

- QR generados/revertidos: no ejecutado en esta corrida.
- Release candidate generado/revertido: no ejecutado en esta corrida.
- Perfil local temporal creado/eliminado: no creado.
- `.env.local` ausente o no versionado: ausente.
- Residuos locales:
  - `.agents/`
  - `.claude/settings.json`
  - `GVO_ESTADO_TECNICO_*.txt`
