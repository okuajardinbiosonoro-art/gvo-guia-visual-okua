# Release candidate de campo

## Propósito

Preparar un corte reproducible del piloto de campo a partir de un perfil declarativo, sincronizando versión visible, metadata y QR finales.

## Prerrequisitos

- Node.js 18 o superior.
- npm disponible en `PATH`.
- Dependencias instaladas (`npm install`).
- El backend y el frontend deben compilar correctamente antes de preparar el corte.
- La base URL final del piloto debe estar definida en el perfil field.

## Perfil field

El archivo de entrada es `deploy/field-profile.example.json`.

Campos esperados:

- `releaseLabel`
- `baseUrl`
- `appMode`
- `corsMode`
- `allowedOrigin`
- `notes`

## Comando exacto

```bash
npm run prepare:field-release -- --profile deploy/field-profile.example.json
```

El script:

1. valida el perfil field;
2. verifica que las versiones de `package.json`, `packages/shared/src/meta.ts` y los paquetes workspace estén sincronizadas;
3. regenera los QR finales usando la `baseUrl` del perfil;
4. escribe un manifiesto del release candidate;
5. deja evidencia legible en consola.

## Artefactos generados

- `content/qr/generated/qr-manifest.json`
- `content/qr/generated/qr-manifest.md`
- `content/qr/generated/*.svg`
- `deploy/field-release-candidate/field-release-candidate.json`
- `deploy/field-release-candidate/field-release-candidate.md`

## Qué revisar antes de imprimir QR

- Que la `baseUrl` sea la final del espacio.
- Que `appMode` sea `field`.
- Que `corsMode` sea el esperado para la red del espacio.
- Que los QR de entrada y estación apunten a la URL correcta.
- Que el manifiesto final refleje exactamente los archivos generados.

## Qué revisar antes de mover el paquete a la máquina de campo

- Que la versión visible y la metadata expuesta coinciden.
- Que el backend local responde `/health` y `/api/meta`.
- Que el release candidate se preparó con el perfil correcto.
- Que los QR finales fueron regenerados después de cualquier cambio de base URL.
- Que el reporte de preflight está listo para rellenar.

## Limitaciones conocidas

- Este flujo no imprime QR ni instala nada en campo.
- No reemplaza la validación real en sitio.
- No resuelve la IP/hostname final ni el acceso físico a la red del espacio.
- Sigue dependiendo de que el operador ajuste el perfil antes de imprimir.
