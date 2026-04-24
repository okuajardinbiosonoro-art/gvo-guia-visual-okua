# GVO — Paquete mínimo de assets 2D v1

## 0. Propósito

Este documento convierte las decisiones de la matriz visual v1 (`docs/01-product/gvo-v1-experience-matrix.md`) en un inventario concreto de assets: qué se necesita, dónde vivirá, en qué formato, con qué peso máximo, cuál es obligatorio y cuál puede seguir como placeholder.

Alimenta directamente F7-04 (extensión de `StationHero` y rutas) y F7-05 (implementación de `SignalFlowDiagram.tsx` para Estación IV).

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

Decisión: `hero.src` en `VisualHero` es un string que Vite necesita poder resolver. La manera más simple y consistente con el patrón ya usado para los PNGs de Lía es mantener los assets aprobados en `apps/web/src/assets/stations/station-X/` e importarlos como módulos desde el archivo de contenido de la estación.

Flujo de un asset desde producción hasta integración:

1. El asset se produce y revisa en `assets/stations/station-X/` (staging).
2. Una vez aprobado, se copia a `apps/web/src/assets/stations/station-X/`.
3. El archivo `content/stations/station-X.ts` importa el asset como módulo y lo pasa como `hero.src`.

Ejemplo esperado para `station-2.ts` cuando tenga su hero real:

```ts
import heroChain from '../../apps/web/src/assets/stations/station-2/diagram-bioelectric-chain.webp';

// y en la propiedad visual:
visual: {
  hero: { type: 'image', src: heroChain, label: 'Cadena de mediación bioeléctrica' },
  tone: 'cool',
}
```

F7-04 deberá verificar que este patrón de import funciona con el alias `@content` ya configurado en `apps/web/vite.config.ts` y ajustar si hace falta.

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

Nota para Estación I: esta es la única estación sin `visual` declarado en `station-1.ts`. F7-04 debe agregar `visual: { hero: { type: 'placeholder', ... }, tone: 'warm' }`.

Nota para Estación IV: `SignalFlowDiagram.tsx` se implementa en F7-05, no aquí.

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
- `integrado`: en `apps/web/src/assets/`, referenciado en `content/*.ts`.

## 7. Reglas narrativas para assets

Estas reglas aplican a todos los assets. Ninguno puede violarlas:

1. No representar la planta como si produjera música directamente. Siempre mostrar la cadena de mediación cuando haya flechas de proceso.
2. No usar estética de magia o fantasía que contradiga la explicación técnica. El proyecto no es un truco: sus recursos visuales no deben parecerlo.
3. Mantener a Lía como acompañante, no como protagonista que tape el contenido. Lía nunca debe ser el único elemento visual de una estación técnica.
4. Evitar saturar todas las estaciones con la misma densidad visual. El recorrido debe tener respiración: estaciones más ligeras (I, III) y estaciones con mayor carga (II, IV).
5. Los iconos de Estación IV deben ser legibles en móvil a 32–48 px. Sin detalles decorativos que no aporten a la identificación del nodo.

## 8. Relación con próximos tickets

F7-04:

- Usará este documento para preparar las rutas de assets en `StationHero`.
- Extenderá `VisualHero` con `type: 'diagram'` y `diagramId?: string`.
- Corregirá `station-1.ts` para agregar la propiedad visual faltante.
- Verificará que el patrón de import de assets desde `content/*.ts` funciona con `apps/web/vite.config.ts` (alias `@content`).

F7-05:

- Usará los iconos SVG de Estación IV definidos aquí para construir `SignalFlowDiagram.tsx`.
- Implementará el diagrama interactivo tap-a-tap de la cadena técnica.

Ticket de integración de assets posterior a F7-05:

- Moverá assets aprobados desde `assets/stations/` (staging) a `apps/web/src/assets/stations/` (app) y actualizará `content/*.ts`.
- No es parte de F7-04 ni F7-05.
