# Flujo Git — solo developer

## Regla general

Este proyecto usa flujo Git liviano adaptado a una sola persona.

## Rama principal

- `main` es la rama estable.

## Ramas auxiliares

Solo crear ramas cuando:
- el cambio sea riesgoso;
- el trabajo vaya a durar varias sesiones;
- quieras aislar una exploración técnica;
- el cambio afecte simultáneamente varias áreas sensibles.

Ejemplos:
- `feat/mvp-shell`
- `feat/qr-gating`
- `chore/project-scaffold`
- `docs/script-v2`

## PR

No hay PR obligatoria.

Si en algún momento se quiere revisar un cambio de forma estructurada, se puede usar una rama y un checklist local, pero no se asume flujo con terceros.

## Commits

Reglas:
- pequeños;
- descriptivos;
- agrupados por intención.

Ejemplos:
- `docs: add initial product and architecture baseline`
- `chore: initialize claude skills and repo governance`
- `feat: add initial visitor session bootstrap`

## Tags

Usar tags para hitos:
- `v0.1-doc-foundation`
- `v0.2-mvp-shell`
- `v0.3-qr-flow`
- `v0.4-pilot-ready`

## Antes de commitear

- validar que el cambio cierra algo concreto;
- revisar que no hay secretos;
- verificar consistencia de docs;
- dejar nota clara de validaciones ejecutadas.
