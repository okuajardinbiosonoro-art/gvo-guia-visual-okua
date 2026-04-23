# QR del piloto

Esta carpeta contiene la fuente operativa de los QR del piloto GVO.

## Qué vive aquí

- `qr-base-url.example.txt`: ejemplo del valor base que debe usar el operador para generar QR.
- `generated/`: baseline/sample versionada del resultado del generador QR.

## Qué se genera automáticamente

- SVG del QR de entrada.
- SVG de los QR de estación 1 a 5.
- `qr-manifest.md` con URLs finales y archivos generados.
- `qr-manifest.json` con el mismo inventario en formato máquina.

## Política de versionado

Los artefactos que viven en `generated/` se conservan como baseline de referencia del estado actual del repo. Sirven para comparar la salida del generador y para revisar el contrato de URLs del piloto.

No deben confundirse con el paquete final de impresión para campo:

- antes de imprimir, siempre regenera con la base URL final del espacio;
- no asumas que el manifiesto sample es el manifiesto final;
- si la URL cambia, el output de `generated/` debe volver a producirse y revisarse;
- los SVG y manifiestos versionados aquí son referencia baseline, no sustituto de la validación de campo.

## Cómo regenerar

Desde la raíz del repo:

```bash
npm run qr:generate -- --base-url http://localhost:3001
```

Para el piloto de campo, reemplaza la base URL por la IP o hostname final antes de imprimir.

## Relación con el release candidate

El corte de campo se prepara con el perfil declarativo en `deploy/field-profile.example.json` y el script `npm run prepare:field-release -- --profile deploy/field-profile.example.json`.

Ese paso:

- valida la versión visible y la metadata;
- regenera los QR finales;
- escribe un manifiesto reproducible en `deploy/field-release-candidate/`.

Si cambia la base URL o cualquier dato del perfil, vuelve a preparar el release antes de imprimir.

## Qué no editar a mano

- Los SVG dentro de `generated/`.
- Los manifiestos dentro de `generated/`.

Si cambia la base URL o el token, vuelve a generar los artefactos.
