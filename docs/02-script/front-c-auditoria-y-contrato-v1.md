# Frente C — Auditoría editorial y contrato narrativo maestro v1

## 0. Propósito del documento
Este documento fija la base editorial oficial para la próxima fase de reescritura del copy de Intro + Estaciones I–V. Su función es cerrar criterios de diagnóstico y contrato narrativo para evitar reabrir decisiones ya tomadas y facilitar validación unipersonal rápida.

## 1. Estado de partida del contenido actual
El repositorio ya contiene contenido semilla operativo en `content/stations/intro.ts` y `content/stations/station-1.ts` a `station-5.ts`.
Aún no existe un guion final aprobado por estación para el flujo `borrador → revisión → aprobada`.
Este frente no reescribe copy productivo; deja trazable la base editorial que gobernará esa reescritura.

## 2. Auditoría editorial del contenido actual por estación

### Intro
#### Qué ya funciona
- Presenta con claridad que OKÚA es mediación tecnológica de señales bioeléctricas y no "plantas haciendo música".
- Declara la estructura del recorrido en cinco estaciones y la regla de secuencia en primera pasada.
- Mantiene tono sobrio y breve, compatible con una introducción funcional.

#### Qué está débil o genérico
- Predomina voz institucional/descriptiva; todavía no se percibe una voz guía en primera persona de Lía.
- La recapitulación del rol del guía presencial no aparece de forma funcional explícita.
- El bloque de capas del proceso es correcto, pero no anticipa con suficiente precisión la progresión técnica esperada por estación.

#### Qué riesgo conceptual o narrativo existe
- Riesgo de que el visitante lo lea como texto de cartel informativo y no como arranque de experiencia guiada.
- Riesgo de dependencia implícita de una mediación oral previa si no se agrega micro-recap autosuficiente.

#### Qué deberá resolverse en la futura reescritura
- Introducir voz de Lía en primera persona con tono acogedor/curioso sin perder sobriedad.
- Añadir micro-recap funcional: el guía presencial abre, la app retoma/ordena/profundiza sin asumir explicación perfecta.
- Marcar explícitamente que la capa técnica crecerá progresivamente y no toda de una vez.

### Estación I
#### Qué ya funciona
- El propósito está bien definido: origen del proyecto y pregunta inicial concreta.
- Corrige bien la antropomorfización: señala que no se "hace hablar" a las plantas.
- Introduce la idea de traducción fiel sin inventar datos.

#### Qué está débil o genérico
- Mantiene tono todavía expositivo y poco diferenciado de Intro.
- No delimita con suficiente fuerza qué parte técnica queda para la Estación II.
- Le falta una transición más orientadora hacia el siguiente escalón de comprensión.

#### Qué riesgo conceptual o narrativo existe
- Riesgo de redundancia con Intro y con II si no se separa mejor "propósito" vs "medición".
- Riesgo de sonar declarativo sin anclar cómo se percibirá el paso a la siguiente estación.

#### Qué deberá resolverse en la futura reescritura
- Reforzar función de estación de origen/sentido, no de explicación técnica profunda.
- Calibrar voz de Lía sensible/orientadora con instrucciones breves de continuidad.
- Cerrar con transición clara hacia "qué señal se mide" en II.

### Estación II
#### Qué ya funciona
- Explica bien la base bioeléctrica y que la señal es débil/irregular/no musical por defecto.
- Introduce mediación técnica (captura, amplificación, procesamiento) sin prometer magia.
- Conserva el eje de credibilidad: mediación real sin invención.

#### Qué está débil o genérico
- La explicación es correcta pero densa para lectura móvil rápida en una sola pasada.
- Falta mayor orientación pedagógica sobre qué debe entenderse como logro de esta estación.
- No deja del todo explícito el límite entre explicación de fundamento (II) e historia técnica-evolutiva (III).

#### Qué riesgo conceptual o narrativo existe
- Riesgo de sobrecarga temprana si no se ajusta densidad textual y ritmo de lectura.
- Riesgo de interpretar "fiel" como "idéntico" si no se simplifica mejor esa distinción.

#### Qué deberá resolverse en la futura reescritura
- Mantener claridad pedagógica con bloques más respirables para móvil.
- Hacer explícito el malentendido que corrige: señal viva real no equivale a música preexistente.
- Preparar transición a III como historia de decisiones técnicas reales ante fallas.

### Estación III
#### Qué ya funciona
- Instala valor narrativo de la iteración y del aprendizaje por error.
- Menciona problemas técnicos concretos (ruido, pérdida de señal, deriva, latencia).
- Refuerza credibilidad al priorizar evidencia de ajuste sobre idealización.

#### Qué está débil o genérico
- No explicita hechos ya aprobados: prototipos iniciales cableados/seriales y paso a arquitectura inalámbrica.
- No visibiliza con suficiente peso los cambios por estabilidad de lectura y por ruido/interferencia.
- No integra todavía, como elemento visible, los cambios físicos del montaje motivados por razones técnicas.

#### Qué riesgo conceptual o narrativo existe
- Riesgo de quedar en relato abstracto de "aprendizaje" sin anclaje técnico-histórico verificable.
- Riesgo de diluir la verdad técnica media-alta esperada para esta estación.

#### Qué deberá resolverse en la futura reescritura
- Incorporar en forma resumida y concreta: cableado/serial inicial, transición inalámbrica, ajustes por estabilidad, ruido/interferencia.
- Dar mayor visibilidad a cambios físicos del montaje por razones técnicas.
- Evitar convertir "escalabilidad del cableado" en tema autónomo.

### Estación IV
#### Qué ya funciona
- Presenta una cadena funcional de operación (adquisición, procesamiento, síntesis) y principio determinista.
- Desactiva falsas expectativas de IA/ML, reforzando relación directa señal-respuesta.
- Mantiene foco en comprensión del sistema, no en espectacularidad.

#### Qué está débil o genérico
- No nombra aún, con jerarquía explícita, términos aprobados clave: bionosificador, microcontrolador (ESP32), MIDI.
- Los componentes secundarios de la cadena técnica aparecen de forma general y no como mapa operativo resumido.
- Falta equilibrio entre precisión técnica y lectura amigable para visitante no técnico.

#### Qué riesgo conceptual o narrativo existe
- Riesgo de "operación técnica" demasiado abstracta para sostener verdad técnica alta.
- Riesgo de abrir puertas a jergas de operación interna si no se fija frontera editorial explícita.

#### Qué deberá resolverse en la futura reescritura
- Dar peso principal a bionosificador + ESP32 + MIDI.
- Integrar, en segundo plano y sin sobrecargar, electrodos, filtrado, amplificación, Wi-Fi, router, UDP, software central y salida sonora/parlantes.
- Excluir detalles de operación interna del equipo, configuración de red, backend del recorrido, debug/monitoreo/despliegue.

### Estación V
#### Qué ya funciona
- Comunica estado real de funcionamiento y continuidad del proyecto.
- Cierra el recorrido sin clausurar el proceso de desarrollo.
- Conserva coherencia con la idea de instalación activa en condiciones reales.

#### Qué está débil o genérico
- Parte del cierre se acerca a roadmap operativo (hardware/visualización/documentación) más que a integración narrativa del visitante.
- La voz no está todavía claramente en primera persona de Lía con tono sereno/integrador.
- Puede mejorar el puente entre comprensión lograda y salida del recorrido.

#### Qué riesgo conceptual o narrativo existe
- Riesgo de terminar en clave de "pendientes técnicos" en lugar de cierre de sentido.
- Riesgo de perder cohesión con el hilo narrativo previo si no se sintetiza qué se entendió en el recorrido.

#### Qué deberá resolverse en la futura reescritura
- Recentrar el cierre en integración de comprensión visitante (señal viva + mediación técnica + estado real).
- Ajustar voz de Lía a registro sereno/integrador.
- Mantener referencias de evolución futura sin que dominen el cierre.

## 3. Contrato narrativo maestro por estación

### Intro
- **Función narrativa:** abrir la experiencia, ubicar propósito y reglas de recorrido.
- **Objetivo de comprensión:** distinguir proyecto de bionosificación real vs lectura mágica o ornamental.
- **Verdad técnica visible esperada:** baja.
- **Malentendido que corrige:** "las plantas producen música por sí solas".
- **Rol de Lía en esa estación:** acogedora/curiosa; recibe, ordena y prepara el marco.
- **Nivel de densidad textual esperado:** bajo, móvil-first, alta legibilidad.
- **Términos técnicos que sí pueden entrar:** bionosificación, señal bioeléctrica, mediación (sin detalle profundo).
- **Términos o complejidades que conviene dejar fuera:** protocolos, arquitectura de red, componentes internos.
- **Idea de interacción/hero futura compatible con el Documento Maestro:** hero de apertura con mapa visual simple de 5 estaciones y progresión por capas.
- **Criterio de cierre o transición hacia la siguiente estación:** visitante entiende para qué existe el recorrido y acepta comenzar por el origen.

### Estación I
- **Función narrativa:** fijar origen, intención y límite conceptual del proyecto.
- **Objetivo de comprensión:** entender por qué traducir señales vivas no equivale a "hacer hablar" plantas.
- **Verdad técnica visible esperada:** baja-media.
- **Malentendido que corrige:** "es un efecto artístico inventado sin base medible".
- **Rol de Lía en esa estación:** sensible/orientadora; enmarca sentido sin sobreactuar.
- **Nivel de densidad textual esperado:** bajo-medio.
- **Términos técnicos que sí pueden entrar:** señal bioeléctrica, estímulo, medición, traducción.
- **Términos o complejidades que conviene dejar fuera:** detalle de cadena técnica completa, protocolos de transmisión.
- **Idea de interacción/hero futura compatible con el Documento Maestro:** comparación visual breve "pregunta inicial → propósito de mediación".
- **Criterio de cierre o transición hacia la siguiente estación:** visitante queda listo para ver qué señal se mide realmente en II.

### Estación II
- **Función narrativa:** explicar fundamento de la señal y primera mediación técnica comprensible.
- **Objetivo de comprensión:** reconocer que la señal es real, variable y requiere procesamiento para volverse perceptible.
- **Verdad técnica visible esperada:** media.
- **Malentendido que corrige:** "fiel" significa copia literal sin transformación técnica.
- **Rol de Lía en esa estación:** clara/pedagógica; orienta con precisión y sin exceso.
- **Nivel de densidad textual esperado:** medio (segmentado en bloques cortos).
- **Términos técnicos que sí pueden entrar:** filtrado, amplificación, señal cruda, variación de voltaje.
- **Términos o complejidades que conviene dejar fuera:** detalle de hardware específico y topología de red.
- **Idea de interacción/hero futura compatible con el Documento Maestro:** hero de flujo "señal cruda → mediación → representación" en tres pasos.
- **Criterio de cierre o transición hacia la siguiente estación:** visitante entiende la mediación base y está listo para conocer la evolución por fallas reales en III.

### Estación III
- **Función narrativa:** mostrar evolución técnica basada en prueba/error y decisiones de diseño reales.
- **Objetivo de comprensión:** entender que la confiabilidad actual surge de iteraciones concretas, no de un diseño perfecto inicial.
- **Verdad técnica visible esperada:** media-alta.
- **Malentendido que corrige:** "si falló al inicio, el sistema no era serio".
- **Rol de Lía en esa estación:** honesta/concreta; reconoce fallas y explica decisiones.
- **Nivel de densidad textual esperado:** medio-alto, con frases cortas y anclajes concretos.
- **Términos técnicos que sí pueden entrar:** ruido/interferencia, estabilidad de lectura, arquitectura inalámbrica, prototipos cableados/seriales.
- **Términos o complejidades que conviene dejar fuera:** escalabilidad del cableado como tema autónomo; detalle de laboratorio irrelevante para visitante.
- **Idea de interacción/hero futura compatible con el Documento Maestro:** línea de tiempo visual de iteraciones y cambios físicos del montaje por razones técnicas.
- **Criterio de cierre o transición hacia la siguiente estación:** visitante comprende por qué la operación actual (IV) tiene la forma que tiene.

### Estación IV
- **Función narrativa:** revelar la arquitectura funcional actual con máxima claridad técnica compatible con visitante general.
- **Objetivo de comprensión:** ubicar cómo fluye la señal desde bionosificador hasta salida sonora en el sistema actual.
- **Verdad técnica visible esperada:** alta.
- **Malentendido que corrige:** "el resultado depende de magia algorítmica o cajas negras incomprensibles".
- **Rol de Lía en esa estación:** precisa/técnica sin endurecer el tono.
- **Nivel de densidad textual esperado:** alto controlado (alto contenido, lectura compacta y ordenada).
- **Términos técnicos que sí pueden entrar:** bionosificador, microcontrolador (ESP32), filtrado, amplificación, Wi-Fi, router, UDP, MIDI, software central, salida sonora/parlantes.
- **Términos o complejidades que conviene dejar fuera:** operación interna detallada del equipo, configuración específica de red, backend del recorrido, debug/monitoreo/despliegue.
- **Idea de interacción/hero futura compatible con el Documento Maestro:** diagrama de pipeline por capas con jerarquía visual de términos principales (ESP32/MIDI) y secundarios (Wi-Fi/UDP).
- **Criterio de cierre o transición hacia la siguiente estación:** visitante sale con mapa funcional claro y puede pasar a V para entender estado actual e integración final.

### Estación V
- **Función narrativa:** cerrar sentido del recorrido y ubicar el estado actual sin romper credibilidad.
- **Objetivo de comprensión:** integrar lo aprendido: señal viva real, mediación técnica real y proyecto activo.
- **Verdad técnica visible esperada:** media.
- **Malentendido que corrige:** "todo fue una demo aislada sin operación real".
- **Rol de Lía en esa estación:** serena/integradora; sintetiza y despide sin solemnidad excesiva.
- **Nivel de densidad textual esperado:** medio-bajo.
- **Términos técnicos que sí pueden entrar:** estado operativo, canales activos, continuidad del sistema (sin profundizar protocolos).
- **Términos o complejidades que conviene dejar fuera:** backlog técnico interno detallado, objetivos de ingeniería que no aportan a cierre visitante.
- **Idea de interacción/hero futura compatible con el Documento Maestro:** hero de cierre con síntesis de tres certezas del recorrido y salida a revisión libre.
- **Criterio de cierre o transición hacia la siguiente estación:** cierre del recorrido guiado y apertura de navegación libre posterior.

## 4. Reglas editoriales transversales de GVO v1
1. **Regla de progresión técnica por capas.** La explicitud técnica crece de Intro a IV y desciende en V: Intro baja, I baja-media, II media, III media-alta, IV alta, V media.
2. **Regla de no antropomorfización engañosa.** No atribuir intención musical o lenguaje humano a la planta; explicar siempre mediación tecnológica real.
3. **Regla de autosuficiencia funcional.** Cada estación debe entenderse sin depender de una explicación oral perfecta; no usar "como ya te explicaron".
4. **Regla de tono de Lía.** Voz única en primera persona, cálida/sobria/breve; orienta más de lo que pregunta; variación por estación: Intro acogedora/curiosa, I sensible/orientadora, II clara/pedagógica, III honesta/concreta, IV precisa/técnica sin endurecerse, V serena/integradora.
5. **Regla de longitud y legibilidad móvil.** Bloques cortos, ritmo respirable, una idea central por bloque, cierre claro por estación.
6. **Regla de no repetición estructural.** Evitar repetir el mismo patrón retórico entre estaciones; cada una debe aportar un avance narrativo distinto.
7. **Regla de credibilidad sin manual técnico.** Explicar causa y función técnica suficiente para comprender, sin convertir el copy en documentación de ingeniería.
8. **Regla de jerga permitida/prohibida.** Sí: bionosificadores, filtrado, amplificación, microcontrolador (ESP32), Wi-Fi, router, UDP, MIDI (con peso graduado y mayor explicitud en III–IV). No: jerga de operación interna, configuraciones finas de red, backend, debug, monitoreo o despliegue.

## 5. Lista de chequeo para futuros tickets de copy
- [ ] ¿La estación corrige un malentendido real y explícito?
- [ ] ¿La voz de Lía está en primera persona y calibrada al tono esperado de esa estación?
- [ ] ¿La densidad textual está optimizada para lectura móvil en una pasada?
- [ ] ¿La estación introduce solo la verdad técnica visible que le corresponde por capa?
- [ ] ¿Los términos técnicos usados están dentro de la lista aprobada y con peso adecuado?
- [ ] ¿La interacción/hero sugerida es coherente con el contenido y el Documento Maestro?
- [ ] ¿Se evitó antropomorfización engañosa o lenguaje que sugiera invención?
- [ ] ¿Se excluyó toda complejidad de operación interna que no aporta comprensión del visitante?
- [ ] ¿El cierre/transición deja listo el paso narrativo siguiente?

## 6. Orden recomendado para la reescritura posterior
Orden recomendado de trabajo para tickets de copy:
1. Intro + Estación I
2. Estación II
3. Estación III
4. Estación IV
5. Estación V
6. Revisión transversal final

Este orden prioriza marco narrativo inicial, luego progresión técnica gradual, y deja la calibración global de tono/consistencia para el cierre.
