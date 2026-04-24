# GVO — Aprobación de copy y microcopy de piloto F8

## 1. Propósito

Este documento registra la aprobación de copy narrativo y microcopy operativo para el piloto de F8. Toma como base la auditoría editorial de `docs/02-script/front-c-auditoria-y-contrato-v1.md` y no la reemplaza: la referencia de base sigue siendo esa auditoría, mientras que este archivo deja constancia de la decisión de uso para piloto de campo v1.

## 2. Documentos de base

- `docs/02-script/front-c-auditoria-y-contrato-v1.md` — auditoría editorial base.
- `docs/assets/gvo-f8-pilot-asset-scope.md` — contrato de assets F8.
- `docs/05-adr/ADR-001-single-avatar-lia.md`.
- `docs/05-adr/ADR-002-v1-visual-scope-3d-ar-scanner.md`.

## 3. Alcance revisado

Se revisaron Intro, Estaciones I a V, los CTAs, los hints, los `qrHint`, los mensajes de bloqueo, el cierre y la lógica de revisita. El alcance revisado queda apto para piloto de campo v1 sin reescritura amplia.

La auditoría de base sigue marcando frentes de mejora para una reescritura posterior, pero no impiden el uso actual para piloto ni obligan a tocar los bloques narrativos de esta fase.

## 4. Decisión del responsable

**Decisión:** Aprobado para piloto sin cambios.

**Responsable principal:** José David

**Uso:** piloto de campo v1

La decisión valida el copy actual como semilla operativa suficiente para el piloto, con Lía Andina como guía única y sin reabrir los marcos de ADR-001 ni ADR-002.

## 5. Copy narrativo por estación

| Pantalla | Estado | Observación |
|---|---|---|
| Intro | aprobado | Abre la experiencia, ordena el recorrido y evita prometer funciones fuera de v1. |
| Estación I | aprobado | Sitúa el origen y el propósito con tono sobrio y orientador. |
| Estación II | aprobado | Explica la mediación de la señal sin sugerir causalidad directa planta → música. |
| Estación III | aprobado | Presenta la evolución técnica como aprendizaje real, no como solución mágica. |
| Estación IV | aprobado | Mantiene la cadena técnica visible y la lectura de la operación actual. |
| Estación V | aprobado | Cierra el recorrido con síntesis de estado real y sentido del montaje. |
| Cierre | aprobado | Permite revisar el recorrido sin confusión y sin romper la secuencia de primera pasada. |

## 6. Microcopy de navegación y sistema

| Elemento | Estado | Observación |
|---|---|---|
| CTAs | aprobado | Son claros, accionables y coherentes con la progresión del recorrido. |
| hints | aprobado | Orientan la lectura y la transición entre estaciones sin sobrecargar. |
| qrHint | aprobado | Indican el siguiente punto del recorrido y sostienen la secuencia física. |
| bloqueo/secuencia | aprobado | Mantienen la restricción de primera pasada sin hostilidad ni ambigüedad. |
| cierre/revisita | aprobado | Habilitan la revisita libre sin romper la lógica del recorrido guiado. |

## 7. Placeholders aceptados para piloto

- Intro: placeholder CSS aceptado para piloto.
- Estación I: placeholder CSS aceptado para piloto.
- Estación III: placeholder CSS aceptado para piloto.
- Estación IV: `SignalFlowDiagram` funcional; iconografía SVG diferida.
- Estación II: asset real integrado. No usa placeholder.
- Estación V: asset real integrado. No usa placeholder.

## 8. Elementos diferidos fuera del piloto

- Hero real de Intro.
- Hero real de Estación I.
- Timeline de Estación III.
- Iconografía SVG de Estación IV.
- 3D, AR, scanner interno y audio, fuera de v1 por ADR-002.

## 9. Criterios narrativos verificados

- [x] Las plantas no se presentan como productoras autónomas de música.
- [x] La mediación tecnológica se mantiene visible en texto.
- [x] Lía Andina sigue como guía única.
- [x] No se reabre multiavatar, audio, AR, scanner QR interno ni Lía 3D.

## 10. Resultado de validaciones

- `npm run typecheck`: pasa.
- `npm run build`: pasa.
- `npm run smoke:journey`: pasa.
- Coherencia con la auditoría base: confirmada.
- Alcance para piloto de campo v1: confirmado sin cambios.

## 11. Estado de cierre de F8-04

Estado: cerrado.

La aprobación de copy/microcopy queda registrada para piloto sin cambios. La reescritura amplia de guion sigue siendo un trabajo posterior, pero no bloquea el piloto.
