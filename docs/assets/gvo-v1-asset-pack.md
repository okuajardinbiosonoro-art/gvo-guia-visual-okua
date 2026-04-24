# GVO — Paquete mínimo de assets 2D v1

## 0. Propósito

Este documento convierte las decisiones de la matriz visual v1 (`docs/01-product/gvo-v1-experience-matrix.md`) en un inventario concreto de assets: qué se necesita, dónde vivirá, en qué formato, con qué peso máximo, cuál es obligatorio y cuál puede seguir como placeholder.

Fue base para F7-04 (extensión de `StationHero` y rutas) y F7-05 (implementación de `SignalFlowDiagram.tsx` para Estación IV). Desde F8 se complementa con `docs/assets/gvo-f8-pilot-asset-scope.md`.

## 1. Premisas de producción visual

- v1 usa assets 2D livianos. Sin Lía 3D runtime, sin AR, sin audio.
- Mobile-first: diseñar para viewport móvil vertical (~390px).
- Operación local sin internet: todos los assets deben estar en el repo o ser generables offline.
- Ningún asset puede sugerir causalidad directa planta → música. Cuando haya flechas de proceso, la mediación técnica debe ser visible.
- Los 4 PNG de Lía ya existen y son los únicos recursos de avatar para v1.
- Los iconos de Estación IV (diagrama de cadena técnica) son el único tipo de asset nuevo fuera de los heroes de pantalla.

## 2. Convención de rutas y dos ubicaciones

El repo tiene dos ubicaciones para assets de estaciones:

**Ubicación A — Staging editorial (fuera de Vite):** `assets/stations/station-X/`

Propósito: almacenamiento de assets en producción antes de integración. Los archivos aquí no son accesibles en runtime sin configuración adicional. Ya tiene estructura con `.gitkeep`. Es el directorio de trabajo del productor.

**Ubicación B — Assets integrados en app (dentro de Vite):** `apps/web/src/assets/stations/station-X/`

Propósito: assets listos para ser referenciados en runtime por `VisualHero`. Funciona porque Vite empaqueta todo lo que esté bajo `apps/web/src/`. Es equivalente al patrón donde ya viven los PNGs de Lía (`apps/web/src/assets/lia/`).

Decisión: `hero.src` en `VisualHero` es un string que Vite necesita poder resolver. La manera más simple y consistente con la arquitectura cerrada en F7-07/F7-08 es mantener los assets aprobados en `apps/web/src/assets/stations/station-X/` e importarlos como módulos desde `apps/web/src/lib/content.ts`.

Flujo de un asset desde producción hasta integración:

1. El asset se produce y revisa en `assets/stations/station-X/` (staging).
2. Una vez aprobado, se copia a `apps/web/src/assets/stations/station-X/`.
3. El archivo `apps/web/src/lib/content.ts` importa el asset como módulo ES y lo asigna al mapa `stationHeroSrc[id]`.

Ejemplo correcto para Estación II:

```ts
// En apps/web/src/lib/content.ts:
import heroStation2 from '../assets/stations/station-2/diagram-bioelectric-chain.webp';

const stationHeroSrc: Partial<Record<number, string>> = {
  2: heroStation2,
};
```

El archivo `content/stations/station-2.ts` solo actualiza `hero.type` de `'placeholder'` a `'image'`. No importa binarios directamente.

Ver `docs/assets/gvo-f8-pilot-asset-scope.md` sección 6 para la regla completa de arquitectura de imports.

## 3. Inventario de assets existentes

| Asset | Ruta actual | Estado | Uso en app |
|---|---|---|---|
| `lia-idle.png` | `apps/web/src/assets/lia/` | existente | header/layout base |
| `lia-calm.png` | `apps/web/src/assets/lia/` | existente | cierre, estaciones motivacionales |
| `lia-curious.png` | `apps/web/src/assets/lia/` | existente | intro, estaciones técnicas |
| `lia-three-quarter.png` | `apps/web/src/assets/lia/` | existente | intro (primer contacto) |

Los 4 PNG son usables para v1 sin producción adicional. La spec completa está en `docs/avatars/lia-andina/lia-andina-spec.md`.

## 4. Assets requeridos por pantalla

| Pantalla | Asset ID | Descripción | Ruta propuesta (staging) | Ruta app | Formato | Peso máx | Obligatorio v1 | Placeholder OK | Estado |
|---|---|---|---|---|---|---|---|---|---|
| Intro | `intro-hero-lia-threshold` | Lía en three-quarter sobre fondo atmósfera OKÚA (lavanda bruma). Primer contacto visual. No debe mostrar técnica. | `assets/stations/intro/hero-lia-threshold.webp` | `apps/web/src/assets/stations/intro/hero-lia-threshold.webp` | WebP con transparencia o PNG | 200 KB | no — deseable | sí | pendiente |
| Estación I — Origen y propósito | `station-1-hero-origin` | Composición evocadora de planta viva en espacio real. Encuadre íntimo. Sin tecnicismo. Tono warm. | `assets/stations/station-1/hero-origin-purpose.webp` | `apps/web/src/assets/stations/station-1/hero-origin-purpose.webp` | WebP o fotografía real del montaje | 250 KB | no — deseable | sí | pendiente |
| Estación II — Señales bioeléctricas | `station-2-diagram-chain` | Ilustración 2D de la cadena completa: planta → señal bioeléctrica → captura → acondicionamiento → mapeo → música. Tono gráfico frío. Lectura horizontal en móvil. | `assets/stations/station-2/diagram-bioelectric-chain.webp` | `apps/web/src/assets/stations/station-2/diagram-bioelectric-chain.webp` | WebP, o SVG si la ilustración es vectorial | 250 KB | sí — reemplazar placeholder antes de v1 completa | solo en piloto mínimo | pendiente |
| Estación III — Prototipos y evolución | `station-3-timeline` | Línea de tiempo 2D simple con 3 estados del sistema: proto cableado → arquitectura inalámbrica → versión actual. Ligera, sin interacción. | `assets/stations/station-3/timeline-prototypes.webp` | `apps/web/src/assets/stations/station-3/timeline-prototypes.webp` | WebP | 200 KB | no — deseable | sí | pendiente |
| Estación IV — Operación técnica | `station-4-icon-[nodo]` | Set de iconos SVG individuales para la cadena técnica: planta, bionosificador, esp32, midi, wifi-udp, router, sistema-central, sonido. Usados por `SignalFlowDiagram.tsx` (F7-05). | `assets/stations/station-4/icons/icon-[nodo].svg` | `apps/web/src/assets/stations/station-4/icons/icon-[nodo].svg` | SVG optimizado | 15 KB por icono | sí — el diagrama interactivo los requiere | solo si el componente tiene fallback de texto sin icono | pendiente |
| Estación V — Estado actual | `station-5-hero-current` | Fotografía o composición visual del montaje real OKÚA. Planta conectada, sistema visible, espacio físico real. Es la única estación que puede usar foto real del lugar. | `assets/stations/station-5/hero-current-montage.webp` | `apps/web/src/assets/stations/station-5/hero-current-montage.webp` | WebP (fotografía) | 300 KB | sí — sin foto del montaje real, Estación V pierde su función | solo en piloto mínimo | pendiente |
| Cierre / Final | ninguno | Sin asset nuevo. Usar `lia-calm.png` existente. | no aplica | `apps/web/src/assets/lia/lia-calm.png` | PNG existente | no aplica | cubierto | no aplica | existente |

Nota para Estación I: F7-04 ya agregó `visual: { hero: { type: 'placeholder', ... }, tone: 'warm' }`.

Nota para Estación IV: `SignalFlowDiagram.tsx` fue implementado en F7-05.

## 5. Criterios de formato, peso y tamaño

- Preferir WebP para heroes finales por compresión y soporte actual.
- PNG solo si se necesita canal alfa complejo no comprimible en WebP.
- SVG para iconografía del diagrama de Estación IV.
- Peso máximo para hero de pantalla móvil: 300 KB.
- Peso máximo para ilustración técnica 2D: 250 KB.
- Peso máximo para línea de tiempo: 200 KB.
- Peso máximo para hero intro con Lía: 200 KB.
- Peso máximo para icono SVG individual: 15 KB.
- Dimensiones de referencia móvil: 390×260 px para heroes 16:9.
- No incluir audio en ningún asset.
- No incluir modelos 3D ni escenas AR.
- No incluir videos.

## 6. Estados de producción

Valores posibles para la columna Estado en la tabla de assets:

- `existente`: asset ya en el repo, usable en v1.
- `pendiente`: no existe todavía, debe producirse.
- `placeholder-ok`: el placeholder CSS cubre la función para piloto.
- `obligatorio-pendiente`: debe existir antes de v1 completa; sin él la pantalla no cumple su función narrativa.
- `aprobado`: producido y revisado, pendiente de integración.
- `integrado`: en `apps/web/src/assets/`, referenciado desde `apps/web/src/lib/content.ts`.

## 7. Reglas narrativas para assets

Estas reglas aplican a todos los assets. Ninguno puede violarlas:

1. No representar la planta como si produjera música directamente. Siempre mostrar la cadena de mediación cuando haya flechas de proceso.
2. No usar estética de magia o fantasía que contradiga la explicación técnica. El proyecto no es un truco: sus recursos visuales no deben parecerlo.
3. Mantener a Lía como acompañante, no como protagonista que tape el contenido. Lía nunca debe ser el único elemento visual de una estación técnica.
4. Evitar saturar todas las estaciones con la misma densidad visual. El recorrido debe tener respiración: estaciones más ligeras (I, III) y estaciones con mayor carga (II, IV).
5. Los iconos de Estación IV deben ser legibles en móvil a 32–48 px. Sin detalles decorativos que no aporten a la identificación del nodo.

## 8. Relación con tickets y fases

**F7 (subfase cerrada):**

- F7-04: extendió `VisualHero` con `type:'diagram'` y `diagramId?: string`. Corrigió `station-1.ts` con visual warm. ✓ Cerrado.
- F7-05: implementó `SignalFlowDiagram.tsx` con 8 nodos de cadena técnica. ✓ Cerrado.
- F7-07/08: estableció arquitectura de imports en `lib/content.ts`. ✓ Cerrado.

**F8 (fase activa):**

- F8-01: formaliza alcance de piloto y corrige inconsistencias pre-asset (este ticket).
- F8-02: integra asset real de Estación II.
- F8-03: integra asset real de Estación V.
- F8-04: aprueba copy y cierra placeholders del piloto.
- F8-05 (opcional): mejora iconografía SVG de Estación IV.

Referencia completa de reglas de integración: `docs/assets/gvo-f8-pilot-asset-scope.md`.
