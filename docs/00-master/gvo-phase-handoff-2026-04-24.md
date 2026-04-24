# GVO — Handoff de cierre F7 y transición a F8

## 1. Propósito del documento

Este documento cierra la subfase F7 — definición e infraestructura visual/interactiva v1 — y prepara la apertura de F8, centrada en producción e integración controlada de assets 2D para v1/piloto.

F7 y F8 extienden el plan original de `docs/00-master/metodologia-integral-gvo-v1.md`, que llega hasta Fase 6. No es una contradicción: son fases nuevas que emergen del estado real del repo después de cerrar la base operativa, el hardening local y la definición visual v1.

Este handoff debe permitir abrir un nuevo chat sin arrastrar contexto disperso, con una postura clara sobre qué quedó cerrado, qué falta y qué no debe reabrirse.

## 2. Estado real confirmado de main

Estado confirmado contra `main` y `origin/main` el 2026-04-24:

- Versión visible sincronizada en `0.9.0-rc.1` en raíz, workspaces y `packages/shared/src/meta.ts`.
- Flujo QR por URL/ruta operativo: entrada por `/entry/:token` y estaciones por `/qr/:token`.
- Lía Andina sigue como guía única por ADR-001.
- `VisualHero` soporta `type: 'placeholder' | 'image' | 'diagram'` y `diagramId?: string`.
- Intro usa hero `placeholder` con tono `default`.
- Estación I tiene hero `placeholder` con tono `warm`.
- Estaciones II, III y V siguen con heroes `placeholder`.
- Estación IV usa `type: 'diagram'`, `diagramId: 'signal-flow'` y renderiza `SignalFlowDiagram`.
- `SignalFlowDiagram` tiene 8 pasos: planta, bionosificador, ESP32, MIDI, Wi-Fi/UDP, router, sistema central y sonido.
- `apps/web/src/lib/content.ts` es el punto de integración de assets binarios; `stationHeroSrc` e `introHeroSrc` están vacíos.
- No hay binarios reales integrados por estación todavía.
- `apps/web/src/assets/stations/` existe como estructura runtime con `.gitkeep`.
- `assets/stations/` existe como staging editorial.
- La validación visual humana de F7-06 fue aprobada en iPhone SE 2da Gen y Opera en PC.

Los commits F7-07 y F7-08 están confirmados en `origin/main`:

- `ffa3b30 chore(assets): scaffold station asset dirs and document integration arch`
- `0a175f3 chore(web): prepare content asset override layer in lib/content`

## 3. Etapa que puede darse por cerrada

Puede darse por cerrada la subfase:

**Subfase F7 — definición e infraestructura visual/interactiva v1**

Esto incluye matriz visual v1, ADR-002, asset pack, soporte `diagram`, Estación I con visual warm, Estación IV con slot de diagrama, `SignalFlowDiagram`, QA responsive preventivo, estructura runtime de assets y capa de override en `lib/content.ts`.

No se debe declarar cerrada la Fase 5 global ni v1 estable. Según la metodología vigente, Fase 5 sigue parcial porque faltan assets reales, revisión final de copy/microcopy y validación con visitantes reales.

## 4. Lo que SÍ está listo para una nueva fase

Está listo para iniciar F8 porque:

- La base técnica visual ya permite integrar assets sin tocar `content/stations/*.ts`.
- La capa `stationHeroSrc` / `introHeroSrc` está preparada en `lib/content.ts`.
- Estación IV ya tiene una interacción avanzada real y validada visualmente por el responsable.
- El asset pack define rutas, formatos, pesos y criterios narrativos.
- ADR-002 cerró alcance v1/v2+: 2D móvil en v1, sin AR, sin scanner interno y sin Lía 3D runtime.
- Existen estructuras separadas para staging editorial y runtime integrado.
- Los placeholders actuales siguen funcionando para piloto mínimo.
- El próximo ticket puede integrar un primer WebP/SVG real importando en `lib/content.ts` y asignándolo al mapa correcto.

## 5. Lo que TODAVÍA no está listo y no debe fingirse como resuelto

No está resuelto:

- Assets 2D reales para estaciones I, II, III y V: no producidos ni integrados.
- Hero real de Intro: no producido ni integrado.
- Iconografía SVG real de Estación IV: no producida.
- Copy narrativo de estaciones: semilla funcional validada por el responsable, pero no probada con visitantes reales.
- Microcopy de botones, hints y mensajes: sin validación de campo.
- QR físicos para piloto real: pendientes de cierre operativo.
- Prueba de campo completa con visitantes: pendiente.
- 3D, AR y scanner QR interno: fuera de v1 y archivados para v2+.

## 6. Decisiones cerradas que no deben reabrirse

No reabrir sin ADR nuevo y evidencia:

- Lía Andina única por ADR-001; no volver a multiavatar.
- v1 es experiencia 2D móvil por ADR-002.
- Sin AR en v1.
- Sin scanner QR interno en v1.
- Sin Lía 3D runtime en v1.
- QR por URL/ruta es el flujo oficial de campo v1.
- Estación IV es la única interacción visual avanzada de v1.
- Assets binarios se integran desde `apps/web/src/lib/content.ts`, no desde `content/stations/*.ts`.
- Línea roja narrativa: las plantas no hacen música por sí solas; toda representación visual debe mostrar o respetar la mediación tecnológica.

## 7. Brecha entre visión original y estado actual del repo

La visión original imaginaba una experiencia muy visual, con interacciones diferenciadas, posible 3D y AR.

El repo actual resolvió otra capa primero: operación local, secuencia, QR, Lía única, alcance visual v1, infraestructura de assets y una interacción técnica fuerte en Estación IV.

La brecha actual ya no es infraestructura visual. Es producción de assets 2D reales, aprobación visual, y validación narrativa con visitantes reales.

El proyecto puede hacer un primer piloto con placeholders si esa decisión se documenta, o puede invertir antes en assets prioritarios. Esa es la decisión central de F8.

## 8. Decisión recomendada: cuál debe ser la siguiente fase

La siguiente fase debe llamarse:

**Fase 8 — Producción e integración controlada de assets 2D v1/piloto**

Postura recomendada:

- Definir primero qué assets son obligatorios para el piloto y cuáles pueden esperar.
- Integrar primero los assets de mayor valor pedagógico, probablemente Estación II o Estación V.
- No perseguir perfección visual total si eso retrasa innecesariamente el piloto.
- Mantener rendimiento móvil, operación local y claridad narrativa como gates obligatorios.
- Documentar explícitamente si se decide pilotear con algunos placeholders.

F8 no está en el plan original de la metodología. Debe registrarse como fase extendida en el primer ticket documental correspondiente, recomendado como F8-05.

## 9. Preguntas que el nuevo chat debe resolver antes de abrir tickets

1. ¿Qué assets son obligatorios para el primer piloto de campo y cuáles pueden seguir como placeholder sin comprometer la experiencia?
2. ¿La Estación II debe ser el primer asset real a integrar por su valor pedagógico?
3. ¿La Estación V requiere fotografía real del montaje antes del piloto?
4. ¿El hero de Intro y Estación I pueden seguir con placeholder para el piloto?
5. ¿La iconografía SVG de Estación IV debe producirse antes o después del piloto?
6. ¿Quién aprueba visualmente los assets antes de moverlos de staging a runtime?
7. ¿El copy narrativo actual se aprueba como definitivo para piloto o requiere ajuste antes de campo?
8. Si se decide hacer el piloto con algunos placeholders, ¿se documenta esa decisión explícitamente como parte del alcance del piloto?

## 10. Lista recomendada de primeros tickets

1. F8-01 — Decidir alcance mínimo de assets para piloto v1 y documentarlo.
2. F8-02 — Integrar primer asset real, Estación II o V según decisión F8-01.
3. F8-03 — Integrar segundo asset real obligatorio para piloto.
4. F8-04 — Revisar y aprobar copy narrativo de todas las estaciones para piloto.
5. F8-05 — Actualizar sección de Fases en `metodologia-integral-gvo-v1.md` para registrar F7 y F8 como fases extendidas.
6. F8-06 — Preparar cierre documental de placeholders restantes para piloto.

## 11. Riesgos si se salta esta transición

- Integrar assets sin criterio de prioridad ni aprobación visual.
- Producir imágenes atractivas pero narrativamente incorrectas, especialmente si sugieren planta -> música directa.
- Comprometer rendimiento móvil con assets demasiado pesados.
- Importar binarios directamente en `content/stations/*.ts`, rompiendo la arquitectura cerrada en F7-07/F7-08.
- Reabrir 3D, AR o scanner sin evidencia operativa.
- Llegar al piloto con placeholders sin documentar que son parte del alcance del piloto.

## 12. Criterio de cierre de la nueva fase

Fase 8 se considera cerrada cuando:

- Hay decisión documentada sobre qué assets son obligatorios para piloto.
- El asset obligatorio de mayor prioridad, II o V, está integrado en runtime.
- El segundo asset obligatorio está integrado o existe decisión documentada de diferirlo.
- Intro, I y III tienen decisión explícita: asset real o placeholder para piloto.
- El copy narrativo de todas las estaciones fue revisado y aprobado por el responsable para piloto.
- La sección de Fases de la metodología refleja F7 y F8.
- `npm run typecheck` pasa.
- `npm run build` pasa.
- `npm run smoke:journey` pasa.
- La prueba visual móvil de estaciones con assets nuevos fue realizada.
- Existe handoff actualizado al cierre de F8.
