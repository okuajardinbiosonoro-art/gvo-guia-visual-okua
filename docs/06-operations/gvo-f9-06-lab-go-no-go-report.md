# GVO F9-06 - Reporte go/no-go operativo de laboratorio

## 1. Proposito

Este documento consolida la evidencia operativa de Fase 9 hasta F9-05 y emite una decision clara sobre laboratorio, campo y v1 estable.

No declara piloto ejecutado en campo.
No declara QR finales de campo.
No declara v1 estable.
No reemplaza el reporte de piloto de campo.
No implementa cambios tecnicos.
No cierra globalmente Fase 9.

## 2. Estado heredado de F9-01 a F9-05

| Ticket | Resultado | Evidencia principal | Estado |
|---|---|---|---|
| F9-01 | Checklist operativo | `field-preflight-checklist.md` | cerrado |
| F9-02 | QR/base URL laboratorio parcial | `gvo-f9-02-field-qr-validation.md` | cerrado con validacion parcial |
| F9-03 | Plan movil/red | `gvo-f9-03-mobile-network-qa-plan.md` | preparado |
| F9-03R | Bloqueo por falta de movil | `gvo-f9-03r-mobile-network-qa-execution.md` | bloqueado documentado |
| F9-03S | Perfiles lab/campo | `lab-profile.example.json` / `field-profile.okua.example.json` | bloqueado documentado |
| F9-03T | QA movil iPhone lab | iPhone SE + Chrome en 3001 | validado |
| F9-04 | Recorrido completo lab | Entrada -> Final | validado |
| F9-05 | Concurrencia/soak lab | 3 sesiones, 10 min, 0 fallos | validado |

## 3. Evidencia tecnica consolidada

- Version visible: `0.9.0-rc.1`
- Base URL laboratorio: `http://192.168.1.74:3001`
- Perfil: field-like
- Modo: `VITE_APP_MODE=field`
- Dispositivo probado: iPhone SE de segunda generacion + Chrome
- Recorrido completo: validado en laboratorio
- Concurrencia: 3 sesiones, 0 fallos
- Soak: 10 minutos, 40 ciclos, 0 fallos
- Verificacion manual posterior: `/` y `/entry/okua-entry` abren sin degradacion visible
- Reportes generados no versionados:
  - `reports/pilot-validation/pilot-concurrency-2026-04-25T14-18-41-836Z.json`
  - `reports/pilot-validation/pilot-concurrency-2026-04-25T14-18-41-836Z.txt`
  - `reports/pilot-validation/pilot-soak-2026-04-25T14-29-56-198Z.json`
  - `reports/pilot-validation/pilot-soak-2026-04-25T14-29-56-198Z.txt`

## 4. Decision go/no-go por entorno

### Laboratorio

- Decision: `GO LABORATORIO`

Motivo:

- QA movil real validada.
- Recorrido completo validado.
- Concurrencia validada.
- Soak validado.
- Sin errores bloqueantes.

### Campo

- Decision: `NO-GO CAMPO PARA PILOTO PUBLICO`
- Decision condicionada: `GO CONDICIONADO SOLO PARA PREPARAR VALIDACION DE CAMPO`

Motivo:

- No hay validacion de red MikroTik real.
- No hay validacion de IP de campo `192.168.88.251`.
- No hay QR Wi-Fi MikroTik ni QR finales de campo validados.
- No hay movilidad real en campo.
- No hay recorrido completo de campo.
- No hay reporte de piloto de campo.

### v1 estable

- Decision: `NO V1 ESTABLE`

Motivo:

- La evidencia valida laboratorio, no campo real.
- Faltan QR finales, red de campo, recorrido de campo y reporte de piloto de campo.

## 5. Deudas clasificadas

### A - bloqueante para campo

- QR finales de campo no generados ni probados.
- Red MikroTik no probada.
- Campo `192.168.88.251` no probado.
- Movil real conectado a red de campo no probado.
- Piloto con visitantes reales no ejecutado.

### B - tolerable para laboratorio, resolver antes de campo

- Flujo QR temporal no validado como recorrido completo con camara movil.
- Android no probado.
- Salto directo `/qr/okua-e5` antes del recorrido no probado formalmente.
- Revisita libre sin reentrada no demostrada como acceso libre puro.

### C - documental

- Reportes de scripts no versionados, solo referenciados.
- Evidencia local de `reports/pilot-validation/` queda fuera del repo por defecto.

## 6. Decision sobre el flujo QR

Postura:

- El problema de QR temporal no bloquea laboratorio ya validado por URL directa.
- El problema de QR temporal si bloquea campo, porque campo requiere el flujo oficial por QR y/o ruta final aprobada.
- Si requiere ticket correctivo antes de campo.
- La URL directa puede seguir como herramienta de diagnostico y laboratorio, pero no sustituye de forma permanente el flujo QR oficial.
- El siguiente flujo a probar debe ser el QR completo de laboratorio con camara movil y, despues, la validacion de campo con MikroTik e IP final.

Conclusiones:

- La URL directa valido laboratorio.
- El flujo QR temporal quedo como evidencia incompleta para recorrido completo.
- Antes de campo debe abrirse correctivo o validacion QR especifica.

## 7. Lo que no debe reabrirse

- No reabrir Lía Andina como guia unica.
- No reabrir multiavatar.
- No reabrir audio.
- No reabrir AR.
- No reabrir scanner QR interno.
- No reabrir Lía 3D runtime.
- No producir mas assets antes de piloto salvo correccion critica.
- No cambiar copy o microcopy aprobado salvo error bloqueante.
- No cambiar `content/stations/*.ts` para agregar `src`.
- No importar binarios fuera de `apps/web/src/lib/content.ts`.

## 8. Decision sobre cierre de Fase 9

**FASE 9 CERRADA A NIVEL DE LABORATORIO, ABIERTA PARA CAMPO**

Aclaracion:

- Fase 9 no queda cerrada globalmente.
- Fase 9 no queda cerrada como piloto de campo.
- Fase 9 sigue abierta para:
  - QR finales;
  - MikroTik;
  - IP de campo;
  - movil real en campo;
  - recorrido de campo;
  - reporte de piloto/campo.

## 9. Proximos tickets recomendados

1. F9-07 - Validar flujo QR completo de laboratorio con camara movil.
2. F9-08 - Ejecutar validacion de campo con MikroTik e IP `192.168.88.251`.
3. F9-09 - Emitir go/no-go final de piloto de campo.

## 10. Criterios de aceptacion del reporte F9-06

- [x] Resume F9-01 a F9-05.
- [x] Cita los documentos operativos generados.
- [x] Declara GO/NO-GO de laboratorio.
- [x] Declara NO-GO campo para piloto publico o GO condicionado solo para preparar validacion de campo.
- [x] Declara NO V1 ESTABLE.
- [x] Clasifica deudas A/B/C.
- [x] Toma postura sobre QR.
- [x] Recomienda maximo 3 tickets siguientes.
- [x] No reabre decisiones cerradas.
- [x] No declara piloto de campo ejecutado.
- [x] No declara QR finales de campo validados.
- [x] No declara v1 estable sin evidencia.
- [x] No declara Fase 9 cerrada globalmente.

## 11. Validaciones automaticas

- `git status --short`: verificado; el worktree conserva residuos locales preexistentes fuera de este ticket.
- `npm run typecheck`: pasa.
- `npm run build`: pasa.
- `npm run smoke:journey`: pasa.

## 12. Verificacion de contenido

- F9-01: presente.
- F9-02: presente.
- F9-03: presente.
- F9-04: presente.
- F9-05: presente.
- Decision QR: presente.
- Decision laboratorio: GO LABORATORIO.
- Decision campo: NO-GO CAMPO PARA PILOTO PUBLICO / GO CONDICIONADO SOLO PARA PREPARAR VALIDACION DE CAMPO.
- Decision v1 estable: NO V1 ESTABLE.
- Fase 9 cerrada globalmente: no.
- Multiavatar: no reabierto.
- Audio: no reabierto.
- AR: no reabierto.
- Scanner QR interno: no reabierto.
- Lía 3D: no reabierto.

## 13. Cierre

La evidencia de F9-01 a F9-05 cierra la lectura operativa de laboratorio: el sistema esta listo en laboratorio y validado en iPhone SE + Chrome contra `192.168.1.74:3001`, pero el campo sigue pendiente de red MikroTik, QR finales, IP de campo y recorrido de campo.

