# GVO F9-03R - Ejecucion de QA movil real de conectividad y QR

## 1. Proposito

Este documento registra la ejecucion real, o el bloqueo explicito, de la QA movil posterior a F9-03.

No declara piloto ejecutado.
No declara recorrido completo validado.
No reemplaza F9-04.
No reemplaza el reporte final de piloto.
Solo decide si se puede iniciar F9-04 o si hay bloqueo operativo previo.

## 2. Estado heredado

- F9-02: `VALIDACION PARCIAL`.
- F9-03: `QA MÓVIL PREPARADA`.
- Motivo heredado: no hubo prueba movil real previa.
- Regla heredada: no iniciar F9-04 como recorrido completo validado si no se ejecuta QA movil real.

## 3. Datos de la ejecucion

| Campo | Valor |
| --- | --- |
| Fecha | 2026-04-24 |
| Responsable | Codex / Jose David |
| Rama | `main` |
| Commit probado | `51a7e08` (`docs(ops): add mobile network qa plan for field pilot`) |
| Version visible | `0.9.0-rc.1` |
| Entorno | `no ejecutado por bloqueo` |
| Base URL usada | `http://localhost:3001` para verificacion tecnica local; no valida para visitantes |
| Host/IP | `localhost` |
| Puerto | `3001` |
| Red usada por el movil | No aplica |
| `Wi-Fi MikroTik` | No |
| `QR Wi-Fi MikroTik` probado | No |
| `QR GVO` probado | No |
| Internet disponible | No aplica |
| La app depende de internet | No |
| Tailscale usado como visitante | No |
| Maquina servidor | Esta workstation Windows |
| Sistema operativo servidor | Windows |
| Navegadores/dispositivos disponibles | No hubo movil real disponible en esta ejecucion |

## 4. Preparacion tecnica local

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

## 5. Base URL autorizada para la prueba

La QA movil real no pudo ejecutarse, por lo que no hubo una base URL de visitante validada.

La base URL usada solo para checks tecnicos locales fue:

`http://localhost:3001`

Eso no cuenta como URL de visitante ni como base URL final de campo.

Tailscale no se uso como visitante.
No se declaro URL final de campo.

## 6. Matriz de dispositivos probados

| Dispositivo | Sistema operativo | Navegador | Red | Base URL | `/` | `/entry/okua-entry` | `/qr/okua-e1` | `/qr/okua-e2` | `/station/1` | `/final` | Modo `field` sin bypass | Resultado | Incidencias |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Android + Chrome | No disponible | No disponible | No disponible | No disponible | No disponible | No disponible | No disponible | No disponible | No disponible | No disponible | No disponible | No ejecutado | Limitacion registrada: no hubo movil real |
| Android + navegador alterno | No disponible | No disponible | No disponible | No disponible | No disponible | No disponible | No disponible | No disponible | No disponible | No disponible | No disponible | No ejecutado | Limitacion registrada: no hubo movil real |
| iPhone + Safari | No disponible | No disponible | No disponible | No disponible | No disponible | No disponible | No disponible | No disponible | No disponible | No disponible | No disponible | No ejecutado | Limitacion registrada: no hubo movil real |
| Otro dispositivo disponible | No disponible | No disponible | No disponible | No disponible | No disponible | No disponible | No disponible | No disponible | No disponible | No disponible | No disponible | No ejecutado | Limitacion registrada: no hubo movil real |

## 7. Prueba de QR Wi-Fi MikroTik

No ejecutado.

No hubo dispositivo movil real disponible y no se conto con una red MikroTik de visitantes para completar esta parte de la prueba.

## 8. Prueba de QR de entrada GVO

No ejecutado.

No hubo movil real disponible para abrir una URL de visitante desde red local.
No se valido un QR de entrada GVO con base URL final de campo.

## 9. Prueba de QR de estacion GVO

No ejecutado.

No hubo movil real disponible para probar al menos un QR de estacion GVO desde la red local.

## 10. Criterios de bloqueo

Esta ejecucion queda bloqueada porque:

- No hubo movil real disponible.
- No se pudo ejecutar prueba fisica de QR Wi-Fi MikroTik.
- No se pudo ejecutar prueba fisica de QR de entrada GVO.
- No se pudo ejecutar prueba fisica de QR de estacion GVO.
- No se pudo confirmar acceso desde navegador real en red de visitante.

## 11. Decision de F9-03R

- QA MÓVIL VALIDADA EN LABORATORIO: no.
- QA MÓVIL VALIDADA EN CAMPO: no.
- BLOQUEADO: si.

No usar `QA MÓVIL PREPARADA` como cierre de este ticket.
Ese estado ya fue usado en F9-03. Este ticket solo valida o bloquea.

## 12. Condicion para iniciar F9-04

- F9-04 puede iniciar: no.

Motivo:

Falta QA movil real con al menos un dispositivo navegando desde una red local de laboratorio o de campo. Sin esa evidencia no se debe iniciar F9-04 como recorrido completo validado.

## 13. Evidencia

- Base URL usada: `http://localhost:3001` solo para verificacion tecnica local.
- Dispositivo y navegador: no hubo movil real disponible.
- Red usada: no aplica para movilidad.
- Resultado de QR Wi-Fi MikroTik: no ejecutado.
- Resultado de QR entrada GVO: no ejecutado.
- Resultado de QR estacion GVO: no ejecutado.
- Resultado de modo `field` sin bypass: no validado en movil real.
- Incidencias: bloqueo por ausencia de movil real.
- Capturas o notas operativas: no generadas para prueba movil, porque no hubo prueba movil.

## 14. Cierre

Estado: `BLOQUEADO`

Este reporte deja trazabilidad de la ejecucion local y del bloqueo operativo.
La validacion real de movilidad queda pendiente para una sesion con dispositivos reales y red local disponible.
