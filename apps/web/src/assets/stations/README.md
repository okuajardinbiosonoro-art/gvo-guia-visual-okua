# Assets integrados de estaciones — GVO v1

## Propósito

Esta carpeta contiene assets visuales aprobados y listos para runtime.
No es el directorio de staging editorial (ese es `assets/stations/` en la raíz).

## Arquitectura de integración

Los imports binarios de assets ocurren en `apps/web/src/`, no en `content/`.
El flujo correcto es:

```text
1. Producir y revisar en:     assets/stations/station-X/
2. Aprobar visualmente.
3. Optimizar y copiar a:      apps/web/src/assets/stations/station-X/
4. Importar en:               apps/web/src/lib/content.ts
   (no en content/stations/station-X.ts)
5. Pasar como hero.src al     contenido correspondiente.
```

Ejemplo de cómo queda `lib/content.ts` cuando hay assets reales:

```ts
// En apps/web/src/lib/content.ts:
import heroStation2 from '../assets/stations/station-2/diagram-bioelectric-chain.svg';
import heroStation5 from '../assets/stations/station-5/hero-current-montage.webp';

const stationHeroSrc: Partial<Record<number, string>> = {
  2: heroStation2, // station-2 ✓ F8-02
  5: heroStation5, // station-5 ✓ F8-03
};
```

Los archivos `content/stations/station-X.ts` NO importan binarios.
Solo declaran el contenido narrativo. La resolución de assets es responsabilidad
de `lib/content.ts` dentro del scope de `apps/web/src/`.

## Límites por asset (del asset pack v1)

| Tipo | Peso máximo |
|---|---|
| Hero de pantalla móvil | 300 KB |
| Ilustración técnica 2D | 250 KB |
| Línea de tiempo | 200 KB |
| Hero de intro con Lía | 200 KB |
| Icono SVG individual | 15 KB |

## Formatos

- WebP para fotografías y heroes de pantalla.
- PNG solo si se necesita canal alfa no comprimible en WebP.
- SVG para ilustraciones técnicas 2D y diagramas como Estación II.
- SVG para iconografía del diagrama de Estación IV.

## Reglas narrativas

Ningún asset puede sugerir causalidad directa planta → música.
La mediación tecnológica debe ser visible cuando se represente la cadena.
Ver `docs/05-adr/ADR-002-v1-visual-scope-3d-ar-scanner.md` y
`docs/01-product/gvo-v1-experience-matrix.md`.
