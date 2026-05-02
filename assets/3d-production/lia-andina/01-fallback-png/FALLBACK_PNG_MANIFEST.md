# Manifest — PNG fallback de Lía

## 1. Propósito

Registrar copias de referencia de los cuatro PNG runtime actuales de Lía para producción 3D.

## 2. Fuente runtime

Los archivos fueron copiados desde:

- `apps/web/src/assets/lia/lia-idle.png`
- `apps/web/src/assets/lia/lia-calm.png`
- `apps/web/src/assets/lia/lia-curious.png`
- `apps/web/src/assets/lia/lia-three-quarter.png`

## 3. Archivos de referencia

| Estado | Archivo staging | Uso |
|--------|-----------------|-----|
| idle | `lia-idle.png` | referencia de forma base |
| calm | `lia-calm.png` | referencia de estado calm |
| curious | `lia-curious.png` | referencia de estado curious |
| three-quarter | `lia-three-quarter.png` | referencia de volumen/orientación |

## 4. Reglas

- No son concept art candidato de Estación II.
- No mover a carpetas de estación.
- No importar desde React.
- No editar como fuente runtime.
- No reemplazar los archivos de `apps/web/src/assets/lia/`.

## 5. Verificación de copia

Registrar en el reporte de cierre si los hashes o tamaños coinciden con los archivos fuente.
