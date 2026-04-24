# GVO — Alcance de assets para piloto F8

## 1. Propósito

Este documento es el contrato de Fase 8 para producción e integración de assets 2D. Define qué debe existir antes de declarar v1 completa, qué puede seguir como placeholder en el primer piloto de campo y bajo qué reglas se produce e integra cada asset.

Complementa `gvo-v1-asset-pack.md` (especificaciones técnicas) y `gvo-v1-experience-matrix.md` (decisiones visuales por estación).

## 2. Assets obligatorios para v1 completa

| Pantalla | Asset ID | Descripción breve | Por qué obligatorio |
|---|---|---|---|
| Estación II | `station-2-diagram-chain` | Ilustración 2D de cadena bioeléctrica: planta, señal, captura, acondicionamiento, mapeo y resultado musical mediado. | Sin esto la pantalla más crítica para la línea roja narrativa sigue con placeholder. |
| Estación V | `station-5-hero-current` | Fotografía del montaje real OKÚA: plantas conectadas, sistema visible y espacio físico reconocible. | Sin esto la estación de cierre no aterriza en el espacio físico real. |

Intro, Estación I y Estación III no están en esta lista. Sus assets son deseables, pero no bloqueantes para v1 completa si existe una decisión explícita de alcance.

## 3. Assets aceptables como placeholder en piloto mínimo

| Pantalla | Placeholder aceptable | Condición |
|---|---|---|
| Intro | Sí | El visual de bienvenida no es narrativamente crítico para el primer piloto. |
| Estación I | Sí | Su función motivacional queda cubierta por el placeholder warm. |
| Estación II | Sí, solo piloto mínimo | No es aceptable para v1 completa. |
| Estación III | Sí | Su función histórica puede sostenerse con placeholder. |
| Estación IV | Sí para iconografía SVG | `SignalFlowDiagram` ya funciona; los SVG de iconos son mejora opcional. |
| Estación V | Sí, solo piloto mínimo | No es aceptable para v1 completa. |

Los placeholders de piloto no son deuda accidental. Son una decisión explícita de alcance. Esta tabla es la fuente de verdad para esa decisión.

## 4. Criterios de aprobación visual

- Aprobación: unipersonal, responsable principal del proyecto.
- Verificación técnica: weight check según `gvo-v1-asset-pack.md`, legibilidad en móvil 390px y sin errores de consola al integrar.
- Verificación narrativa: ningún asset puede sugerir que la planta produce música directamente. La mediación tecnológica debe ser visible si hay flechas de proceso.
- Flujo: el asset debe pasar por staging editorial antes de ir a runtime.

## 5. Ruta de integración: staging → runtime

1. Producir en `assets/stations/station-X/` (staging editorial).
2. Revisar criterios de aprobación de la sección 4.
3. Copiar a `apps/web/src/assets/stations/station-X/`.
4. Importar en `apps/web/src/lib/content.ts` como módulo ES.
5. Asignar al mapa `stationHeroSrc[id]` o a `introHeroSrc`.
6. Actualizar `content/stations/station-X.ts`: cambiar `hero.type` de `'placeholder'` a `'image'`. Solo ese campo. Sin imports binarios.
7. Ejecutar `npm run typecheck` y `npm run build`.
8. Hacer prueba visual móvil antes de commitear.

## 6. Reglas de arquitectura de imports

Regla no negociable: los imports binarios viven en `apps/web/src/lib/content.ts`, no en `content/stations/*.ts`.

CORRECTO — importar binarios en `apps/web/src/lib/content.ts`:

```ts
import heroStation2 from '../assets/stations/station-2/diagram-bioelectric-chain.webp';

const stationHeroSrc: Partial<Record<number, string>> = {
  2: heroStation2,
};
```

INCORRECTO — importar binarios en `content/stations/station-X.ts`:

```ts
// NUNCA hacer esto:
// import heroChain from '../../apps/web/src/assets/stations/station-2/...';
```

Motivo: `content/stations/*.ts` son fuentes narrativas puras. Los imports binarios van solo en `apps/web/src/lib/content.ts`. Esta decisión está documentada en `apps/web/src/vite-env.d.ts` y en `apps/web/src/assets/stations/README.md`.

## 7. Regla narrativa para todos los assets

Ningún asset puede sugerir causalidad directa planta → música.

Si hay flechas de proceso, deben mostrar la cadena de mediación completa:

```text
planta → bionosificador → ESP32 → MIDI → Wi-Fi/UDP → router → sistema central → sonido
```

No simplificar la cadena de forma que la señal parezca llegar al sonido sin pasar por la mediación técnica.
