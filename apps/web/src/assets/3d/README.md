# Assets 3D runtime — GVO

Esta carpeta contiene los assets 3D finales listos para runtime (Vite).
No es staging. El staging vive fuera de `apps/`.

## Estructura esperada

```text
lia/                         ← modelo GLB de Lía Andina
stations/station-N/          ← elementos 3D de cada estación
```

## Formatos

- Formato final: `.glb` (binario comprimido)

## Límites de peso

- Lía modelo completo: `< 2 MB` (objetivo `< 1 MB` con compresión Draco)
- Elemento 3D por estación: `< 3 MB` (objetivo `< 1.5 MB`)
- Texturas: WebP o PNG, max `1024×1024`

## Reglas de integración

- Importar GLB solo desde `apps/web/src/` (`lib/content.ts` u otros módulos web).
- NUNCA importar GLB desde `content/stations/*.ts`.
- NUNCA agregar `src:` en `content/stations/*.ts`.
- No usar CDN. No depender de internet en campo.
- No usar AR. No usar scanner QR interno. No usar audio.
- Todo modelo 3D debe tener fallback PNG.
- Progressive enhancement obligatorio.
- Validar en iPhone SE 2da generación + Chrome antes de cerrar cualquier ticket 3D.

## Regla narrativa

Si se representa la cadena técnica del sistema, mostrar los 8 nodos completos:

planta → bionosificador → ESP32 → MIDI → Wi-Fi/UDP → router → sistema central → sonido

No reducir a 7. No sugerir causalidad directa planta → música.
