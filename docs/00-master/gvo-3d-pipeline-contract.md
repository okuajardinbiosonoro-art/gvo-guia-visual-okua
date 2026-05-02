# GVO — Contrato de pipeline 3D y experiencia interactiva

## 1. Propósito

Este documento fija el contrato tecnico y metodologico para producir la capa 3D de GVO: Lía Andina animada, elementos 3D por estacion y experiencias interactivas completas antes del empaquetado final.

No instala dependencias ni crea assets por si mismo. Define el flujo, la herramienta adecuada para cada etapa y los criterios de calidad que deben cumplirse antes de considerar un entregable como listo.

## 2. Toolchain oficial

- ChatGPT image generation: reference art 2D, mapas de textura conceptuales, concept art por estacion, hojas de expresiones, variaciones de estado y mood boards.
- Blender: modelado, retopologia, UV unwrap, texturizado PBR, rigging de Lía y animaciones base.
- GLTF/GLB: formato de exportacion estandar para web; `glb` sera el formato binario de produccion.
- Three.js: render 3D en React; se bundlea con Vite en `apps/web` y no depende de CDN ni internet en campo.
- CODEX/Claude Code: integracion en el stack React + Vite, componentes, estado, carga diferida y conexion con el recorrido.

ChatGPT image generation no genera modelos 3D rigged ni archivos GLB directamente. Su papel es acelerar la fase de referencia y direction art.

## 3. Pipeline de Lía Andina 3D

Insumos disponibles:

- `docs/avatars/lia-andina/model-sheet/c1-full-turnaround.png`
- `docs/avatars/lia-andina/details/` (`b1` a `b4`)
- `docs/avatars/lia-andina/lia-andina-spec.md`

Etapas de produccion:

1. ChatGPT images: generar vistas adicionales si hacen falta, por ejemplo 3/4 trasero, detalles de collar, expresiones y hojas de estados.
2. Blender: modelar cuerpo-bulbo, cinco petalos con roles fijos, cabeza-cristal, collar ambar y estela de particulas.
3. Retopologia y UV unwrap.
4. Texturizado PBR segun la paleta de la spec.
5. Rig minimo para animaciones idle y transiciones entre estados.
6. Animaciones base: idle float, curious lean, calm breath, intro arrive y transiciones cortas.
7. Export GLTF/GLB con animaciones embebidas.
8. Validacion en Three.js en movil real.

## 4. Pipeline de elementos 3D por estacion

Cada estacion tendra su propio elemento 3D educativo o interactivo.

Ese elemento no se define aqui en detalle creativo. Este contrato solo fija que cada estacion debera resolver su propio asset o escena 3D con criterio narrativo y tecnico propio, sin reciclar la misma pieza de una estacion a otra.

La definicion exacta de cada estacion se hara en el planning de su ticket correspondiente.

## 5. Flujo de produccion por estacion

Para cada estacion se seguira este ciclo:

1. Definir en el nuevo chat que ve el usuario, que hace Lía, que elemento 3D existe, que interaccion ocurre y que dice el copy.
2. Generar concept art y reference art de la estacion con ChatGPT images.
3. Modelar el elemento 3D de la estacion en Blender.
4. Implementar el componente React + Three.js.
5. Integrar con el flujo de contenido existente usando CODEX/Claude Code.
6. Validar en movil real antes de pasar a la siguiente estacion.

## 6. Formatos y especificaciones tecnicas

- Modelos finales: `.glb`.
- Texturas: WebP o PNG, segun transparencia y necesidad editorial.
- Resolucion maxima de texturas: 1024 x 1024 para mobile.
- Animaciones: embebidas en el GLB.
- Peso total por estacion: menos de 3 MB.
- Objetivo recomendado por estacion: menos de 1.5 MB.
- Peso objetivo del modelo completo de Lía: menos de 2 MB.
- Objetivo ideal del modelo completo con compresion: menos de 1 MB.
- Compresion opcional: `gltf-transform` o `gltfpack` si hace falta reducir peso.

## 7. Integración en React + Vite (Three.js)

- Instalacion prevista en `apps/web`: `three` y `@types/three`.
- La carga de escenas 3D sera diferida por estacion con imports dinamicos.
- La carga inicial del recorrido no debe bloquearse por el 3D.
- Se puede implementar con `useEffect` + canvas Three.js o con `@react-three/fiber` si el equipo decide adoptar una API declarativa en el primer ticket de implementacion.
- No se usarán WebWorkers ni SharedArrayBuffer en v1 por compatibilidad movil.

Three.js quedara bundleado con Vite. No se dependera de internet ni de CDN externo en campo.

## 8. Reglas de rendimiento móvil

- Dispositivo objetivo de validacion: iPhone SE de segunda generacion + Chrome.
- Objetivo minimo: 30 fps estables en escenas simples.
- La UI no debe bloquearse mientras carga el 3D.
- El recorrido debe usar progressive enhancement: primero placeholder o imagen, luego 3D si carga correctamente.
- Si `prefers-reduced-motion` esta activo, las animaciones de Lía deben reducirse o suspenderse.
- No usar postproceso pesado. Si hay bloom, debe ser minimo y limitado a detalles muy puntuales.

## 9. Reglas narrativas — linea roja conceptual

- Las plantas no hacen musica por si solas.
- La cadena tecnica de 8 nodos debe ser visible cuando se represente el proceso: planta → bionosificador → ESP32 → MIDI → Wi-Fi/UDP → router → sistema central → sonido.
- Ningun elemento 3D puede sugerir magia o autonomia vegetal musical.
- Lía no habla, no emite audio y no tiene sincronizacion de labios.
- La presencia de Lía debe ser acompanante, no protagonista dominante.

## 10. Fallback y progressive enhancement

- Si Three.js no carga, se debe mostrar la imagen estatica o el hero 2D equivalente.
- Los 4 PNGs de Lía siguen disponibles como fallback.
- La experiencia debe seguir funcionando sin 3D aunque se degrade visualmente.
- Un fallo de 3D no puede bloquear la navegacion del recorrido.

## 11. Criterio de aceptación por entregable 3D

Un entregable 3D se considera apto cuando:

- pesa menos del limite definido;
- carga en menos de 3 segundos en 4G simulado;
- mantiene 30 fps en iPhone SE de segunda generacion + Chrome;
- no genera errores de consola en movil;
- respeta `prefers-reduced-motion`;
- no viola la linea roja narrativa;
- recibe aprobacion visual del responsable.

## 12. Lo que no entra en este pipeline

- AR.
- Scanner QR interno.
- Audio sincronizado con Lía.
- Multiplayer o interaccion entre visitantes.
- Conexion a internet para cargar modelos.
- Assets 3D servidos desde CDN externo.

Este contrato solo cubre la produccion 3D local y bundleneada. No cubre mecanismos experimentales que no esten explicitamente aprobados por ADR posterior.
