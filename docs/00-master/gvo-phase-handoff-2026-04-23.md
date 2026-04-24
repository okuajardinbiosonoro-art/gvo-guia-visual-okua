# GVO — Handoff de fase para nuevo chat

## 1. Propósito del documento
Este archivo resume el estado real de `main` para abrir una nueva etapa sin arrastrar toda la conversación anterior.

Sirve para:
- identificar qué quedó realmente cerrado en el repo;
- señalar qué sigue abierto y debe decidirse antes de implementar nueva experiencia visual;
- fijar qué decisiones no deben reabrirse sin una justificación fuerte.

## 2. Estado real confirmado de main
`main` ya no está en una fase temprana ni en un scaffold. El repo contiene un sistema operativo real para piloto local:
- flujo secuencial completo por QR URL;
- sesiones temporales en memoria;
- cierre y revisita libre;
- avatar único Lía Andina;
- hardening base para Windows;
- arranque local unificado;
- autoarranque por Scheduled Task;
- verificación post-arranque;
- generación de QR;
- kit de validación de laboratorio;
- release candidate de campo reproducible.

La versión visible ya está sincronizada a `0.9.0-rc.1` en el root, `packages/shared/src/meta.ts`, los `package.json` workspace y el lockfile.

Si algún chat anterior o alguna caché remota todavía muestra `0.7.0`, eso ya no describe el `main` vivo. Trátalo como snapshot viejo, no como estado actual.

Evidencia documental y técnica que respalda este estado:
- `README.md`
- `docs/00-master/metodologia-integral-gvo-v1.md`
- `docs/04-architecture/architecture-overview.md`
- `docs/06-operations/windows-local-runbook.md`
- `docs/06-operations/field-preflight-checklist.md`
- `docs/06-operations/field-release-candidate.md`
- `docs/06-operations/windows-autostart.md`
- `content/qr/README.md`
- `docs/05-adr/ADR-001-single-avatar-lia.md`
- `apps/web/src/screens/QrScreen.tsx`
- `apps/web/src/components/StationHero.tsx`
- `content/stations/station-4.ts`

Lectura importante de esas fuentes:
- `QrScreen.tsx` resuelve `/qr/:token` con navegación y validación de sesión; no hay scanner de cámara dentro de la app.
- `StationHero.tsx` solo soporta `placeholder` e `image`; no hay runtime 3D ni interacción avanzada por defecto.
- `station-4.ts` sigue siendo copy 2D semilla con hero placeholder, no una estación final visualmente cerrada.
- `ADR-001` mantiene a Lía Andina como guía única y elimina `/guide`.

## 3. Etapa que puede darse por cerrada
Sí: la etapa de infraestructura, hardening y preparación operativa local para piloto puede darse por cerrada dentro del repo.

Lo que quedó cerrado no es solo “que compile”, sino una base operativa completa para piloto local:
- entry flow por QR URL;
- sesión, secuencia, final y revisita;
- QR generation workflow;
- runbook Windows;
- autoarranque y verificación post-arranque;
- hardening local base;
- validation kit de laboratorio;
- release candidate de campo.

Lo que sigue fuera del repo es ejecución real de campo, no falta de infraestructura interna.

## 4. Lo que SÍ está listo para una nueva fase
Está listo para arrancar una fase nueva centrada en producto visual e interacción:
- el flujo secuencial ya está probado y documentado;
- la operación local ya tiene guía, autostart y verificación;
- el paquete de QR se puede regenerar desde repo;
- el release candidate se prepara de forma reproducible;
- la validación de laboratorio ya existe;
- Lía única ya no es una decisión abierta;
- el frontend ya distingue `lab` y `field`;
- el repo ya diferencia sample QR vs final QR.

En otras palabras: la base operativa está cerrada; ahora sí tiene sentido discutir la capa de experiencia visual avanzada.

## 5. Lo que TODAVÍA no está listo y no debe fingirse como resuelto
Todavía no existe una fuente de verdad cerrada para:
- escaneo de QR con cámara dentro de la app;
- 3D interactivo real por estación;
- pipeline 3D de Lía en runtime;
- realidad aumentada;
- assets reales y finales por estación;
- interacción diferenciada final por estación;
- decisión de si AR entra o no entra en v1.

También sigue sin resolverse el orden correcto entre:
- UX visual;
- assets 2D finales;
- 3D;
- AR;
- scanner interno.

No conviene abrir tickets de implementación de 3D o AR como si ya hubiera una decisión de alcance. Primero falta definición.

## 6. Decisiones cerradas que no deben reabrirse
Estas decisiones ya están cerradas y no deberían reabrirse sin una justificación fuerte y documentada:
- Lía Andina es la guía única vigente.
- No hay audio en la aplicación.
- La operación normal es local y no depende de Internet.
- La primera pasada es secuencial obligatoria.
- La app complementa la mediación presencial, no la reemplaza.
- El sistema no debe sugerir que las plantas “hacen música por sí solas”.
- `/guide` no es parte del flujo.
- El visitante no debe ver complejidad administrativa.
- No se debe reintroducir multiavatar por defecto.

## 7. Brecha entre visión original y estado actual del repo
La visión original del proyecto imaginaba más personalización visual, interacción más rica, y un futuro con 3D o AR más claramente protagonista.

El estado actual del repo, en cambio, es este:
- una base técnica-operativa sólida;
- una experiencia 2D funcional;
- copy semilla integrado;
- placeholders visuales todavía presentes en varias estaciones;
- interacción avanzada no resuelta;
- 3D/AR todavía como tema de definición, no de implementación cerrada.

La brecha real ya no es de “infraestructura mínima”. La brecha ahora es de diseño de experiencia y alcance de producto.

## 8. Decisión recomendada: cuál debe ser la siguiente fase
La siguiente fase debería llamarse algo como:

**Fase 7 — Definición de experiencia visual e interactiva v1**

Por qué esta fase y no otra:
- la base operativa ya quedó cerrada en repo;
- el siguiente cuello de botella es definir la experiencia final;
- hace falta decidir qué estaciones serán 2D final, cuáles necesitarán mayor interacción y si alguna realmente exige 3D o AR;
- hace falta evitar que el equipo implemente por intuición lo que todavía no está decidido.

Mi postura: sí, ya es correcto abrir una nueva fase centrada en experiencia visual e interacciones avanzadas.

Mi postura también: todavía no existe una fuente de verdad suficientemente cerrada para asumir 3D/AR/escaneo con cámara dentro de la app como parte del siguiente paso.

## 9. Preguntas que el nuevo chat debe resolver antes de abrir tickets de implementación
- ¿La siguiente prioridad real es scanner QR dentro de la app o basta seguir con QR por URL para v1?
- ¿Qué estaciones requieren 3D real y cuáles no?
- ¿AR entra en v1 o se archiva para v2+?
- ¿Qué assets/héroes visuales mínimos debe tener cada estación?
- ¿Cuál es el orden correcto entre UX visual, assets 2D finales, 3D y AR?
- ¿La política de versión rc se mantiene sincronizada en todos los package.json o se define otra convención explícita para workspaces?

## 10. Lista recomendada de primeros tickets de la nueva fase
1. Definir la matriz de experiencia visual e interacción por estación, con decisión explícita de qué queda en 2D y qué no.
2. Decidir la estrategia de acceso: QR por URL como v1 o scanner de cámara dentro de la app.
3. Definir el paquete mínimo de assets 2D finales por estación y para Lía.
4. Resolver el alcance de 3D y AR con una decisión explícita: entra en v1 o se difiere a v2+.
5. Ejecutar una primera estación vertical slice con la decisión ya tomada, sin mezclarla con más fases.

## 11. Riesgos si se salta esta transición
- Implementar 3D o AR sin definición de alcance y desperdiciar tiempo en la dirección equivocada.
- Mezclar decisión de producto con ejecución técnica y terminar con una experiencia inconsistente.
- Cargar assets o interacciones que no responden al flujo real del visitante.
- Reabrir decisiones cerradas como avatar único, secuencia o operación local, y generar ruido innecesario.
- Perder la claridad entre lo que ya está cerrado y lo que todavía es exploración.

## 12. Criterio de cierre de la nueva fase de definición
La nueva fase de definición solo debería cerrarse cuando exista:
- una decisión explícita sobre scanner QR interno vs QR por URL;
- una decisión explícita sobre 3D y AR para v1;
- una matriz estación por estación de experiencia visual e interacción;
- un baseline mínimo de assets o placeholders aprobados para la fase siguiente;
- una secuencia de tickets de implementación ya ordenada;
- una postura documentada sobre qué no entra en v1.

Cuando eso exista, recién ahí conviene abrir tickets de implementación visual, 3D o AR.
