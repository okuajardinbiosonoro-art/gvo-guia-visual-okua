# Release candidate de campo

- Release label: `gvo-field-rc-0.9.0-rc.1`
- Version visible: `0.9.0-rc.1`
- Commit: `39ed8d6570e85266f2a2d5a309c885899b3c790b`
- Generado: `2026-04-23T22:44:31.539Z`
- Base URL: `http://localhost:3001`
- App mode: `field`
- CORS mode: `same-origin`
- Allowed origin: ``

## Artefactos

- Perfil usado: `deploy/field-profile.example.json`
- QR manifest JSON: `content/qr/generated/qr-manifest.json`
- QR manifest MD: `content/qr/generated/qr-manifest.md`
- Release JSON: `deploy/field-release-candidate/field-release-candidate.json`
- Release MD: `deploy/field-release-candidate/field-release-candidate.md`

## QR regenerados

- Entrada: `http://localhost:3001/entry/okua-entry` → `entry-okua-entry.svg`
- Estación 1: `http://localhost:3001/qr/okua-e1` → `station-1-okua-e1.svg`
- Estación 2: `http://localhost:3001/qr/okua-e2` → `station-2-okua-e2.svg`
- Estación 3: `http://localhost:3001/qr/okua-e3` → `station-3-okua-e3.svg`
- Estación 4: `http://localhost:3001/qr/okua-e4` → `station-4-okua-e4.svg`
- Estación 5: `http://localhost:3001/qr/okua-e5` → `station-5-okua-e5.svg`

## Revisión previa a impresión

- Confirma que la base URL ya es la definitiva del espacio.
- Revisa que el modo field y el CORS del perfil sean los esperados.
- Si la red final cambia, vuelve a ejecutar la preparación antes de imprimir.

## Notas del perfil

- Reemplazar baseUrl por la IP o hostname final antes de imprimir QR.
- Si corsMode cambia a allowlist, completar allowedOrigin con el origen final.
- Volver a ejecutar la preparación del release cada vez que cambie la base URL.
