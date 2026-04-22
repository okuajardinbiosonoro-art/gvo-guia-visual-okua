# QR del piloto

Esta carpeta contiene la fuente operativa de los QR del piloto GVO.

## Qué vive aquí

- `qr-base-url.example.txt`: ejemplo del valor base que debe usar el operador para generar QR.
- `generated/`: salida regenerable del script de QR.

## Qué se genera automáticamente

- SVG del QR de entrada.
- SVG de los QR de estación 1 a 5.
- `qr-manifest.md` con URLs finales y archivos generados.
- `qr-manifest.json` con el mismo inventario en formato máquina.

## Cómo regenerar

Desde la raíz del repo:

```bash
npm run qr:generate -- --base-url http://localhost:3001
```

Para el piloto de campo, reemplaza la base URL por la IP o hostname final antes de imprimir.

## Qué no editar a mano

- Los SVG dentro de `generated/`.
- Los manifiestos dentro de `generated/`.

Si cambia la base URL o el token, vuelve a generar los artefactos.
