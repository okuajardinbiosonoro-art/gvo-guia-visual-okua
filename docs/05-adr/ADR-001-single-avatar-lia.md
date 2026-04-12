# ADR-001: Avatar único — Lía Andina como guía exclusiva

## Estado
Aceptada

## Contexto
El proyecto definía tres avatares-guía (masculino, femenino, flor) con pantalla de selección. Mantener tres avatares triplica el pipeline de producción 3D, animación e integración sin aportar valor diferencial al recorrido. Se decidió consolidar en un solo avatar: Lía Andina (La Musa Biomimética), entidad de robótica blanda bioinspirada en orquídea.

## Decisión
- Lía Andina es el único avatar-guía de GVO.
- Se elimina la pantalla de selección de guía y su ruta `/guide`.
- Se elimina el endpoint `POST /api/journey/session/:id/guide`.
- El campo `guide` en `JourneySession` pasa de `GuideId | null` a siempre `'flower'`, asignado automáticamente al crear la sesión.
- El componente `GuideAvatar` se simplifica para mostrar solo a Lía.

## Consecuencias
- Pipeline de producción 3D reducido a un solo personaje.
- Flujo del visitante simplificado: Welcome → Intro (sin paso intermedio).
- Menor complejidad de mantenimiento en frontend, backend y tests.
- Si en el futuro se quisieran reintroducir múltiples avatares, habría que revertir parcialmente este cambio.
