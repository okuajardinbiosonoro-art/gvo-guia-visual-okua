# GVO F9-07 — Reporte de flujo QR completo de laboratorio

## 1. Propósito

Este documento valida o bloquea el flujo QR completo de laboratorio con cámara móvil, después de que F9-06 declaró GO de laboratorio pero dejó QR como pendiente antes de campo.

Aclaraciones:

- No declara piloto ejecutado en campo.
- No declara QR finales de campo.
- No declara v1 estable.
- No implementa scanner QR interno.
- No reemplaza la validación de campo con MikroTik.
- Puede habilitar F9-08 solo si el QR completo de laboratorio pasa.

## 2. Estado heredado

- F9-06:
  - `GO LABORATORIO`
  - `NO-GO CAMPO PARA PILOTO PÚBLICO`
  - `GO CONDICIONADO SOLO PARA PREPARAR VALIDACIÓN DE CAMPO`
  - `NO V1 ESTABLE`

- Deuda QR heredada:
  flujo QR temporal no validado como recorrido completo con cámara móvil.

- Base URL laboratorio:
  `http://192.168.1.74:3001`

- Dispositivo:
  iPhone SE de segunda generación + Chrome.

## 3. Datos de ejecución

| Campo | Valor |
| --- | --- |
| Fecha | 2026-04-25 |
| Responsable | Codex / José David |
| Rama | `main` |
| Commit probado | `1a2bc7c` (`docs(ops): record lab go-no-go decision`) |
| Versión visible | `0.9.0-rc.1` |
| Entorno | laboratorio |
| Base URL | `http://192.168.1.74:3001` |
| Dispositivo | iPhone SE de segunda generación |
| Navegador | Chrome |
| Red | Wi-Fi de laboratorio, sin exponer contraseña |
| Modo | field-like |
| `VITE_APP_MODE=field` confirmado | sí |
| Servidor | `npm start` / `npm run start:windows` |
| Puerto | `3001` |
| Modalidad | cámara móvil sobre QR temporal de laboratorio |
| `localhost` como URL de visitante | no |
| `Tailscale` como URL de visitante | no |
| Scanner QR interno | no |

## 4. Preparación automática

Resultados:

- `git status --short`: había residuos locales preexistentes fuera de este ticket.
- `npm run typecheck`: pasa.
- `npm run build`: pasa.
- `npm run smoke:journey`: pasa.
- `npm run verify:local`: pasa.

Antes de construir field-like, se confirmó `VITE_APP_MODE=field` con entorno temporal no versionado.

## 5. Generación temporal de QR de laboratorio

Comando ejecutado:

```bash
npm run qr:generate -- --base-url http://192.168.1.74:3001
```

Revisión del manifiesto:

- `content/qr/generated/qr-manifest.md`
- `content/qr/generated/qr-manifest.json`

Confirmación:

- contiene `/entry/okua-entry`
- contiene `/qr/okua-e1`
- contiene `/qr/okua-e2`
- contiene `/qr/okua-e3`
- contiene `/qr/okua-e4`
- contiene `/qr/okua-e5`
- usa `http://192.168.1.74:3001`
- no usa `localhost`

Estado de los QR temporales:

- generados: sí
- revertidos antes del commit: sí
- versionados: no

## 6. Ciclo guiado con el responsable humano

El responsable humano reportó la siguiente experiencia con la cámara externa del celular:

1. El QR de entrada abre directamente la introducción.
2. Al presionar `Comenzar recorrido`, la app lleva a Estación 1.
3. Al escanear el QR de la siguiente estación desde la cámara externa, la app vuelve a pedir completar la introducción.
4. Para avanzar, fue necesario volver a la introducción y repetir el recorrido hasta la estación previa.
5. El mismo patrón se repitió entre E1→E2, E2→E3, E3→E4 y E4→E5/final.
6. La revisión posterior al completar el recorrido quedó libre.
7. No apareció audio.
8. No apareció escritura obligatoria.
9. No apareció scanner QR interno.
10. No apareció bypass de laboratorio.

## 7. Prueba QR entrada

Resultado observado:

- Abre `/entry/okua-entry`: sí.
- Muestra `Proyecto OKÚA` / `Comenzar recorrido?`: sí.
- Usa `localhost`: no.
- Usa `Tailscale`: no.
- Inicia la experiencia: sí.

Evaluación:

- Aceptable como comportamiento de entrada.
- El QR de entrada inicia la experiencia en la introducción.

## 8. Prueba QR estaciones en orden

| Paso | QR/ruta | Resultado | Pantalla observada | Incidencia |
|---|---|---|---|---|
| Entrada | `/entry/okua-entry` | pasa | Introducción | Ninguna |
| Estación I | `/qr/okua-e1` | pasa | Estación 1 | Ninguna |
| Estación II | `/qr/okua-e2` | falla operativa | Retorno a introducción | Requiere repetir pasos previos |
| Estación III | `/qr/okua-e3` | falla operativa | Retorno a introducción | Requiere repetir pasos previos |
| Estación IV | `/qr/okua-e4` | falla operativa | Retorno a introducción | Requiere repetir pasos previos |
| Estación V | `/qr/okua-e5` | falla operativa | Retorno a introducción | Requiere repetir pasos previos |
| Final | `/final` o flujo equivalente | pasa solo tras rehacer recorrido | Final alcanzado tras reinicios controlados | Flujo poco práctico para campo |

Conclusión de la prueba:

- El contenido sí existe y sí puede alcanzarse.
- El avance por QR externo no conserva o no interpreta bien el estado ya alcanzado.
- El usuario debe repetir la introducción y la estación anterior para poder avanzar.

## 9. Prueba de salto directo fuera de secuencia

Resultado:

- bloqueo pedagógico observado: sí
- error 500: no
- pantalla rota: no
- unlock indebido: no

Observación:

- el bloqueo existe y es correcto en términos pedagógicos.
- el problema principal no es el bloqueo de salto inválido, sino la pérdida de progreso entre escaneos válidos sucesivos.

## 10. Prueba de revisita posterior

Resultado observado:

- revisita posterior libre real: sí, una vez completado el recorrido
- reinicio controlado: también puede ocurrir cuando el progreso no se conserva entre escaneos

## 11. Diagnóstico

Diagnóstico principal:

- la sesión del recorrido no se conserva adecuadamente entre el contexto de la app y el contexto de la cámara/otro lanzamiento del QR.

Causa probable:

- el `sessionId` estaba persistido con un alcance demasiado estrecho para el flujo QR externo.

Observación técnica del cierre:

- se ajustó la persistencia del `sessionId` para compartir estado entre pestañas/contextos del navegador mediante almacenamiento compartido con fallback.
- se ajustó la validación QR para que el backend compare el QR escaneado contra la estación esperada, y no trate cualquier QR válido como avance genérico.
- este ticket queda bloqueado hasta retest físico para confirmar que la corrección resuelve el flujo QR externo en la cámara móvil.

## 12. Decisión de F9-07

- `FLUJO QR COMPLETO VALIDADO EN LABORATORIO`: no
- `QR BLOQUEADO — REQUIERE CORRECTIVO`: sí

## 13. Condición para F9-08

- F9-08 puede iniciar: no

Motivo:

El flujo QR completo con cámara móvil no quedó validado como recorrido continuo entre estaciones. Antes de F9-08 hace falta retest físico con el ajuste de persistencia o un ticket correctivo QR específico si el problema persiste.

## 14. Evidencia y residuos

- base URL usada: `http://192.168.1.74:3001`
- QR generados: sí
- manifiestos revisados: sí
- modalidad: cámara móvil
- dispositivo y navegador: iPhone SE de segunda generación + Chrome
- rutas probadas: entrada, E1 a E5 y final
- resultado: bloqueo funcional entre estaciones
- QR temporales revertidos: sí
- `.env.local`: ausente / no versionado
- perfiles `.local.json`: ausentes / no versionados
- residuos locales:
  - `.agents/`
  - `.claude/settings.json`
  - `GVO_ESTADO_TECNICO_*.txt`
