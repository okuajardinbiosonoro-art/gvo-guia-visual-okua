# GVO — Estación II: definición de experiencia 3D

## 1. Propósito pedagógico
Estación II enseña que la señal viva no es música por sí sola.
La experiencia debe mostrar mediación real: señal viva -> captura -> acondicionamiento -> interpretación -> resultado sonoro mediado.
El objetivo es que el visitante entienda la diferencia entre una señal biológica real y su traducción tecnológica, sin recurrir a magia visual ni a una promesa falsa de causalidad directa.

## 2. Malentendido que corrige
Malentendido principal: "la planta hace música por sí sola".

Corrección: la señal es viva y real; el sistema la capta, la acondiciona, la interpreta y la traduce.
La escena 3D nunca debe mostrar causalidad directa planta -> sonido ni planta -> música.

## 3. Qué ve el usuario
Composición móvil vertical con:
- Planta o fragmento vegetal en primer plano.
- Señal bioeléctrica como línea o dato luminoso sutil.
- Bionosificador o módulo de captura como puente técnico visible.
- Capas de mediación revelables por tap.
- Lía como acompañante visual lateral, no dominante.
- Fondo sobrio, sin exceso de partículas ni metáforas mágicas.

## 4. Interacción por capas
Interacción tap-a-tap con 6 capas funcionales:
1. Planta viva.
2. Señal bioeléctrica.
3. Captura por bionosificador.
4. Acondicionamiento de señal.
5. Interpretación / mapeo.
6. Resultado sonoro mediado.

Reglas:
- Sin escritura.
- Sin audio.
- Sin rotación libre obligatoria.
- No bloquear avance si el usuario no explora todas las capas.
- El fallback SVG debe seguir siendo comprensible en cualquier caso.

Nota sobre cadenas de nodos:
- Estación II usa 6 capas funcionales desde la perspectiva del usuario.
- Estación IV es la que muestra los 8 nodos técnicos completos del sistema:
  planta -> bionosificador -> ESP32 -> MIDI -> Wi-Fi/UDP -> router -> sistema central -> sonido.
- No duplicar el diagrama de 8 nodos en Estación II.

## 5. Qué hace Lía
Estado visual: curious.

Rol:
- Orienta el paso conceptual.
- No protagoniza la escena.
- No compite con la lectura técnica del flujo.

Sugerencia visual:
- Tamaño en móvil: 72-96 px si es PNG, o equivalente visual si llega a existir la versión 3D.
- Posición: lateral inferior derecho o junto al bloque explicativo, sin tapar CTA.
- Animación futura: inclinación leve, pétalos abiertos, collar ámbar sutil.
- Fallback actual: GuideAvatar PNG.

## 6. Copy guía de Lía
Copy base, no productivo todavía:

> Esta señal existe, pero todavía no es música. Primero debe ser captada, ordenada e interpretada. Lo importante está en la mediación: una señal viva pasa por tecnología antes de convertirse en experiencia sonora.

Reglas del copy:
- No usar: "la planta canta", "la planta compone", "la planta habla".
- No prometer medición científica más precisa de lo que el sistema realiza.

## 7. Elementos 3D requeridos
Elementos candidatos:
- Planta simplificada, low-poly o mid-poly.
- Señal bioeléctrica como dato visual abstracto.
- Módulo bionosificador/captura como puente.
- Líneas o flujo de capas hacia procesamiento.
- Fondos y materiales sobrios.
- Lía 3D opcional cuando exista su GLB.

No se requiere ESP32 visible en Estación II; eso pertenece a Estación IV.
No se requiere reconstrucción hiperrealista.

## 8. Qué produce ChatGPT Images
ChatGPT Images produce concept art y reference art para:
- vistas adicionales;
- hojas de expresiones;
- composiciones de escena;
- referencias de capas;
- ambientación y paleta.

Los prompts concretos van en `assets/stations/station-2/concept-prompts.md`.

## 9. Qué produce Blender
Salida esperada para Blender:
- Archivo `station-2-bioelectric-mediation.glb`.
- Geometría low-poly o mid-poly.
- Materiales PBR simples.
- Animación opcional de pulso de señal.
- Animación opcional de revelado de capas, horneada si es posible.
- Export GLB optimizado.
- Validación en iPhone SE de segunda generación.

## 10. Qué implementa CODEX en ticket posterior
Implementación futura prevista:
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
- [ ] La escena no sugiere planta -> música directa.
- [ ] La mediación tecnológica es visible.
- [ ] El flujo de 6 capas se entiende en móvil.
- [ ] No requiere audio, internet, AR ni scanner QR interno.
- [ ] No compite con la función de Estación IV.
- [ ] El GLB proyectado cumple límites de peso (< 3 MB, objetivo < 1.5 MB).
- [ ] Existe fallback SVG.
- [ ] El responsable aprueba concept art antes de Blender.
- [ ] El responsable aprueba GLB antes de React.
