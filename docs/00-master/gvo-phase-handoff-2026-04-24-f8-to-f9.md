# GVO — Handoff de cierre F8 y transición a F9

## 1. Propósito del documento

Este documento cierra la Fase 8 de producción e integración controlada de assets 2D para v1/piloto y prepara la apertura de la siguiente fase, enfocada ya no en producción visual sino en validación operativa real.

El repo no parte desde cero: ya tiene recorrido funcional, assets prioritarios integrados, copy aprobado para piloto y arquitectura documental suficiente para entrar a la siguiente fase sin arrastrar dudas de alcance.

## 2. Estado real confirmado de main

Estado confirmado contra `main` y `origin/main` el 2026-04-24:

- Versión `0.9.0-rc.1` sincronizada en raíz, workspaces y `packages/shared/src/meta.ts`.
- Flujo QR por URL/ruta operativo: entrada por `/entry/:token` y estaciones por `/qr/:token`.
- Modo `lab`/`field` vigente en configuración del frontend.
- Lía Andina sigue como guía única por ADR-001.
- Sin AR, sin scanner QR interno y sin Lía 3D runtime para v1 por ADR-002.
- Estación II tiene SVG real integrado y aprobado.
- Estación V tiene WebP real integrado y aprobado.
- Estación IV usa `SignalFlowDiagram` funcional con 8 nodos.
- Intro, Estación I y Estación III siguen con placeholders CSS aceptados para piloto.
- Copy y microcopy de piloto aprobados en `docs/02-script/gvo-f8-pilot-copy-microcopy-approval.md`.
- `apps/web/src/lib/content.ts` integra assets con `stationHeroSrc`; `content/stations/*.ts` no usan `src`.

## 3. Etapa que puede darse por cerrada

Puede darse por cerrada la fase:

**Fase 8 — Producción e integración controlada de assets 2D v1/piloto**

Resumen de tickets:

- F8-01: formalizó el alcance de piloto, registró F7/F8 en la metodología y corrigió inconsistencias documentales pre-asset.
- F8-02: integró el hero SVG de Estación II en staging y runtime.
- F8-02R: aprobó visualmente Estación II y corrigió referencias obsoletas en docs.
- F8-03: integró el hero WebP real de Estación V en staging y runtime.
- F8-04: aprobó copy/microcopy de piloto y alineó la metodología de assets.
- F8-05: alineó el README raíz y creó este handoff de cierre F8 hacia F9.

No debe declararse v1 estable todavía. F8 cierra infraestructura, assets prioritarios y aprobación editorial para piloto, pero no valida el piloto real en campo.

## 4. Lo que SÍ está listo para una nueva fase

Está listo para pasar a una fase operativa porque:

- El recorrido funcional ya existe y compila.
- Los assets obligatorios de mayor prioridad están integrados.
- Los placeholders restantes están documentados como decisión explícita de alcance, no como deuda accidental.
- El copy/microcopy de piloto está aprobado.
- La arquitectura de assets está clara: staging editorial en `assets/stations/`, runtime en `apps/web/src/assets/stations/`, integración en `apps/web/src/lib/content.ts`.
- La cadena técnica de Estación IV ya está resolviendo la comprensión del sistema con 8 nodos.
- README y metodología quedaron alineados con el estado real del repo.

## 5. Lo que TODAVÍA no está listo y no debe fingirse como resuelto

Todavía falta:

- Validación con visitantes reales en campo.
- Reporte de piloto ejecutado.
- QR físicos finales impresos y verificados contra host/IP de campo.
- Configuración field de la máquina de campo ya probada en sitio.
- Prueba de red local con dispositivos móviles reales.
- Concurrencia y soak de piloto.
- Intro, Estación I y Estación III: placeholders aceptados para piloto, no assets finales.
- Iconografía SVG final de Estación IV.
- Cualquier declaración de v1 estable.

## 6. Decisiones cerradas que no deben reabrirse

- Lía Andina es la única guía; no reabrir multiavatar.
- No audio en v1.
- No AR en v1.
- No scanner QR interno en v1.
- No Lía 3D runtime en v1.
- QR por URL/ruta es el flujo oficial de campo v1.
- Los assets binarios se integran desde `apps/web/src/lib/content.ts`, no desde `content/stations/*.ts`.
- No debe haber `src` en `content/stations/*.ts`.
- Estaciones II y V no vuelven a placeholder.
- Las plantas no producen música por sí solas; la mediación tecnológica debe seguir visible.
- La cadena técnica de Estación IV mantiene 8 nodos, no 7.

## 7. Brecha entre visión original y estado actual del repo

La brecha ya no es de producción visual prioritaria. Esa parte quedó resuelta en F8 con assets integrados, copy aprobado y contratos documentales alineados.

La brecha real ahora es de validación operativa: QR físicos, entorno de campo, IP/host reales, dispositivos móviles reales, estabilidad de red y evidencia de uso.

## 8. Decisión recomendada: cuál debe ser la siguiente fase

La siguiente fase debe llamarse:

**Fase 9 — Preparación y validación operativa de piloto de campo v1**

Postura recomendada:

- No producir más assets antes del primer piloto.
- Preparar el entorno real de campo.
- Validar modo `field`, host/IP y QR finales.
- Probar móviles reales y red local.
- Recoger evidencia de ejecución y decidir con datos si el piloto avanza o requiere correcciones.

## 9. Preguntas que el nuevo chat debe resolver antes de abrir tickets

1. ¿El piloto se ejecutará en laboratorio local o en campo real?
2. ¿Qué host, IP y puerto se usarán para los QR finales?
3. ¿Ya existen QR físicos impresos o deben generarse?
4. ¿La máquina de campo usará `VITE_APP_MODE=field` desde el inicio?
5. ¿Qué dispositivos se probarán: Android, iPhone, Opera, Chrome y Safari?
6. ¿Cuántos usuarios concurrentes se simularán durante la validación?
7. ¿Qué evidencia se debe recoger durante el piloto?
8. ¿Qué criterio define éxito y qué obliga a volver a corrección?

## 10. Lista recomendada de primeros tickets

1. F9-01 — Crear checklist operativo reproducible de piloto de campo v1.
2. F9-02 — Verificar configuración field, host/IP real y QR finales.
3. F9-03 — QA móvil multibrowser previo al piloto (Chrome, Safari, Opera).
4. F9-04 — Ejecutar recorrido completo en red local con reporte de incidencias.
5. F9-05 — Preparar plantilla de reporte de piloto e incidencias.
6. F9-06 — Decisión go/no-go del piloto de campo y próximos correctivos.

## 11. Riesgos si se salta esta transición

- README y docs pueden volver a contradecir el estado real.
- Las URLs pueden quedar desalineadas con el host/IP de campo.
- Los móviles reales pueden fallar y no haber checklist para detectarlo a tiempo.
- Los placeholders aceptados pueden confundirse con deuda accidental.
- Puede reabrirse producción visual cuando el problema ya es operativo.
- Podría declararse v1 estable sin validación real.

## 12. Criterio de cierre de la nueva fase

Fase 9 se considera cerrada cuando:

- Existe un checklist operativo reproducible.
- Los QR finales están validados.
- El modo `field` fue probado.
- El recorrido completo fue ejecutado en móvil real.
- La concurrencia mínima fue probada.
- Existe un reporte de piloto e incidencias.
- Hay una decisión go/no-go documentada con evidencia.

