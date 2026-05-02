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
- El responsable humano reporto la ejecucion fisica con iPhone/camara externa y confirmo el flujo secuencial correcto en laboratorio.

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

El responsable humano reporto la siguiente secuencia fisica con iPhone SE + Chrome y camara externa:

1. El primer QR lleva a la introduccion.
2. Desde la introduccion, `Comenzar recorrido` lleva a E1.
3. Desde E1, el QR de E2 lleva a E2.
4. Desde E4, el QR de E5 lleva a E5.
5. Desde E4, volver a escanear el QR de E3 devuelve a E3 sin problema.
6. Desde E3, escanear el QR de E5 conduce a E5 sin problema porque ya habia sido desbloqueado.

Observacion:

- La portada no se muestra como pantalla separada; el QR de entrada abre directamente la introduccion. Esto se acepto como comportamiento correcto para el flujo de acceso inicial.

## 7. Prueba positiva - flujo QR completo

| Paso | QR/accion | Resultado | Pantalla observada | Incidencia |
| --- | --- | --- | --- | --- |
| Entrada | `/entry/okua-entry` | pasa | Introduccion | Abre directo a la introduccion |
| Intro | boton iniciar recorrido | pasa | E1 | Flujo correcto |
| E1 | llegada tras intro | pasa | E1 | Sin bloqueo |
| E2 | `/qr/okua-e2` | pasa | E2 | Avance correcto |
| E3 | `/qr/okua-e3` | pasa | E3 | Avance correcto |
| E4 | `/qr/okua-e4` | pasa | E4 | Avance correcto |
| E5 | `/qr/okua-e5` | pasa | E5 | Avance correcto |
| Final | flujo final | pasa | Final | Cierre correcto |

Confirmaciones:

  - no vuelve indebidamente a introduccion: si
  - no usa localhost: si
  - no usa Tailscale: si
  - no aparece bypass de laboratorio: si
  - no hay audio: si
  - no hay escritura obligatoria: si

## 8. Prueba negativa - QR de estacion actual

Permitido / observado:

- En E2, escanear QR E2 no produjo error critico y mantuvo el estado esperado.

Respaldo:

- Este caso coincide con la logica vigente de `scanStation()` y con `smoke:journey`.

## 9. Prueba negativa - QR anterior desbloqueado

Permitido / observado:

- En E3, escanear QR E2 permitio volver a E2 y luego regresar a E3.

Respaldo:

- El comportamiento no lineal fue considerado correcto por el responsable humano.

## 10. Prueba negativa - QR futuro no desbloqueado

Bloqueado esperado:

- La logica vigente mantiene el bloqueo de saltos futuros.

Respaldo:

- Este caso ya estaba cubierto por `smoke:journey` y por la validacion exacta del QR esperado.

## 11. Prueba negativa - mismo QR repetido

Permitido / respaldado:

- Repetir el QR actual no mostro avance indebido.

Respaldo:

- Este caso esta cubierto por `smoke:journey`.

## 12. Prueba negativa - QR entrada despues de avanzar

Comportamiento observado:

- El QR de entrada abre la introduccion.
- No se reporto un problema funcional con ese acceso.

Nota:

- En campo, este punto se tratara como comportamiento de acceso inicial.

## 13. Observacion sobre pestañas nuevas

Observado:

- La sesion se conservo durante el cambio entre camara externa y navegador.
- La apertura exacta de pestaña nueva / misma pestaña no se considero bloqueante en esta validacion.

## 14. Decision F9-07R

- `FLUJO QR COMPLETO VALIDADO EN LABORATORIO`

## 15. Condicion para F9-08

- F9-08 puede iniciar: si

Motivo:

- El responsable humano confirmo con prueba fisica en iPhone SE + Chrome que el flujo QR secuencial funciona en laboratorio.
- La revisita a estaciones desbloqueadas tambien se comporto correctamente.
- Las validaciones automaticas siguen pasando y el codigo probado incluye `86efd5b`.

## 16. Evidencia y residuos

- Base URL usada: `http://192.168.1.75:3001`
- Commit probado: `86efd5b`
- QR generados: si
- QR temporales revertidos: si
- Modalidad de camara / dispositivo / navegador: camara externa del iPhone SE + Chrome
- Resultado de pruebas positivas y negativas: flujo positivo validado; revisita permitida observada; bloqueo futuro respaldado por smoke y por la logica vigente
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
- F9-08 puede iniciar como validacion de campo con MikroTik e IP 192.168.88.251.
