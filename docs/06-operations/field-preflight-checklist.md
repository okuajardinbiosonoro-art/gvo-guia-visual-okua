# Checklist de preflight de campo

## Datos de la prueba

- Fecha:
- Responsable:
- Base URL final usada:
- Equipo / espacio:

## Checklist

- [ ] Confirmar IP fija o hostname final definido.
- [ ] Generar QR con la base URL final desde `npm run qr:generate -- --base-url <BASE_URL>`.
- [ ] Verificar el manifiesto generado en `content/qr/generated/qr-manifest.md`.
- [ ] Revisar la política sample vs final en `content/qr/README.md`.
- [ ] Si se requiere evidencia de laboratorio, correr `node scripts/pilot-soak-test.mjs --base-url <BASE_URL> --minutes 1`.
- [ ] Si se requiere evidencia de laboratorio, correr `node scripts/pilot-concurrency-probe.mjs --base-url <BASE_URL> --sessions 3`.
- [ ] Completar el reporte con la plantilla `docs/templates/PILOT_VALIDATION_REPORT_TEMPLATE.md`.
- [ ] Probar el QR de entrada con móvil real.
- [ ] Probar al menos un QR de estación con móvil real.
- [ ] Confirmar `GET /health` responde `200`.
- [ ] Confirmar `GET /api/meta` responde `200` y mantiene `journey-core-live`.
- [ ] Confirmar `APP_MODE=field`.
- [ ] Confirmar arranque con `npm start`.
- [ ] Confirmar creación y escritura de `logs/gvo-local.log`.
- [ ] Confirmar que una ruta SPA profunda abre sin `404`.
- [ ] Registrar observaciones y bloqueos antes de imprimir.

## Observaciones

- Si algo falla, no imprimir los QR hasta volver a generar con la base URL correcta.
- Si el móvil no resuelve la URL, revisar red, hostname e IP antes del piloto.
