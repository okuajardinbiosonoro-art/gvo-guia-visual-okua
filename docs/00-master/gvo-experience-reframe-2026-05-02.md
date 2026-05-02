# GVO — Reencuadre de metodología: experiencia completa antes de campo

## 1. Decisión del responsable

El responsable del proyecto ha decidido que campo es la fase de aceptación final, no de descubrimiento de features.

Antes de empaquetar para campo, la aplicación debe tener su experiencia completa: Lía como guía activa, interacciones diferenciadas por estación, copy/guion final y una decisión explícita sobre la estrategia de animación.

Este reencuadre no invalida el cierre operativo de F9. Lo que cambia es la prioridad: primero se completa la capa de experiencia y después se empaqueta para campo.

## 2. Estado real de la capa de experiencia al momento del reencuadre

La evidencia actual del repositorio muestra una capa de experiencia todavía parcial:

- `apps/web/src/components/GuideAvatar.tsx` solo renderiza 4 PNG estáticos: `idle`, `calm`, `curious` y `three-quarter`.
- `apps/web/src/components/Layout.tsx` muestra siempre `GuideAvatar state="idle"` en el header, sin variación por estación.
- `packages/shared/src/content.ts` define `ContentBlock` solo con `paragraph`, `note`, `hint` y `heading`; no existe tipo de diálogo o voz de guía.
- `docs/01-product/gvo-v1-experience-matrix.md` ya marca que la única interacción avanzada de v1 es Estación IV.
- `docs/02-script/front-c-auditoria-y-contrato-v1.md` señala debilidades en voz de Lía, transiciones entre estaciones, densidad textual y primera persona.
- `docs/02-script/gvo-f8-pilot-copy-microcopy-approval.md` aprobó el copy como semilla para piloto, no como guion final.
- `docs/avatars/lia-andina/lia-andina-spec.md` declara la biblia visual cerrada y lista para pipeline 3D, pero el pipeline 3D no está iniciado en runtime.

En resumen: la guía existe, la biblia visual está cerrada y el recorrido opera, pero la presencia narrativa y dinámica de Lía todavía no está completa.

## 3. Qué está completo en la capa operativa

La capa operativa sí está cerrada a nivel de laboratorio:

- Flujo QR por URL/ruta validado.
- Sesiones y secuencia endurecidas.
- Revisit y bloqueo de saltos futuros resueltos.
- Validación de laboratorio aprobada.
- Assets obligatorios de laboratorio integrados.
- Estación IV con `SignalFlowDiagram` funcional como única interacción avanzada.
- Arquitectura de assets alineada en `apps/web/src/lib/content.ts`.

Esto significa que el sistema operativo del recorrido ya funciona. El problema ya no es “hacer que arranque”, sino terminar la experiencia que lo acompaña.

## 4. Qué está incompleto en la capa de experiencia

Faltan todavía elementos de experiencia que el reencuadre considera necesarios antes de empaquetar:

- Sistema de presencia activa de Lía en pantalla.
- Diálogos de Lía por pantalla o estación.
- Transiciones con intención narrativa entre estaciones.
- Interacciones diferenciadas para Estación I, II, III y V.
- Copy/guion final con voz de Lía en primera persona.
- Estrategia de animación, todavía pendiente de decisión entre CSS/2D/3D.
- Hero real de Intro, Estación I y Estación III, que siguen como placeholders.
- Iconografía SVG final de Estación IV, todavía diferida.

La capa de experiencia, por tanto, no está terminada todavía. Está suficiente para laboratorio operativo, pero no para empaquetado final.

## 5. Nueva regla: experiencia antes de empaquetado

La experiencia de usuario debe estar completa y validada en laboratorio antes de iniciar F10 (empaquetado).

Campo recibe una versión terminada.

La capa operativa puede validarse por separado, pero el empaquetado final solo puede comenzar cuando la experiencia también esté cerrada: Lía activa, interacciones por estación, copy final y animaciones resueltas.

## 6. Impacto sobre F10 y F11

F10 y F11 siguen siendo correctas como ideas de fase, pero ahora quedan supeditadas al cierre de las fases de experiencia previas.

Esto implica dos cosas:

- Su posición relativa se mantiene: packaging antes de campo.
- Su número de fase puede cambiar si el siguiente chat define fases intermedias entre F9 y F10.

El contenido macro no cambia: packaging sigue siendo packaging y campo sigue siendo campo. Lo que cambia es que no pueden abrirse todavía como siguientes pasos inmediatos sin cerrar la capa de experiencia.

## 7. Pregunta abierta: decisión de animaciones y nivel de Lía activa

ADR-002 cierra 3D runtime en v1. Aun así, el responsable del proyecto quiere una experiencia completa con Lía activa y animaciones.

Las opciones abiertas para el siguiente chat son:

- a) CSS animations y transiciones 2D, compatibles con ADR-002.
- b) Secuencias animadas 2D, como sprite o Lottie, sin modelo 3D, también compatibles con ADR-002.
- c) Revisión del ADR-002 para incluir algún nivel de animación de Lía, lo que requeriría un ADR-003.

Esta decisión no se resuelve aquí. Se deja abierta para el siguiente chat.

## 8. Lo que el siguiente chat debe definir

El siguiente chat debe decidir, como mínimo:

- La estrategia de animación y presencia de Lía, y si hace falta ADR-003.
- El sistema de diálogos: nuevo `ContentBlock`, componente flotante o alternativa equivalente.
- Las interacciones diferenciadas por estación I, II, III y V.
- El alcance del copy/guion final.
- Las fases intermedias necesarias entre F9 y F10.
- El orden de implementación de esas fases.

Sin esa definición, empaquetar sería adelantar una fase que todavía depende de decisiones de experiencia.

## 9. Lo que no cambia

Este reencuadre no cambia las decisiones estructurales ya cerradas:

- ADR-001 sigue vigente: Lía única.
- Cero audio.
- Sin dependencia operativa de Internet.
- Sin AR.
- Sin scanner QR interno.
- Flujo QR por URL/ruta sigue siendo el contrato oficial.
- Mobile-first sigue siendo la base.
- La cadena de 8 nodos de mediación sigue siendo la referencia técnica.
- Los assets siguen integrándose desde `apps/web/src/lib/content.ts`.
- No debe haber `src` en `content/stations/*.ts`.

Tampoco se reabre el trabajo de campo como si fuera el siguiente paso inmediato. Primero se termina la experiencia. Luego se empaqueta. Después se va a campo.
