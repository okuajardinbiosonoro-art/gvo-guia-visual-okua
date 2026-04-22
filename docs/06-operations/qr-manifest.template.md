# Plantilla de manifiesto QR

Esta plantilla describe el formato del manifiesto generado por `scripts/generate-qr-assets.mjs`.

## Campos esperados

- `baseUrl`
- `generatedAt`
- `items[]`

Cada item incluye:

- `kind`
- `logicalName`
- `stationId`
- `token`
- `url`
- `fileName`

## Ubicación del manifiesto generado

- Markdown: `content/qr/generated/qr-manifest.md`
- JSON: `content/qr/generated/qr-manifest.json`

## Uso

Regenera el manifiesto cada vez que cambie la base URL de impresión o cuando se quiera refrescar la salida operativa.
