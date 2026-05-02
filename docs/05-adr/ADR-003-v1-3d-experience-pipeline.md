# ADR-003: Habilitar pipeline 3D profesional para experiencia completa

- Estado: Aceptada
- Fecha: 2026-05-02

## Contexto

ADR-002 rechazo el 3D runtime en v1 porque, en ese momento, el pipeline 3D no estaba iniciado. Esa razon era correcta para el estado previo del repo.

La decision actual del responsable del proyecto cambia el marco: la experiencia GVO debe ser profesional e inmersiva antes de ir a campo. Eso incluye Lía Andina como guia 3D animada, experiencias interactivas por estacion y elementos visuales avanzados.

La biblia visual de Lía ya esta cerrada en `docs/avatars/lia-andina/lia-andina-spec.md`. El turnaround y los detalles de referencia ya existen en `docs/avatars/lia-andina/model-sheet/c1-full-turnaround.png` y `docs/avatars/lia-andina/details/`. Three.js puede bundlearse localmente con Vite sin depender de internet en campo.

El trabajo se realizara estacion por estacion: definir completamente, implementar, validar y luego pasar a la siguiente estacion.

## Opciones consideradas

1. Mantener el 3D fuera de v1 y seguir cerrando la experiencia solo con 2D.
   Rechazo: ya no responde a la decision del responsable de entregar una experiencia completa e inmersiva antes de campo.

2. Habilitar un pipeline 3D profesional, con Lía animada y elementos 3D por estacion.
   Aceptacion: alinea el producto con la nueva decision estrategica y permite construir una experiencia completa sin depender de internet en campo.

3. Intentar una solucion intermedia sin pipeline formal, con assets sueltos y sin contrato tecnico claro.
   Rechazo: deja demasiada ambiguedad, rompe la trazabilidad y complica la entrega por estaciones.

## Decisión

1. El pipeline 3D queda oficialmente habilitado.
2. ADR-002 queda superado en su punto 1 y en su punto 5: el 3D runtime ya no queda fuera de v1 por principio. Sus demas limites siguen vigentes: sin AR, sin scanner QR interno, sin multiavatar, y Estacion IV sigue siendo la unica interaccion avanzada hasta que el resto de las estaciones alcancen su nivel definido.
3. ADR-001 sigue intacto: Lía Andina es la guia unica.
4. El toolchain oficial sera:
   - ChatGPT image generation -> reference art 2D, mapas de textura conceptuales, concept art por estacion, hojas de expresiones y mood boards.
   - Blender -> modelado, retopologia, UV unwrap, texturizado PBR, rigging y animaciones.
   - Exportacion GLTF/GLB -> formato web estandar para los assets finales.
   - Three.js bundleado con Vite -> renderizado 3D en React sin CDN ni internet en campo.
   - CODEX/Claude Code -> integracion en el stack React + Vite existente.
5. Three.js quedara como dependencia de produccion en `apps/web`. Esta ADR habilita su uso arquitectonico; la instalacion y el primer commit de codigo se haran en el ticket de implementacion correspondiente, no en este ticket documental.
6. El trabajo se realizara estacion por estacion: definir completamente antes de implementar, implementar antes de pasar a la siguiente estacion.
7. No se ira a campo hasta que toda la experiencia este terminada y validada en laboratorio.

## Justificación

La experiencia GVO necesita una capa visual y espacial consistente con la ambicion del proyecto. La biblia visual de Lía ya existe y da base suficiente para pasar de referencia estandar a produccion 3D.

El 3D no sustituye la claridad operativa ya validada; la complementa. La cadena tecnica, la guia y los elementos por estacion pueden expresarse con mayor densidad sin depender de una experiencia plana.

Hacer el pipeline formal ahora evita decisiones improvisadas mas adelante. Tambien deja claro que el trabajo se hara por estaciones, con validacion intermedia, y no como un salto grande sin contrato tecnico.

## Consecuencias

### Positivas

- Experiencia mas inmersiva y profesional.
- Pipeline reutilizable para futuras versiones.
- Turnaround y biblia visual de Lía ya existen como insumo base.
- Metodologia por estaciones permite iteracion controlada.
- El bundle de produccion puede permanecer local y compatible con campo.

### Negativas

- Mayor tiempo de produccion.
- Requiere dominio de Blender o herramienta equivalente.
- El bundle de Vite crece y requiere estrategia de lazy loading.
- Se abre una linea de trabajo nueva que debe mantenerse disciplinada para no dispersar el proyecto.

### Mitigaciones

- Trabajo estacion por estacion con criterios de aceptacion por entregable.
- Lazy loading de modelos 3D para no bloquear la carga inicial.
- Los 4 PNGs de Lía siguen siendo fallback hasta que el modelo este listo.
- ChatGPT images acelera la produccion de reference art y hojas de expresion.

## Impacto documental

- `docs/00-master/metodologia-integral-gvo-v1.md` debe actualizarse para reconocer la nueva etapa 3D.
- `docs/00-master/gvo-3d-pipeline-contract.md` formaliza la metodologia tecnica de produccion 3D.
- `docs/01-product/gvo-v1-experience-matrix.md` seguira siendo la base de experiencia, pero los tickets futuros deberan ampliarla con las decisiones 3D por estacion.
- Las decisiones futuras de implementacion deberan referenciar este ADR.
