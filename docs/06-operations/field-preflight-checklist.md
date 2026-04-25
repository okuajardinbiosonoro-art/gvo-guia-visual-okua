# Checklist de preflight de campo v1

## 1. Propósito

Este documento se usa antes de imprimir QR finales o ejecutar el piloto de campo.
Su objetivo es dejar una verificación reproducible y explícita del estado operativo
real del entorno.

Si cualquier criterio bloqueante falla, no se avanza a campo ni se imprimen QR finales.

## 2. Datos de la prueba

- Fecha:
- Responsable:
- Lugar:
- Entorno:
  - [ ] laboratorio
  - [ ] campo real
- Versión probada:
- Commit probado:
- Rama:
- Base URL final:
- Host/IP:
- Puerto:
- Red Wi-Fi usada:
- Máquina de operación:
- Navegadores/dispositivos probados:
- QR utilizados:
  - [ ] generados nuevos
  - [ ] impresos existentes
  - [ ] sample/baseline del repo, solo para prueba
  - [ ] QR Wi-Fi MikroTik, si aplica

## 3. Preparación del release candidate

Antes de imprimir QR finales o mover el paquete a campo:

- Verificar la versión visible en `package.json`.
- Revisar `deploy/field-profile.example.json`.
- Confirmar que `baseUrl` es la URL real del piloto.
- Confirmar que `appMode` del perfil es `field`.
- Ejecutar:

  ```bash
  npm run prepare:field-release -- --profile deploy/field-profile.example.json
  ```

- Revisar:

  - `deploy/field-release-candidate/field-release-candidate.md`
  - `deploy/field-release-candidate/field-release-candidate.json`

- Confirmar que el release candidate refleja:
  - versión correcta;
  - base URL correcta;
  - `appMode: "field"`;
  - CORS esperado;
  - QR regenerados.

## 4. Configuración field

La configuración de campo se reparte entre el perfil de release candidate y el frontend.

- `VITE_APP_MODE=field` controla el modo del frontend.
- `appMode: "field"` aparece en el perfil de release candidate.
- `GVO_SERVE_WEB=true` corresponde al backend sirviendo el frontend compilado.
- `GVO_CORS_MODE` controla la política CORS del backend.
- No se debe commitear `.env.local`.

Origen verificado de `VITE_APP_MODE=field`:

- [ ] `.env.local` local no versionado
- [ ] variable de entorno del sistema
- [ ] otro: __________

## 5. Red local y base URL

- Confirmar IP o hostname final definido.
- Confirmar que el móvil está conectado a la misma red correcta.
- Confirmar que la URL responde desde un móvil real.
- Confirmar que la operación no depende de internet.
- Confirmar que los QR de móviles no usan `localhost`.
- Si cambia la IP o la base URL, regenerar los QR antes de imprimir.

## 6. Generación y verificación de QR

- Ejecutar:

  ```bash
  npm run qr:generate -- --base-url <BASE_URL>
  ```

- Revisar:
  - `content/qr/generated/qr-manifest.md`
  - `content/qr/generated/qr-manifest.json`

- Confirmar rutas mínimas:
  - `/entry/:token`
  - `/qr/:token`

- Confirmar que el QR de entrada abre desde móvil real.
- Confirmar que al menos un QR de estación abre desde móvil real.
- Confirmar que los QR sample/baseline no se confunden con QR finales de campo.
- Si la red del espacio usa MikroTik, confirmar también que el QR Wi-Fi es un artefacto distinto del QR de recorrido. Ver `docs/06-operations/gvo-f9-03-mobile-network-qa-plan.md`.

## 7. Arranque local

- Ejecutar:

  ```bash
  npm start
  ```

  o:

  ```bash
  npm run start:windows
  ```

- Confirmar:
  - backend arriba;
  - frontend servido por Fastify;
  - `logs/gvo-local.log` creado y escribiendo;
  - no hay errores críticos en consola.

## 8. Healthcheck y metadata

- Confirmar `GET <BASE_URL>/health` responde `200`.
- Confirmar `GET <BASE_URL>/api/meta` responde `200`.
- Confirmar que `/api/meta` mantiene:
  - nombre esperado;
  - versión esperada;
  - estado `journey-core-live`;
  - `features.stations: true`, si sigue vigente.

## 9. Rutas SPA críticas

Probar las rutas profundas sin `404`:

- `/`
- `/entry/okua-entry`
- `/intro`
- `/qr/okua-e1`
- `/station/1`
- `/station/2`
- `/station/3`
- `/station/4`
- `/station/5`
- `/final`

Los tokens reales deben verificarse contra `packages/shared/src/qr.ts` o contra el manifiesto QR generado.

## 10. Recorrido completo en móvil real

Verificar manualmente:

- Entrada por QR.
- Intro.
- Estación I.
- Estación II.
- Estación III.
- Estación IV.
- Estación V.
- Cierre.
- Intento de salto fuera de secuencia.
- Revisión de estación ya habilitada.
- Ausencia de escritura obligatoria.
- Ausencia de audio.
- Legibilidad en móvil.

## 11. Dispositivos mínimos

Registrar como mínimo:

- [ ] Android + Chrome
- [ ] Android + Opera, si está disponible
- [ ] iPhone + Safari, si está disponible
- [ ] Otro dispositivo disponible

Si un dispositivo no está disponible, dejarlo registrado como limitación del preflight.

## 12. Soak y concurrencia mínima

- Ejecutar:

  ```bash
  npm run pilot:soak -- --base-url <BASE_URL> --minutes 1
  ```

- Ejecutar:

  ```bash
  npm run pilot:concurrency -- --base-url <BASE_URL> --sessions 3
  ```

- Revisar la salida en `reports/pilot-validation/`.
- Registrar el resultado en `docs/templates/PILOT_VALIDATION_REPORT_TEMPLATE.md`.

No inventar éxito si los comandos no se ejecutaron.

## 13. Evidencia requerida

Registrar como evidencia:

- Captura o nota de versión/commit.
- Base URL usada.
- Manifiesto QR usado.
- Dispositivos probados.
- Resultado de `/health`.
- Resultado de `/api/meta`.
- Resultado del QR de entrada.
- Resultado del QR de estación.
- Resultado del QR Wi-Fi MikroTik, si aplica.
- Resultado del recorrido completo.
- Resultado de soak.
- Resultado de concurrencia.
- Incidencias observadas.
- Decisión final.

Referencias de reporte:

- `docs/templates/PILOT_VALIDATION_REPORT_TEMPLATE.md` para validación técnica.
- `docs/templates/FIELD_PILOT_REPORT_TEMPLATE.md` para piloto de campo.

## 14. Criterios bloqueantes

Bloquean el avance a campo:

- Base URL no definida.
- Móvil no accede a la URL.
- QR apunta a URL incorrecta.
- `/health` falla.
- `/api/meta` falla.
- `VITE_APP_MODE=field` no verificado para el build de campo.
- El recorrido completo no se puede terminar.
- Los saltos de secuencia rompen la lógica pedagógica.
- Los logs no se generan.
- Soak o concurrencia mínima falla sin explicación aceptada.
- Se detecta dependencia de internet para operación normal.
- Se detecta audio o escritura obligatoria.

## 15. Decisión preflight

- [ ] APTO PARA PILOTO
- [ ] APTO CON OBSERVACIONES
- [ ] NO APTO

- Motivo de la decisión:
- Correctivos requeridos:
- Responsable de aprobar:
- Fecha:
