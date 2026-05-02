# GVO — Estación II: definición de experiencia 3D

## 1. Propósito pedagógico
Estación II enseña que la señal viva no es musica por si sola.
La experiencia debe mostrar mediacion real: señal viva -> captura -> acondicionamiento -> interpretacion -> resultado sonoro mediado.
El objetivo es que el visitante entienda la diferencia entre una señal biologica real y su traduccion tecnologica, sin recurrir a magia visual ni a una promesa falsa de causalidad directa.

## 2. Malentendido que corrige
Malentendido principal: "la planta hace musica por si sola".

Correccion: la señal es viva y real; el sistema la capta, la acondiciona, la interpreta y la traduce.
La escena 3D nunca debe mostrar causalidad directa planta -> sonido ni planta -> musica.

## 3. Qué ve el usuario
Composicion movil vertical con:
- Planta o fragmento vegetal en primer plano.
- Senal bioelectrica como linea o dato luminoso sutil.
- Bionosificador o modulo de captura como puente tecnico visible.
- Capas de mediacion revelables por tap.
- Lía como acompanante visual lateral, no dominante.
- Fondo sobrio, sin exceso de particulas ni metaforas magicas.

## 4. Interacción por capas
Interaccion tap-a-tap con 6 capas funcionales:
1. Planta viva.
2. Senal bioelectrica.
3. Captura por bionosificador.
4. Acondicionamiento de senal.
5. Interpretacion / mapeo.
6. Resultado sonoro mediado.

Reglas:
- Sin escritura.
- Sin audio.
- Sin rotacion libre obligatoria.
- No bloquear avance si el usuario no explora todas las capas.
- El fallback SVG debe seguir siendo comprensible en cualquier caso.

Nota sobre cadenas de nodos:
- Estacion II usa 6 capas funcionales desde la perspectiva del usuario.
- Estacion IV es la que muestra los 8 nodos tecnicos completos del sistema:
  planta -> bionosificador -> ESP32 -> MIDI -> Wi-Fi/UDP -> router -> sistema central -> sonido.
- No duplicar el diagrama de 8 nodos en Estacion II.

## 5. Qué hace Lía
Estado visual: curious.

Rol:
- Orienta el paso conceptual.
- No protagoniza la escena.
- No compite con la lectura tecnica del flujo.

Sugerencia visual:
- Tamaño en movil: 72-96 px si es PNG, o equivalente visual si llega a existir la version 3D.
- Posicion: lateral inferior derecho o junto al bloque explicativo, sin tapar CTA.
- Animacion futura: inclinacion leve, petalos abiertos, collar ambar sutil.
- Fallback actual: GuideAvatar PNG.

## 6. Copy guía de Lía
Copy base, no productivo todavia:

> Esta senal existe, pero todavia no es musica. Primero debe ser captada, ordenada e interpretada. Lo importante esta en la mediacion: una senal viva pasa por tecnologia antes de convertirse en experiencia sonora.

Reglas del copy:
- No usar: "la planta canta", "la planta compone", "la planta habla".
- No prometer medicion cientifica mas precisa de lo que el sistema realiza.

## 7. Elementos 3D requeridos
Elementos candidatos:
- Planta simplificada, low-poly o mid-poly.
- Senal bioelectrica como dato visual abstracto.
- Modulo bionosificador/captura como puente.
- Lineas o flujo de capas hacia procesamiento.
- Fondos y materiales sobrios.
- Lía 3D opcional cuando exista su GLB.

No se requiere ESP32 visible en Estacion II; eso pertenece a Estacion IV.
No se requiere reconstruccion hiperrealista.

## 8. Qué produce ChatGPT Images
ChatGPT Images produce concept art y reference art para:
- vistas adicionales;
- hojas de expresiones;
- composiciones de escena;
- referencias de capas;
- ambientacion y paleta.

Los prompts concretos van en `assets/stations/station-2/concept-prompts.md`.

## 9. Qué produce Blender
Salida esperada para Blender:
- Archivo `station-2-bioelectric-mediation.glb`.
- Geometria low-poly o mid-poly.
- Materiales PBR simples.
- Animacion opcional de pulso de senal.
- Animacion opcional de revelado de capas, horneada si es posible.
- Export GLB optimizado.
- Validacion en iPhone SE de segunda generacion.

## 10. Qué implementa CODEX en ticket posterior
Implementacion futura prevista:
- Componente `Station2BioelectricScene.tsx`.
- Carga lazy del GLB.
- `ThreeSceneShell` interno.
- `Station3DHost` como wrapper opcional.
- Fallback SVG actual.
- Manejo de error WebGL y `prefers-reduced-motion`.
- Validaciones `typecheck`, `build`, `smoke`.

Este trabajo no se hace en este ticket.

## 11. Fallback
Fallback oficial actual:
- `apps/web/src/assets/stations/station-2/diagram-bioelectric-chain.svg`

Si falla WebGL, GLB, Three.js o `prefers-reduced-motion`, se muestra el SVG.
La experiencia debe seguir siendo comprensible sin 3D.

## 12. Criterios de aprobación antes de implementar React
- [ ] La escena no sugiere planta -> musica directa.
- [ ] La mediacion tecnologica es visible.
- [ ] El flujo de 6 capas se entiende en movil.
- [ ] No requiere audio, internet, AR ni scanner QR interno.
- [ ] No compite con la funcion de Estacion IV.
- [ ] El GLB proyectado cumple limites de peso (< 3 MB, objetivo < 1.5 MB).
- [ ] Existe fallback SVG.
- [ ] El responsable aprueba concept art antes de Blender.
- [ ] El responsable aprueba GLB antes de React.
