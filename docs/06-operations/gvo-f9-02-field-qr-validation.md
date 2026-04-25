# GVO F9-02 — Validación field, host/IP y QR

## 1. Propósito

Este documento registra la verificación de configuración `field`, host/IP/base URL y generación de QR para preparar F9-03.

Aclaraciones:

- No declara piloto ejecutado.
- No declara v1 estable.
- No reemplaza la QA móvil multibrowser.
- No reemplaza el recorrido completo en red local.
- Si no hay prueba móvil real, los QR no quedan validados como finales.

## 2. Datos de la verificación

- Fecha: 2026-04-24
- Responsable: José David
- Rama: `main`
- Commit probado: `c0e9f8cf6c12289d311f4551735391e776c4ced1`
- Versión visible: `0.9.0-rc.1`
- Entorno: laboratorio equivalente
- Base URL usada: `http://192.168.1.74:3001`
- Host/IP: `192.168.1.74`
- Puerto: `3001`
- Red Wi-Fi: `Ethernet` local de la PC de trabajo
- Equipo servidor: PC Windows local del repositorio
- Sistema operativo: Windows
- Perfil usado: `other`
- Tipo de base URL: temporal de laboratorio
- ¿Hay móvil real disponible?: no
- ¿Los QR generados se consideran finales?: no
- ¿Los artefactos QR deben versionarse?: no

## 3. Confirmación de estado inicial

Antes de la regeneración, el baseline del repo apuntaba a `http://localhost:3001`:

- `content/qr/generated/qr-manifest.md`
- `content/qr/generated/qr-manifest.json`
- `deploy/field-profile.example.json`

Tokens confirmados desde `packages/shared/src/qr.ts`:

- `okua-entry`
- `okua-e1`
- `okua-e2`
- `okua-e3`
- `okua-e4`
- `okua-e5`

Scripts confirmados desde `package.json`:

- `qr:generate`
- `prepare:field-release`
- `verify:local`
- `pilot:soak`
- `pilot:concurrency`
- `start`
- `start:windows`

## 4. Definición de base URL de trabajo

Base URL de trabajo usada en este ticket:

`http://192.168.1.74:3001`

Justificación:

- Es la IP LAN real de la PC de trabajo.
- No usa `localhost`.
- Permite verificar la SPA servida por Fastify en una URL accesible dentro de la red local.

Resumen:

- Base URL usada: `http://192.168.1.74:3001`
- Host/IP: `192.168.1.74`
- Puerto: `3001`
- Tipo de entorno: laboratorio equivalente
- Justificación de la base URL: acceso real por IP en la LAN para validar el contrato operativo sin depender de `localhost`
- ¿Resuelve desde móvil real?: no probado

## 5. Perfil field usado

Perfil revisado:

- `deploy/field-profile.example.json`

Valores confirmados:

- `baseUrl`
- `appMode`
- `corsMode`
- `allowedOrigin`
- `notes`

Perfil temporal usado para la validación:

- `C:\Users\JOSE DAVID\AppData\Local\Temp\gvo-field-profile.local.json`

Ese perfil temporal no fue versionado.

Resumen:

- Perfil usado: `other`
- Si fue temporal: sí
- Si fue commiteado: no

## 6. Generación de QR

Comando ejecutado:

```bash
npm run qr:generate -- --base-url http://192.168.1.74:3001
```

Resultado:

- El comando pasó: sí
- El manifiesto contiene la base URL usada: sí
- El manifiesto contiene `/entry/okua-entry`: sí
- El manifiesto contiene `/qr/okua-e1` a `/qr/okua-e5`: sí
- El manifiesto contiene `localhost`: no
- Los QR generados son: laboratorio
- Los cambios en `content/qr/generated/` fueron: revertidos

Observación:

Los archivos generados en `content/qr/generated/` se regeneraron con la IP temporal de trabajo y luego se restauraron al baseline del repo porque la URL no fue aprobada como final de campo.

## 7. Preparación de release candidate

Comando ejecutado:

```bash
npm run prepare:field-release -- --profile C:\Users\JOSE DAVID\AppData\Local\Temp\gvo-field-profile.local.json
```

Resultado:

- El comando pasó: sí
- La base URL del release candidate coincide con la base URL usada: sí
- `appMode` es `field`: sí
- CORS esperado: `same-origin`
- Los artefactos fueron: revertidos

Observación:

`deploy/field-release-candidate/` se generó con la misma IP temporal de trabajo y luego se restauró al baseline del repo porque la base URL no fue aprobada como final de campo.

## 8. Verificación desde móvil real

Estado:

- Móvil disponible: no

Resultados:

- Dispositivo: no aplica
- Sistema operativo: no aplica
- Navegador: no aplica
- Red: no aplica
- QR entrada probado: no
- QR estación probado: no
- Resultado: no hubo prueba móvil real disponible en esta verificación
- Evidencia: no aplica
- Incidencias: no hubo dispositivo móvil para escaneo

## 9. Verificación técnica local

Comandos ejecutados:

- `npm run typecheck`: pasa
- `npm run build`: pasa
- `npm run smoke:journey`: pasa
- `npm run verify:local`: pasa

Nota operativa:

- La primera ejecución de `verify:local` contra el backend aislado (`dev:server`) devolvió `404` en `/` porque ese modo no sirve la SPA.
- La verificación correcta pasó al levantar el flujo completo con `npm start`, que compila y sirve el frontend desde Fastify.

## 10. Decisión sobre artefactos generados

Estado de los artefactos:

- `content/qr/generated/` fue modificado: sí
- `deploy/field-release-candidate/` fue modificado: sí
- Esos cambios fueron revertidos: sí
- Se commitearon: no

Motivo:

- La base URL usada fue temporal de laboratorio.
- No hubo aprobación explícita para versionar QR finales de campo.
- No hubo prueba móvil real.

Regla aplicada:

- No se commitearon QR generados con IP temporal o de laboratorio.
- No se commiteó un perfil local temporal.
- No se commiteó `.env.local`.

## 11. Resultado de F9-02

**VALIDACIÓN PARCIAL**

Razón:

- La base URL real de trabajo se definió y se validó técnicamente.
- `qr:generate` y `prepare:field-release` funcionaron con la IP de trabajo.
- Los manifiestos y el release candidate reflejaron la URL usada.
- Pero no hubo móvil real disponible para validar los QR como finales de campo.

Conclusión:

- Los QR generados quedan como evidencia de laboratorio, no como QR finales validados.

## 12. Pendientes para F9-03

- Validación móvil multibrowser.
- Android + Chrome.
- Android + navegador alterno, si disponible.
- iPhone + Safari, si disponible.
- Confirmación de que QR entrada y estación abren desde móvil real.
- Confirmación de modo field en experiencia visual.
- Bloqueos detectados.

