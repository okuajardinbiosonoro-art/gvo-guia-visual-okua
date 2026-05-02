# Concept art — Estación II

## Propósito

Esta carpeta contiene concept art candidato y aprobado para producir la escena 3D de Estación II.

La función de estos archivos es alimentar Blender, no integrarse directamente en runtime.

## Reglas

- No son assets runtime.
- No se importan desde `apps/web/src/lib/content.ts`.
- No se importan desde `content/stations/*.ts`.
- No reemplazan el SVG actual.
- No autorizan implementación React todavía.
- No autorizan creación de GLB todavía.
- Todo concept art debe respetar:
  - señal viva real ≠ música directa;
  - mediación tecnológica visible;
  - sin audio;
  - sin AR;
  - sin scanner QR interno;
  - sin multiavatar;
  - Lía Andina como guía única.

## Estructura

  candidates/  ← imágenes candidatas, no aprobadas
  approved/    ← imagen o set aprobado por responsable

## Criterio para mover a approved/

Solo se mueve a `approved/` cuando el responsable confirma explícitamente:

- comunica mediación;
- no sugiere planta → música directa;
- es legible en móvil;
- sirve como referencia para Blender;
- respeta la identidad visual de Lía si aparece;
- tiene formato y peso razonables para versionarse como referencia.
