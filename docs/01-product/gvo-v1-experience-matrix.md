# GVO — Matriz de Experiencia Visual e Interactiva v1

**Fecha:** 2026-04-23
**Estado:** documento normativo — cerrado para F7-01
**Alimenta:** F7-02, F7-03, F7-04, F7-05

---

## 0. Premisas de diseño v1

**A. La experiencia v1 es 2D móvil.**
No hay 3D runtime en v1. El pipeline 3D de Lía no está iniciado: sin malla, sin rig, sin animación. Ningún componente debe asumir capacidad 3D en esta versión.

**B. Lía Andina es la guía única.**
Sus 4 estados PNG ya existen en `apps/web/src/assets/lia/` y son el único recurso de avatar disponible para v1:
- `lia-idle.png` — estado base, flotando (frontal)
- `lia-calm.png` — calma profunda
- `lia-curious.png` — curiosidad activa
- `lia-three-quarter.png` — tres cuartos, primer contacto

**C. El sistema de tonos ya existe.**
`VisualTone`: `default | warm | cool | cold | neutral`. Afecta el color de acento CSS del hero. Debe asignarse con criterio editorial, no por defecto.

**D. StationHero soporta solo `'placeholder'` e `'image'`.**
Cualquier interacción adicional requiere un nuevo tipo y un componente dedicado. Esa decisión se toma en la Sección 4 y se implementa en F7-04.

**E. Línea roja narrativa.**
Ningún asset visual puede sugerir causalidad directa planta → música. La mediación tecnológica debe ser visible como cadena, no como magia. Aplica a todos los recursos de todas las pantallas.

**F. Sin audio, sin AR, sin scanner QR interno en v1.**

---

## 1. Pantallas del recorrido — decisiones por pantalla

### Intro (paso 0)

| Campo | Decisión |
|---|---|
| Pantalla | Intro |
| Función narrativa | Pacto narrativo: Lía se presenta y declara que la mediación es real, no magia |
| Tipo de hero visual | imagen 2D — Lía en three-quarter sobre fondo atmósfera OKÚA (lavanda bruma) |
| Interacción | ninguna |
| Estado de Lía | `three-quarter` — primer contacto, presencia fuerte y abierta |
| Tono visual CSS | `default` — umbral de entrada, sin carga conceptual |
| Assets necesarios | Hero imagen: `lia-three-quarter.png` compuesto sobre fondo OKÚA, PNG/WebP ≤ 200 KB |
| ¿Requiere tipo nuevo? | no — `type: 'image'` es suficiente |
| Estado v1 | placeholder aceptable para piloto; hero imagen deseable pero no bloqueante |

**Justificación:** `IntroScreen.tsx` ya renderiza `<GuideAvatar state="curious" />` como elemento flotante en el header. El StationHero en Intro puede mostrar a Lía en three-quarter como hero de pantalla completa con fondo atmosférico — diferente al GuideAvatar. Si no hay hero producido para el piloto, el placeholder CSS existente cubre la función. El tono `default` es correcto: es el umbral antes de cualquier concepto técnico.

---

### Estación I — Origen y propósito

| Campo | Decisión |
|---|---|
| Pantalla | Estación I |
| Función narrativa | El visitante entiende por qué nació el proyecto: distancia con la vida vegetal, no espectáculo |
| Tipo de hero visual | imagen 2D — composición evocadora: planta viva en espacio real, encuadre íntimo |
| Interacción | ninguna |
| Estado de Lía | `calm` — acompañamiento tranquilo, tono reflexivo |
| Tono visual CSS | `warm` — motivacional, relacional, humano |
| Assets necesarios | Fotografía o ilustración 2D de planta viva en instalación OKÚA, PNG/WebP ≤ 250 KB |
| ¿Requiere tipo nuevo? | no |
| Estado v1 | placeholder aceptable para piloto; imagen real deseable |

**Justificación:** Esta es la única estación sin propiedad `visual` en `station-1.ts`. F7-04 debe añadir `visual: { hero: { type: 'placeholder', label: '[ Origen y propósito ]', caption: 'Por qué valía la pena construirla' }, tone: 'warm' }` como corrección mínima. El tono `warm` es editorialmente correcto: esta pantalla no explica técnica; establece el gesto humano detrás del proyecto. Es la más conceptual-humana del recorrido y debe ser visualmente ligera.

---

### Estación II — Señales bioeléctricas

| Campo | Decisión |
|---|---|
| Pantalla | Estación II |
| Función narrativa | El visitante entiende qué señal existe y por qué sola no es música; la cadena de mediación se presenta por primera vez |
| Tipo de hero visual | imagen 2D estática — ilustración de la cadena completa de traducción |
| Interacción | ninguna — la cadena es visible completa en una ilustración bien diseñada |
| Estado de Lía | `curious` — está explicando algo conceptualmente importante |
| Tono visual CSS | `cool` — conceptual, señal, cadena de traducción (mantener) |
| Assets necesarios | Ilustración 2D: `planta → señal bioeléctrica → captura → acondicionamiento → mapeo → música`, PNG/WebP 800×400 ≤ 250 KB, tono gráfico frío |
| ¿Requiere tipo nuevo? | no |
| Estado v1 | ilustración obligatoria para experiencia completa; placeholder funciona en piloto |

**Justificación:** El copy del bloque `note` ya describe la cadena. La ilustración la hace visible sin redundar en texto. Se elige imagen estática — no tap-reveal — porque la cadena de 6 pasos en Estación II es introductoria; la interacción tap-a-tap se reserva para la Estación IV donde tiene mayor valor de comprensión y no compite con este recurso. El tono `cool` es correcto: la señal bioeléctrica es el concepto que ancla todo el sistema.

---

### Estación III — Prototipos y evolución

| Campo | Decisión |
|---|---|
| Pantalla | Estación III |
| Función narrativa | Credibilidad histórica: el sistema evolucionó con pruebas reales, no fue diseñado de una vez |
| Tipo de hero visual | imagen 2D — línea de tiempo visual simple con 3 estados del sistema |
| Interacción | ninguna |
| Estado de Lía | `idle` — narrativa de proceso, tono reflexivo y pausado |
| Tono visual CSS | `neutral` — proceso, historia, evolución (mantener) |
| Assets necesarios | Composición 2D: proto cableado → arquitectura inalámbrica → versión actual, PNG/WebP 800×300 ≤ 200 KB |
| ¿Requiere tipo nuevo? | no |
| Estado v1 | placeholder aceptable para piloto |

**Justificación:** El tono `neutral` y el estado `idle` de Lía son deliberados para dar respiración al recorrido antes de la Estación IV, que es la más densa. El visitante lleva dos estaciones de exposición técnica creciente; esta pantalla debe ser visualmente más ligera. La línea de tiempo no necesita interacción: muestra evolución, no mecanismo.

---

### Estación IV — Operación técnica

| Campo | Decisión |
|---|---|
| Pantalla | Estación IV |
| Función narrativa | El visitante entiende con precisión cómo opera el sistema completo hoy: 7 nodos de transformación |
| Tipo de hero visual | **diagrama interactivo** — cadena revelable tap-a-tap (OPCIÓN A) |
| Interacción | tap para revelar cada nodo de la cadena en secuencia |
| Estado de Lía | `curious` — explicación técnica central, la más activa del recorrido |
| Tono visual CSS | `cold` — técnico-preciso, operación actual (mantener) |
| Assets necesarios | Componente `SignalFlowDiagram.tsx` con 7 nodos; iconografía mínima SVG por nodo |
| ¿Requiere tipo nuevo? | **sí** — `type: 'diagram'` en `VisualHero`; componente `SignalFlowDiagram.tsx` nuevo |
| Estado v1 | **incluido** — única estación con interacción avanzada en v1 |

**Justificación — por qué OPCIÓN A:** La cadena `planta → bionosificador → ESP32 → MIDI → Wi-Fi/UDP → router → sistema central → sonido` tiene 7 nodos con lógica de transformación diferente en cada salto. Una ilustración estática de 7 pasos en pantalla móvil comprime los conceptos — el visitante la lee como bloque, no como proceso. El tap-a-tap permite seguir el flujo al propio ritmo, anclar cada nodo antes del siguiente, y hace visible que cada paso es una transformación distinta. Esta es la estación más técnica del recorrido: la interacción no es decorativa, resuelve un problema real de comprensión en pantalla pequeña. **Esta es la única estación con diagrama interactivo en v1.** Implementación en F7-05.

---

### Estación V — Estado actual

| Campo | Decisión |
|---|---|
| Pantalla | Estación V |
| Función narrativa | Cierre integrativo: el visitante ubica el montaje en el presente y entiende su sentido real |
| Tipo de hero visual | imagen 2D — fotografía del montaje real en el espacio (plantas conectadas, instalación visible) |
| Interacción | ninguna |
| Estado de Lía | `calm` — cierre, síntesis, no explicación activa |
| Tono visual CSS | `warm` — integrativo, relacional (cambio desde `default`) |
| Assets necesarios | Fotografía del montaje OKÚA en espacio real, PNG/WebP ≤ 300 KB, encuadre que muestre conexión planta-sistema |
| ¿Requiere tipo nuevo? | no |
| Estado v1 | fotografía real obligatoria para experiencia completa; placeholder funciona en piloto |

**Justificación — cambio de tono a `warm`:** Esta estación es síntesis y sentido, no explicación técnica nueva. El visitante integra todo lo anterior. El tono `default` es genérico-neutro, apropiado para umbrales de entrada, no para cierre relacional. `warm` refuerza el carácter humano del cierre: la planta como ser vivo, el montaje como gesto de atención. La fotografía real del montaje hace al visitante reconocer lo que está viendo físicamente en el espacio.

---

### Cierre / Final

| Campo | Decisión |
|---|---|
| Pantalla | Cierre |
| Función narrativa | Confirmar que el recorrido se completó; abrir la revisita libre sin nueva carga informativa |
| Tipo de hero visual | sin hero de contenido — Lía sola, sin diagrama ni ilustración técnica |
| Interacción | ninguna |
| Estado de Lía | `calm` — satisfacción, pausa, cierre contemplativo |
| Tono visual CSS | `warm` — continuidad afectiva con Estación V |
| Assets necesarios | ninguno nuevo — `lia-calm.png` ya existe y está listo |
| ¿Requiere tipo nuevo? | no |
| Estado v1 | **incluido** — ya funcional con assets existentes |

**Justificación:** El cierre no debe añadir carga informativa. El momento es de pausa y confirmación. `lia-calm.png` (ya disponible) es suficiente. No necesita hero complejo. El tono `warm` da continuidad emocional con Estación V.

---

## 2. Resumen de assets requeridos v1

| Pantalla | Tipo | Descripción | Formato | Peso máx | Obligatorio v1 | Estado |
|---|---|---|---|---|---|---|
| Intro | imagen hero 2D | `lia-three-quarter.png` sobre fondo atmósfera OKÚA | PNG/WebP | 200 KB | deseable | pendiente |
| Estación I | imagen hero 2D | Planta viva en espacio real OKÚA, encuadre íntimo | PNG/WebP | 250 KB | deseable | pendiente |
| Estación II | ilustración 2D | Cadena: planta → señal → captura → acondicionamiento → mapeo → música | PNG/WebP 800×400 | 250 KB | **obligatorio** | pendiente |
| Estación III | composición 2D | Línea de tiempo: proto cableado → inalámbrico → versión actual | PNG/WebP 800×300 | 200 KB | deseable | pendiente |
| Estación IV | componente interactivo | `SignalFlowDiagram.tsx` — 7 nodos tap-a-tap con iconografía SVG | JSX/SVG | — | **obligatorio** | pendiente |
| Estación V | fotografía | Montaje real OKÚA: plantas conectadas + sistema visible | PNG/WebP | 300 KB | **obligatorio** | pendiente |
| Cierre | — | Sin hero nuevo | — | — | — | **listo** |
| Todas | avatar Lía (4 estados) | `lia-idle`, `lia-calm`, `lia-curious`, `lia-three-quarter` — PNG con fondo transparente | PNG | — | incluido | **listo** |

**Criterio de piloto:** Las pantallas con assets "deseables" pueden operar con su placeholder CSS actual sin afectar la comprensión del recorrido. Los tres assets "obligatorios" (Estación II ilustración, Estación IV componente, Estación V fotografía) son necesarios para la experiencia completa v1 post-piloto. Para el piloto inicial, placeholder en todos es aceptable.

---

## 3. Decisiones de alcance v1 / v2+

**A. 3D RUNTIME DE LÍA — fuera de v1.**
Pipeline no iniciado (sin malla, rig ni animación según `lia-andina-spec.md`). Los 4 PNG son el único recurso de avatar para toda la experiencia v1. v2+ solo si el pipeline 3D se completa y valida en campo.

**B. AR (REALIDAD AUMENTADA) — fuera de v1.**
Sin fuente de verdad técnica cerrada, sin necesidad operativa demostrada, sin ruta viable en campo. Archivado para v2+. No mencionar en materiales de piloto.

**C. SCANNER QR CON CÁMARA INTERNA — fuera de v1.**
El flujo actual por URL/ruta (`QrScreen.tsx`) resuelve la operación de campo. El scanner agrega complejidad de permisos, compatibilidad de cámara y puntos de fallo sin aportar mejora demostrada. Revisar para v2 solo si hay necesidad operativa documentada post-piloto.

**D. DIAGRAMA INTERACTIVO (Estación IV) — incluido en v1.**
Decisión: **OPCIÓN A**. Requiere `type: 'diagram'` en `VisualHero` y componente `SignalFlowDiagram.tsx`. Esta es la única estación con interacción avanzada en v1. Justificación completa en Sección 1, Estación IV. Implementación en F7-04 (extensión de tipo) y F7-05 (slice vertical).

**E. MULTIAVATAR — fuera de v1 y de discusión.**
ADR-001 cerrado. No reabrir.

**F. ASISTENTE CONVERSACIONAL / IA EN VIVO — fuera de v1.**
No aporta al cierre inmediato. Complejidad de mantenimiento no justificada para esta fase.

**G. CMS / PANEL ADMINISTRATIVO — fuera de v1.**
Declarado en `product-scope.md`. No reabrir.

---

## 4. Extensiones requeridas al sistema visual

**A. StationHero necesita un nuevo tipo: `'diagram'`.**
Solo para Estación IV. El tipo `'diagram'` delega el render a `SignalFlowDiagram.tsx` en lugar de mostrar una imagen estática. Cambio mínimo en `VisualHero.type`:
```ts
type: 'placeholder' | 'image' | 'diagram'
```
Implementar en F7-04. No implementar en este ticket.

**B. `packages/shared/src/content.ts` necesita un campo opcional.**
La interfaz `VisualHero` necesita `diagramId?: string` para identificar qué diagrama renderizar cuando `type === 'diagram'`:
```ts
interface VisualHero {
  type: 'placeholder' | 'image' | 'diagram';
  label: string;
  src?: string;        // solo para type:'image'
  diagramId?: string;  // solo para type:'diagram', ej. 'signal-flow'
  caption?: string;
}
```
Implementar en F7-04 junto con la extensión de StationHero.

**C. Componentes nuevos requeridos:**
- `SignalFlowDiagram.tsx` — diagrama de cadena técnica con 7 nodos revelables tap-a-tap para Estación IV. Implementar en F7-05. No implementar en tickets anteriores.

**D. Criterio formal de uso de estados de Lía:**

| Estado | Cuándo usarlo |
|---|---|
| `idle` | Pantallas de espera, transición y proceso histórico sin contenido técnico activo (Estación III) |
| `calm` | Estaciones conceptual-motivacionales (I), cierre (V, Final) |
| `curious` | Estaciones de explicación técnica activa (II, IV) |
| `three-quarter` | Intro — primer contacto, presencia fuerte y abierta |

Regla de excepción: si una estación combina motivación y proceso (como III), preferir `idle` sobre `curious` para dar ritmo visual al recorrido. No todas las estaciones deben tener el mismo nivel de energía en Lía.

---

## 5. Coherencia visual transversal

**A. Tono visual por pantalla — asignación final:**

| Pantalla | Tono | Criterio editorial |
|---|---|---|
| Intro | `default` | Umbral de entrada, neutro, sin carga conceptual |
| Estación I | `warm` | Motivacional, relacional, el origen humano del proyecto |
| Estación II | `cool` | Conceptual, señal bioeléctrica, primera cadena de mediación |
| Estación III | `neutral` | Proceso histórico, evolución técnica, tono reflexivo |
| Estación IV | `cold` | Técnico-preciso, operación actual, máxima precisión |
| Estación V | `warm` | Síntesis integrativa, sentido del montaje, cierre relacional |
| Cierre | `warm` | Continuidad emocional con Estación V, pausa, satisfacción |

La secuencia de tonos forma un arco deliberado: `default → warm → cool → neutral → cold → warm → warm`. El visitante parte de neutro, entra en lo humano, desciende a lo conceptual-técnico, alcanza el pico de precisión técnica en IV, y regresa a lo relacional en el cierre.

**B. Presencia de Lía.**
Lía aparece en todas las pantallas mediante `GuideAvatar` en el header del Layout. En Intro también puede aparecer en el área hero como imagen de primer contacto. En el resto de estaciones, el hero es el recurso visual de la estación (ilustración, diagrama o fotografía); Lía acompaña pero no compite con el contenido del hero.

**C. Peso visual y ritmo.**
Distribución deliberada de densidad visual según función narrativa:
- Intro: presencia de Lía + fondo atmosférico — densidad media (acogida)
- Estación I: imagen evocadora + copy largo — densidad baja (pausa conceptual)
- Estación II: ilustración de cadena + copy — densidad media (primera carga técnica)
- Estación III: línea de tiempo + copy reflexivo — densidad baja (respiración antes del pico)
- Estación IV: diagrama interactivo + copy técnico — densidad alta (pico de aprendizaje)
- Estación V: fotografía real + copy integrador — densidad media (aterrizaje)
- Cierre: Lía calm + confirmación breve — densidad baja (pausa final)

**D. Línea roja narrativa en assets.**
Ningún asset visual debe mostrar flecha directa planta → sonido sin nodos intermedios visibles. La cadena de mediación debe ser reconocible como proceso de transformación en cada recurso que la represente. Los assets de estaciones conceptuales (I, III, V) pueden ser evocadores, pero nunca deben sugerir causalidad directa.
