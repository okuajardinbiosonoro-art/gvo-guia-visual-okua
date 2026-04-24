# ADR-002: Alcance visual v1 - experiencia 2D móvil, QR por URL y diagrama interactivo puntual

- Estado: Aceptada
- Fecha: 2026-04-23

## Contexto

GVO ya tiene una base operativa local suficiente para piloto: sesiones temporales, recorrido secuencial, cierre, revisita libre, QR por URL/ruta, hardening base, autostart Windows, generación de QR, release candidate de campo y kit de validación de laboratorio.

El flujo vigente de campo no depende de escaneo interno con cámara: la entrada y el acceso a estaciones siguen resueltos por QR de URL/ruta. Eso ya funciona y debe mantenerse como contrato oficial de operación para v1.

El sistema visual actual también marca límites claros. `packages/shared/src/content.ts` define `VisualHero` solo con `type: 'placeholder' | 'image'`; `apps/web/src/components/StationHero.tsx` solo sabe renderizar esos dos casos. Cualquier interacción nueva requiere extensión de contrato y componente explícito, no suposición tácita.

La matriz de experiencia v1 cerrada en `docs/01-product/gvo-v1-experience-matrix.md` ya decide qué entra y qué no entra por estación. Esa matriz formaliza que v1 será 2D móvil, con una única pieza interactiva avanzada en Estación IV.

La visión original del proyecto contemplaba una capa más ambiciosa de personalización visual, 3D y AR. Esa visión sigue siendo válida como horizonte, pero no obliga a incluir esos elementos en v1 si todavía no existe una fuente de verdad técnica y de producto suficientemente cerrada.

Lía Andina sigue siendo la guía única vigente por ADR-001. Su pipeline 3D no está iniciado: no hay malla base, rig ni animación runtime listos para entrar en esta versión.

## Opciones consideradas

1. Incluir AR en v1.
   Rechazo: no existe una fuente de verdad técnica cerrada, no hay prueba suficiente en dispositivos objetivo y no hay necesidad operativa demostrada para el piloto. Añadir AR aumentaría riesgo de campo sin mejorar de forma clara la comprensión del visitante.

2. Incluir scanner QR interno con cámara en v1.
   Rechazo: el flujo por URL ya resuelve la operación. Un scanner interno introduce permisos de cámara, compatibilidad móvil y fricción de activación sin una ganancia demostrada para v1.

3. Incluir Lía 3D runtime en v1.
   Rechazo: el pipeline 3D no está iniciado. No existe malla base, rig ni animación idle suficientes para una entrega responsable en esta fase.

4. Hacer 3D o diagrama interactivo avanzado en varias estaciones.
   Rechazo: diluye esfuerzo, aumenta la incoherencia visual y complica el mantenimiento. Solo Estación IV justifica una pieza interactiva avanzada por densidad técnica de su contenido.

5. Mantener todo como placeholder en v1.
   Rechazo parcial: puede servir para un piloto mínimo, pero no alcanza para una experiencia visualmente creíble que complemente el espacio físico y haga visible la cadena técnica del recorrido.

## Decisión

1. v1 será una experiencia 2D móvil. No hay 3D runtime en v1.
2. QR por URL/ruta se mantiene como flujo oficial de campo en v1.
3. Scanner QR interno con cámara queda fuera de v1.
4. AR queda fuera de v1.
5. 3D runtime de Lía queda fuera de v1.
6. Multiavatar no se reabre. ADR-001 sigue vigente.
7. Estación IV sí tendrá un diagrama interactivo 2D como único elemento visual avanzado de v1. Debe representar la cadena: planta → bionosificador → ESP32 → MIDI → Wi-Fi/UDP → router → sistema central → sonido.
8. Para implementarlo, F7-04 deberá extender `VisualHero` en `packages/shared/src/content.ts` con `type: 'placeholder' | 'image' | 'diagram'` y `diagramId?: string`; `StationHero.tsx` deberá manejar el nuevo caso. El contrato exacto ya está documentado en `docs/01-product/gvo-v1-experience-matrix.md`, sección 4.B.
9. F7-05 implementará `SignalFlowDiagram.tsx` para Estación IV.
10. Ningún material de piloto debe prometer AR, scanner interno ni Lía 3D.

## Justificación

El flujo QR por URL ya funciona en campo y sostiene la operación local sin introducir permisos de cámara ni fallos de compatibilidad adicionales. Cambiarlo por un scanner interno aportaría riesgo sin un beneficio operativo comprobado.

La comprensión del visitante mejora más con una visualización técnica fuerte en Estación IV que con una promesa general de AR o 3D en varias estaciones. Concentrar la interacción avanzada en una sola estación hace visible la cadena de mediación y evita dispersar el esfuerzo.

Mantener v1 en 2D permite cerrar el producto con los recursos ya disponibles y dejar 3D/AR como horizonte documentado para una versión posterior.

La extensión de `VisualHero` con `type: 'diagram'` y `diagramId?: string` es mínima, reversible y no rompe el contrato actual de estaciones.

## Consecuencias

### Positivas

- Menor riesgo de compatibilidad móvil en campo.
- Menor carga de mantenimiento y producción.
- Assets livianos, sin modelos 3D ni experiencias AR.
- F7-03 puede concentrarse en assets 2D concretos.
- F7-04 extiende contratos visuales de forma controlada.
- F7-05 tiene un objetivo único y verificable.
- Cierre de v1 con recursos disponibles.

### Negativas

- v1 no tendrá la experiencia inmersiva más avanzada imaginada originalmente.
- Si el piloto demuestra necesidad de mayor interacción, habrá que actualizar el alcance en v2+.

### Mitigaciones

- Documentar explícitamente en los materiales de piloto que la experiencia visual avanzada sigue en evolución para v2+.
- Concentrar la ambición visual en Estación IV para que el recorrido tenga al menos una pieza visual fuerte y bien definida.

## Impacto documental

- `docs/01-product/product-scope.md` debe reflejar experiencia visual 2D y excluir AR/3D/scanner.
- `docs/01-product/gvo-v1-experience-matrix.md` ya contiene el detalle visual por estación. Este ADR formaliza esa decisión a nivel de producto.
- Los tickets F7-03, F7-04 y F7-05 deben referenciar este ADR.
- Ningún documento del proyecto debe contradecir estas decisiones hasta que exista justificación explícita para reabrirlas.

## Criterios para reabrir esta decisión

Esta decisión solo puede reabrirse si se cumple al menos una de estas condiciones, documentada con evidencia concreta:

- El piloto real demuestra que el flujo QR por URL genera fricción operativa seria e irresuelta por otras vías.
- Existe un pipeline 3D completo de Lía Andina (malla, rig, animaciones) validado en los dispositivos móviles del entorno de campo.
- Existe una prueba AR estable, probada en los dispositivos objetivo y con un plan de mantenimiento viable para el responsable único del proyecto.
- El diagrama 2D de Estación IV resulta insuficiente para que el visitante comprenda la cadena técnica, con evidencia de usuario real.
- Hay tiempo y capacidad real para ampliar el alcance v1 sin comprometer la estabilidad operativa del piloto.

Cualquier reapertura debe formalizarse en un ADR posterior que referencie este documento y que documente qué condición se cumplió y con qué evidencia.
