# GVO F9-07R - Retest fisico del flujo QR secuencial de laboratorio

## 1. Proposito

Este documento registra el retest fisico posterior a los correctivos:

- `510fd6b` - persistencia de sesion entre contextos con `localStorage` / `sessionStorage`.
- `08a9f33` - validacion exacta del QR esperado.
- `86efd5b` - revisitas a estaciones desbloqueadas.

Aclaraciones:

- No declara piloto ejecutado en campo.
- No declara QR finales de campo.
- No declara v1 estable.
- No implementa scanner QR interno.
- No reemplaza la validacion con MikroTik.
- Puede habilitar F9-08 solo si el flujo QR completo pasa fisicamente.

## 2. Estado heredado

- F9-07 quedo bloqueado: `QR BLOQUEADO - REQUIERE CORRECTIVO`.
- El codigo fue corregido despues del bloqueo.
- Faltaba retest fisico con iPhone y camara externa.
- F9-08 no puede iniciar hasta cerrar este retest.

## 3. Datos de ejecucion

| Campo | Valor |
| --- | --- |
| Fecha | 2026-05-01 |
| Responsable | Codex |
| Rama | `main` |
| Commit probado | `86efd5b` |
| Version visible | `0.9.0-rc.1` |
| Entorno | laboratorio |
| Base URL | `http://192.168.1.75:3001` |
| Dispositivo | iPhone SE de segunda generacion |
| Navegador | Chrome |
| Modalidad | camara externa del movil o lector QR externo del SO |
| Modo | field-like |
| `VITE_APP_MODE=field` confirmado | si |
| `localhost` como URL de visitante | no |
| `Tailscale` como URL de visitante | no |
| Scanner QR interno | no |

Nota:

- En esta corrida, el servidor local anuncio `192.168.1.75` como IP LAN activa.
- La base URL usada para generar QR temporales fue la IP LAN activa observada en esta ejecucion.
- El retest fisico con iPhone/camara externa no pudo ejecutarse en esta corrida, por lo que las pruebas manuales quedan marcadas como no ejecutadas.

## 4. Preparacion automatica

Resultados de la preparacion automatica:

- `git status --short`: habia residuos locales preexistentes fuera de este ticket.
- `git log --oneline -8`: confirma `86efd5b` y los correctivos previos.
- `npm run typecheck`: pasa.
- `npm run build` con `VITE_APP_MODE=field`: pasa.
- `npm run smoke:journey`: pasa.
- `npm run verify:local`: pasa.

Verificacion del modo:

- `apps/web/src/config.ts` usa `VITE_APP_MODE`.

## 5. Generacion temporal de QR de laboratorio

Comando ejecutado:

```bash
npm run qr:generate -- --base-url http://192.168.1.75:3001
```

Revision del manifiesto:

- `content/qr/generated/qr-manifest.md`
- `content/qr/generated/qr-manifest.json`

Confirmacion:

- contiene `okua-entry`
- contiene `okua-e1`
- contiene `okua-e2`
- contiene `okua-e3`
- contiene `okua-e4`
- contiene `okua-e5`
- usa `http://192.168.1.75:3001`
- no usa `localhost`

Estado de los QR temporales:

- generados: si
- revertidos antes del commit: si
- versionados: no

## 6. Ciclo guiado con el responsable humano

No ejecutado en esta corrida.

Motivo:

- No se conto con la interaccion fisica del iPhone/camara externa durante esta ejecucion.
- No se recibio retroalimentacion manual paso a paso para los escaneos QR.

## 7. Prueba positiva - flujo QR completo

| Paso | QR/accion | Resultado | Pantalla observada | Incidencia |
| --- | --- | --- | --- | --- |
| Entrada | `/entry/okua-entry` | no ejecutado | - | sin retest fisico |
| Intro | boton iniciar recorrido | no ejecutado | - | sin retest fisico |
| E1 | llegada tras intro | no ejecutado | - | sin retest fisico |
| E2 | `/qr/okua-e2` | no ejecutado | - | sin retest fisico |
| E3 | `/qr/okua-e3` | no ejecutado | - | sin retest fisico |
| E4 | `/qr/okua-e4` | no ejecutado | - | sin retest fisico |
| E5 | `/qr/okua-e5` | no ejecutado | - | sin retest fisico |
| Final | flujo final | no ejecutado | - | sin retest fisico |

Confirmaciones:

- no vuelve indebidamente a introduccion: no ejecutado
- no usa localhost: no ejecutado
- no usa Tailscale: no ejecutado
- no aparece bypass de laboratorio: no ejecutado
- no hay audio: no ejecutado
- no hay escritura obligatoria: no ejecutado

## 8. Prueba negativa - QR de estacion actual

No ejecutado en esta corrida.

Esperado:

- En E2, escanear QR E2 debe permanecer en E2, sin avanzar ni reiniciar.

## 9. Prueba negativa - QR anterior desbloqueado

No ejecutado en esta corrida.

Esperado:

- En E3, escanear QR E2 debe permitir ver E2 y luego volver a E3.

## 10. Prueba negativa - QR futuro no desbloqueado

No ejecutado en esta corrida.

Esperado:

- En E1, escanear QR E4 debe bloquear con mensaje comprensible, sin 500 ni pantalla rota.

## 11. Prueba negativa - mismo QR repetido

No ejecutado en esta corrida.

Esperado:

- En E2, escanear QR E2 multiples veces debe seguir en E2, sin avance indebido ni error critico.

## 12. Prueba negativa - QR entrada despues de avanzar

No ejecutado en esta corrida.

Esperado:

- Desde E2 o superior, escanear QR entrada debe registrarse como comportamiento operable / deuda manual.

## 13. Observacion sobre pestañas nuevas

No observado en esta corrida.

Motivo:

- No hubo retest fisico con la camara externa del iPhone.

## 14. Decision F9-07R

- `QR BLOQUEADO - NO EJECUTADO`

## 15. Condicion para F9-08

- F9-08 puede iniciar: no

Motivo:

- El retest fisico requerido por F9-07R no se ejecuto en esta corrida.
- Aunque las validaciones automaticas y la generacion temporal de QR pasaron, falta la verificacion fisica con iPhone/camara externa para cerrar la brecha operativa.

## 16. Evidencia y residuos

- Base URL usada: `http://192.168.1.75:3001`
- Commit probado: `86efd5b`
- QR generados: si
- QR temporales revertidos: si
- Modalidad de camara / dispositivo / navegador: planificada como camara externa del iPhone SE + Chrome, no ejecutada fisicamente
- Resultado de pruebas positivas y negativas: no ejecutadas fisicamente
- `.env.local`: ausente / no versionado
- `deploy/*.local.json`: ausentes / no versionados
- `content/qr/generated/`: revertido
- `reports/pilot-validation/`: no versionados
- Residuos locales:
  - `.agents/`
  - `.claude/settings.json`
  - `GVO_ESTADO_TECNICO_2026-04-12.txt`

Notas:

- `origin/main` fue verificado en `git log` con `86efd5b` como commit activo para la correccion QR.
- No se declaro QR final de campo ni v1 estable.
- No se implemento scanner QR interno.
- No se modifico codigo en este ticket.
- Si el retest queda pendiente, el siguiente ticket debe ser F9-07S.
