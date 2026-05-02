# Producción 3D — GVO

Esta carpeta es staging editorial y técnico para producción 3D.

No es runtime web.

## Diferencia entre staging y runtime

- `assets/3d-production/`: producción, referencias, concept art, scripts Blender, fuentes `.blend`, previews y GLB candidatos.
- `apps/web/src/assets/3d/`: runtime web para GLB aprobados e integrados por Vite.

Nada dentro de `assets/3d-production/` debe importarse desde React.

## Pipeline oficial

ChatGPT Images → Blender → GLB/GLTF → Three.js bundleado con Vite.

El formato final preferente para producción web es `.glb`.

## Reglas

- No usar CDN.
- No depender de internet en campo.
- No usar audio.
- No usar AR.
- No usar scanner QR interno.
- No usar multiavatar.
- No poner `src:` en `content/stations/*.ts`.
- No importar binarios desde `content/stations/*.ts`.
- No copiar GLB a runtime hasta que esté aprobado.
- Si se reemplaza `.gitkeep` por un asset real, usar `git rm`.

## Línea narrativa

Las plantas no hacen música por sí solas.

Si se representa la cadena técnica completa, deben aparecer siempre los 8 nodos:

planta → bionosificador → ESP32 → MIDI → Wi-Fi/UDP → router → sistema central → sonido
