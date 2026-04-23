# Metodología Integral GVO v1

**Documento:** metodologia-integral-gvo-v1.md  
**Versión del producto:** 0.7.0 → v1 estable  
**Fecha de redacción:** 2026-04-21  
**Rama:** main  
**Autor:** José David (responsable principal, solo dev) + Claude Code (asistente)  
**Estado:** Vigente — fuente de verdad metodológica del proyecto

---

## Índice

1. Propósito del documento
2. Alcance y objetivo de la metodología
3. Jerarquía de fuente de verdad
4. Clasificación de artefactos
5. Fases del proyecto (Fase 0 → v1 estable)
6. Dependencias entre frentes
7. Reglas para documentación y sincronización
8. Reglas para copy, narrativa y microcopy
9. Reglas para UX, flujo, first pass y revisita libre
10. Reglas para sistema visual, assets y reemplazo de placeholders
11. Estrategia para Lía Andina 2D (ahora) y pipeline 3D (futuro)
12. Criterios para introducir 3D
13. Backend, sesiones, QR, tipos compartidos, field mode y lab mode
14. Hardening para producción local Windows
15. Testing y release gates
16. Metodología de tickets
17. Cuándo usar Codex, Claude Code, skill o prompt puntual
18. Definición de "GVO v1 serio y estable"
19. Artefactos obligatorios a mantener sincronizados
20. Checklist de entrada y salida por fase

---

## 1. Propósito del documento

Este documento establece las reglas operativas, decisiones cerradas y criterios de avance del proyecto GVO — Guía Visual OKÚA desde su estado actual (v0.7.0) hasta el cierre de v1 estable.

No es un documento conceptual ni motivacional. Es una referencia de trabajo que responde preguntas concretas: qué hacer, en qué orden, qué no abrir, cómo verificar que algo está terminado y qué constituye deuda tolerable vs bloqueante.

Este documento toma como insumo el estado real del repositorio al 2026-04-21, los docs existentes, el código vivo y las decisiones registradas en ADRs. Cualquier contradicción entre este documento y el código vivo debe resolverse inspeccionando el código; este documento orienta, el código manda en caso de duda factual.

---

## 2. Alcance y objetivo de la metodología

**Alcance:**  
- Proyecto GVO desde v0.7.0 hasta el cierre de v1 estable apto para piloto en campo.
- Incluye: frontend, backend, tipos compartidos, contenido narrativo, sistema visual, operaciones locales Windows y documentación viva.
- Excluye: versiones post-v1, CMS completo, sincronización externa, módulos de administración, análisis de datos de visitantes.

**Objetivo:**  
Permitir que un solo desarrollador ejecute el proyecto de forma sostenida, predecible y sin deuda acumulada no registrada, produciendo un sistema funcional, honesto y verificable listo para ser operado en el espacio físico del proyecto OKÚA.

**Lo que esta metodología no hace:**  
- No reemplaza decisiones técnicas puntuales (esas van en ADRs).
- No define el guion final del contenido (eso lo define el responsable principal del proyecto OKÚA).
- No establece el calendario exacto (eso lo decide el solo dev según disponibilidad).

---

## 3. Jerarquía de fuente de verdad

Orden descendente de autoridad. Ante contradicción, prevalece la fuente de mayor jerarquía.

| Nivel | Fuente | Qué define |
|-------|--------|------------|
| 1 | Código vivo en `main` | Comportamiento real del sistema |
| 2 | ADRs en `docs/05-adr/` | Decisiones arquitectónicas cerradas |
| 3 | Este documento (`metodologia-integral-gvo-v1.md`) | Metodología y reglas de trabajo |
| 4 | `docs/00-master/gvo-master-summary-v1.md` | Problema que resuelve, qué es GVO, restricciones |
| 5 | `docs/01-product/product-scope.md` | Qué está dentro y fuera de alcance v1 |
| 6 | `docs/04-architecture/architecture-overview.md` | Arquitectura vigente |
| 7 | `CLAUDE.md` | Instrucciones operativas para agentes IA |
| 8 | `AGENTS.md` | Reglas del equipo de trabajo |
| 9 | `docs/02-script/` | Narrativa base de Frente C |
| 10 | `GVO_ESTADO_TECNICO_*.txt` | Snapshots de estado para referencia histórica |

**Regla práctica:** Si el README contradice el código, el código tiene razón y el README debe actualizarse. Si un doc de fase anterior contradice un ADR, el ADR prevalece.

---

## 4. Clasificación de artefactos

### 4.1 Artefactos vigentes y confiables

- `packages/shared/src/` — Tipos y funciones compartidas; fuente de verdad de contratos.
- `apps/server/src/` — Backend completo y funcional.
- `apps/web/src/` — Frontend completo y funcional.
- `README.md` — Instrucciones de uso alineadas con el estado actual.
- `docs/04-architecture/architecture-overview.md` — Arquitectura vigente y sincronizada.
- `content/stations/` — Copy semilla funcional de Frente C (5 estaciones + intro).
- `content/qr/` — Manifiestos y artefactos QR del piloto, generables desde repo.
- `reports/pilot-validation/` — Reportes de validación de laboratorio; no son fuente de verdad del producto.
- `docs/05-adr/ADR-001-single-avatar-lia.md` — Decisión cerrada sobre avatar único.
- `docs/avatars/lia-andina/` — Biblia visual de Lía: spec cerrada, assets de referencia.
- `scripts/smoke-journey.mjs` — Smoke test de contratos API; confiable y actualizado.

### 4.2 Artefactos sin desfase conocido

- Ninguno actualmente; el material operativo se considera sincronizado con `main`.

### 4.3 Artefactos históricos (solo consulta)

- `GVO_ESTADO_TECNICO_2026-04-12.txt` — Snapshot técnico completo al 12 de abril. Útil como referencia de estado pasado. No actualizar; es un registro.

### 4.4 Artefactos pendientes de creación (deuda estructural)

- Tests de integración con framework formal (más allá del smoke).
- Assets visuales reales por estación (actualmente todos son `gitkeep`).
- QR físicos impresos para operación en campo.
- Hardening local adicional: reinicio automático y despliegue final en Windows.
- Kit de validación de laboratorio: soak, concurrencia y reporte reproducible.

---

## 5. Fases del proyecto

### Fase 0 — Alineación (correctivo cerrado)

**Estado:** COMPLETA.

**Correctivos aplicados en main:**

1. **Código muerto de flujo de selección de avatar:** `BlockedScreen.tsx` línea 10 referenciaba `/guide`; `StationScreen.tsx` línea 32 referenciaba `guide_required`. Ambos residuos del flujo multi-avatar eliminado por ADR-001 ya fueron limpiados.

2. **README sincronizado:** El README refleja monorepo npm, stack actual, flujo de visitante real, instrucciones de arranque corregidas y estado de Lía Andina.

3. **docs/04-architecture/architecture-overview.md:** Describe la arquitectura actual (sesión en memoria, monorepo, tipos compartidos como workspace).

4. **Validación de copy:** intro y estaciones no mencionan "elige tu guía" ni variantes.

- [x] Código muerto eliminado de BlockedScreen y StationScreen.
- [x] README actualizado y coherente con el estado real.
- [x] architecture-overview.md revisado y vigente.
- [x] Smoke test pasa sin errores (`npm run smoke:journey`).
- [x] `npm run typecheck` pasa sin errores.
- [x] Commit específico: `fix(alignment): phase-0 cleanup`.

---

### Fase 1 — Base documental y gobierno del repo

**Estado:** COMPLETA.

**Artefactos entregados:**
- `docs/00-master/gvo-master-summary-v1.md`
- `docs/01-product/product-scope.md`
- `docs/04-architecture/architecture-overview.md` (vigente)
- `docs/05-adr/ADR-001-single-avatar-lia.md`
- `docs/06-operations/git-workflow-solo-dev.md`
- `docs/07-testing/test-strategy.md`
- `docs/avatars/lia-andina/lia-andina-spec.md` + assets de referencia
- Templates de tickets, estaciones y notas de sesión

**Deuda tolerable:** la operación Windows base y el hardening local adicional siguen en avance.

---

### Fase 2 — MVP shell

**Estado:** COMPLETA.

**Artefactos entregados:**
- Estructura de monorepo npm (apps/web, apps/server, packages/shared, content/).
- Rutas del frontend (7 rutas, BrowserRouter).
- Componentes base: Layout, ProgressTracker, GuideAvatar, ContentRenderer, StationHero.
- Pantallas: Welcome, Entry, Intro, Station, Blocked, Final.
- Backend: Fastify, 8 endpoints, sesión en memoria.
- Tipos compartidos: JourneySession, GuideId, ContentBlock, tokens QR.

---

### Fase 3 — Sesión temporal + secuencia + gating por QR

**Estado:** COMPLETA.

**Artefactos entregados:**
- Sesión en memoria con TTL 4h deslizante.
- Validación de secuencia (intro_required, sequence_violation).
- Tokens QR: okua-entry + okua-e1 a okua-e5.
- Endpoints: POST .../entry/:token, POST .../scan/:token.
- JourneyProvider con rehidratación desde sessionStorage.
- Modo lab (bypass visible) y field (bypass oculto) via VITE_APP_MODE.

---

### Fase 4 — Cierre final + revisita libre

**Estado:** COMPLETA.

**Artefactos entregados:**
- FinalScreen con Lía calm.
- POST .../finalize (requiere haber visitado estación 5).
- Revisita libre: session.completed=true elimina validación de secuencia.
- Lía calm integrada en FinalScreen.

---

### Fase 5 — UX diferenciada por estación

**Estado:** PARCIAL.

**Completado:**
- Sistema visual completo (paleta CSS WCAG AA+, tokens, componentes).
- Copy semilla funcional de Frente C (intro + 5 estaciones).
- Lía Andina integrada con 4 estados (idle, three-quarter, calm, curious).
- ProgressTracker con estados visited/current/locked.
- StationHero con tono visual por estación (warm/cool/neutral/cold/default).

**Pendiente (obligatorio para v1):**
- Assets visuales reales por estación (actualmente `assets/stations/*/` están vacíos con `.gitkeep`).
- Revisión y aprobación del guion de Frente C por el responsable principal del proyecto OKÚA (el copy actual es semilla funcional, no versión de producción).
- Validación de microcopy (CTAs, hints, mensajes de espera, blocked, final) contra experiencia real de visitante.
- Posiblemente: uso de `lia-three-quarter.png` en alguna pantalla (actualmente sin asignar).

**Criterio de salida de Fase 5:**
- [ ] Assets de estaciones reemplazados (o decisión documentada de mantener placeholders en piloto).
- [ ] Copy de Frente C revisado y aprobado por el responsable principal.
- [ ] Microcopy validado contra flujo real de visitante.
- [ ] Smoke test pasa.
- [ ] `npm run typecheck` pasa.

---

### Fase 6 — Hardening local Windows

**Estado:** PARCIAL.

**Base ya cerrada:**
- Base de arranque local (`start-gvo.bat` / `start-gvo.ps1` + backend sirviendo `apps/web/dist`).
- CORS configurable en modo piloto local.
- Rate limiting básico en Fastify.
- Logging persistente a archivo.
- Validación de laboratorio con soak y concurrencia básica.

**Pendiente real para v1:**
- Configuración final de IP fija o hostname en la red del espacio.
- Verificación de QR físicos impresos en el sitio.
- Prueba de carga con visitantes simultáneos.
- Reinicio automático tras corte de luz.
- HTTPS local solo si la red lo pide.
- Prueba real de campo con reporte firmado por el responsable.

**Deuda tolerable para post-v1:**
- Panel de monitoreo de sesiones activas.
- Rotación automática de logs con límite de tamaño.
- Métricas de duración de visita.

**Criterio de salida de Fase 6:**
- [x] Sistema arranca con un solo script desde cero en la PC Windows objetivo.
- [x] Frontend accesible desde móvil en la red del espacio.
- [ ] QR de entrada y QR de estaciones funcionan.
- [ ] Sistema opera 2h continuas sin intervención manual.
- [x] Smoke test pasa contra sistema en producción local.

---

### Cierre de v1 estable

**Estado:** Pendiente de Fase 5 (parcial) + Fase 6 (parcial).

Ver sección 18 para definición completa de "GVO v1 serio y estable".

---

## 6. Dependencias entre frentes

Los frentes de trabajo son relativamente independientes pero tienen dependencias en sentido de compilación y de coherencia narrativa.

```
packages/shared
  └─ apps/server (importa tipos)
  └─ apps/web (importa tipos)
  └─ content/stations (importa ContentBlock, etc.)

content/stations
  └─ apps/web (cargado via alias @content)

docs/avatars/lia-andina/
  └─ apps/web/src/assets/lia/ (assets de referencia, no de runtime)

assets/stations/
  └─ apps/web/src/screens/StationScreen.tsx (cuando los assets sean reales)
```

**Dependencias críticas:**

| Si cambias... | Debes también... |
|---------------|-----------------|
| `packages/shared/src/types.ts` | Reconstruir shared (`npm run build` en packages/shared), verificar que server y web compilan |
| `packages/shared/src/qr.ts` (tokens) | Actualizar smoke test + QR físicos impresos |
| Rutas del frontend | Actualizar referencias en EntryScreen.tsx (resumeRoute) y BlockedScreen.tsx |
| Número de estaciones | Actualizar TOTAL_STATIONS en shared, validación en server, ProgressTracker, content/stations/index.ts |
| Paleta CSS en app.css | Verificar contraste WCAG AA+ en texto principal y muted |
| GuideId en types.ts | Actualizar sessions.ts y cualquier referencia a guide en frontend |
| Copy de una estación | Verificar que ContentBlock.type es válido y que VisualTone corresponde al contenido |

**No hay dependencias circulares.** El grafo de dependencias es un DAG limpio.

---

## 7. Reglas para documentación y sincronización

### Obligatorio

- Cada commit que cambia comportamiento observable debe tener un doc correspondiente actualizado o una nota en el cierre del ticket sobre por qué no aplica actualización documental.
- Los ADRs no se modifican retroactivamente; si una decisión cambia, se crea un nuevo ADR que referencia al anterior.
- `gvo-master-summary-v1.md` y `product-scope.md` se revisan al inicio de cada fase. Si están desactualizados, se corrigen antes de empezar trabajo de esa fase.
- El README se mantiene funcional: instrucciones de arranque correctas, stack real, estructura real. No es un documento de marketing.

### Recomendado

- Al finalizar una fase, escribir nota breve en el commit de cierre explicando qué cambió respecto al plan original y por qué.
- Cuando se toma una decisión arquitectónica relevante (no solo cosmética), crear un ADR siguiendo el template en `docs/05-adr/ADR-000-template.md`.

### Deuda tolerable

- Docstrings en código (no son obligatorios; los nombres de función y tipo son suficientes en la mayoría de casos).
- Diagramas de secuencia de flujo (el flujo ya está descrito en texto; un diagrama sería útil pero no crítico).

### Regla de sincronización

Un artefacto documental está **sincronizado** cuando describe con precisión el comportamiento actual del código. Si hay duda, leer el código es la verificación. La documentación que no puede verificarse contra código vivo es candidata a eliminación o marcado como "histórica".

---

## 8. Reglas para copy, narrativa y microcopy

### Decisiones cerradas (no reabrir)

- **No pseudomisticismo:** Las plantas no "hacen música por sí solas", no tienen "conciencia", no "quieren comunicarse". El sistema capta señales reales y las traduce mediante mediación técnica. Esta distinción es no negociable y debe mantenerse en cada revisión del copy.
- **Lía no está emocionada:** Lía es una entidad guía, no un personaje que expresa asombro o maravilla. Puede indicar, presentar, señalar. No exclama.
- **Verdad técnica progresiva:** Cada estación añade una capa de comprensión real. No simplificar hasta el punto de mentir. No complicar hasta el punto de perder al visitante.
- **Autosuficiencia funcional del copy:** El visitante que solo lee el copy, sin ver ningún asset visual, debe entender qué es OKÚA. Los assets completan, no sustituyen.

### Obligatorio en cada bloque de contenido

- Tipo de bloque explícito: `paragraph`, `note`, `hint`, o `heading`. Usar correctamente:
  - `paragraph`: contenido narrativo principal.
  - `note`: información importante que matiza o previene malentendido.
  - `hint`: orientación práctica al visitante (qué hacer, no qué pensar).
  - `heading`: título visual dentro del bloque de una estación.
- Ningún párrafo supera 4 líneas en móvil estimadas (≈ 80-100 palabras). Si es más largo, dividir.
- Las `note` son raras: máximo 1 por estación. Si hay más de una, algo está mal con el párrafo principal.

### Microcopy (CTAs, mensajes de sistema, hints de QR)

- CTA principal por pantalla: uno solo. Acción clara. Sin ambigüedad.
- Mensajes de error (blocked, token inválido): informativos, no culpantes. "Esto ocurre cuando..." en lugar de "Error: ...".
- `qrHint`: texto que aparece en StationScreen antes de escanear. Debe decir qué buscar físicamente, no solo "escanea el código QR".
- Microcopy de progreso (ProgressTracker): sin texto adicional; los puntos y números son suficientes.

### Proceso de aprobación de copy

El copy en `content/stations/` es semilla funcional validada técnicamente pero no aprobada todavía para producción. Antes del piloto en campo:

1. El responsable principal presenta y revisa el copy.
2. Revisión unipersonal: ¿refleja el sistema real?, ¿es comprensible para visitante sin contexto previo?
3. Correcciones en archivos `content/stations/*.ts` sin tocar código de pantallas.
4. Commit con prefijo `content(copy):` y descripción clara del cambio.
5. No es necesario un ADR para cambios de copy; sí es necesario un commit limpio.

---

## 9. Reglas para UX, flujo, first pass y revisita libre

### Flujo de primera pasada (secuencia obligatoria)

```
QR entrada → /entry/okua-entry
  → EntryScreen (valida, calcula resumeRoute)
    → /intro
      → IntroScreen (Lía curious lg, contenido intro)
        → /station/1
          → StationScreen 1
            [lab: botón bypass] [field: escanea QR okua-e1]
              → /qr/okua-e1 → QrScreen → /station/2
                → StationScreen 2 ... (igual para 2, 3, 4, 5)
                  → /station/5
                    → StationScreen 5 → CTA "Ir al cierre"
                      → POST .../finalize
                        → /final
                          → FinalScreen (Lía calm, revisita libre)
```

**Reglas de flujo obligatorias:**

- Nunca permitir acceso a `/station/:n` si el paso `n-1` no fue visitado (primera pasada).
- Nunca mostrar botón "Ir al cierre" en estación 5 hasta que la sesión haya registrado visita a estación 5.
- `session.completed=true` solo se establece via POST .../finalize, que requiere que visitedSteps incluya [0,1,2,3,4,5].
- BlockedScreen es el único destino cuando se detecta violación de secuencia. No redirigir silenciosamente.
- `/entry/:token` es el único punto de entrada al flujo. No acceder a `/intro` directamente sin sesión válida.

### Revisita libre (post-completar)

- Una vez `session.completed=true`, el visitante puede navegar a cualquier estación en cualquier orden.
- ProgressTracker muestra todas las estaciones como "visited".
- No hay botón de "reiniciar desde cero" en v1. Si el visitante quiere reiniciar, debe obtener una nueva sesión (cerrar y reabrir QR de entrada en otra sesión del navegador, o que el servidor expire la sesión).

### Principios UX no negociables

- Sin modales que interrumpan el flujo en primera pasada (solo informar si hay violación de secuencia, y solo vía BlockedScreen).
- Sin scroll horizontal en ninguna pantalla.
- Sin autofocus en inputs (no hay inputs obligatorios en v1).
- El visitante nunca se queda sin saber qué hacer: siempre hay un CTA visible en la zona inferior de la pantalla, o una indicación de QR.
- En modo field, el visitante nunca ve controles de developer o referencias a "modo lab".

---

## 10. Reglas para sistema visual, assets y reemplazo de placeholders

### Estado actual del sistema visual

- Paleta completa definida en `apps/web/src/app.css` con custom properties CSS.
- Todos los tokens de color cumplen WCAG AA+ (texto principal: ratio 11:1; texto muted: ratio 5.5:1).
- Tono por estación asignado: warm (I), cool (II), neutral (III), cold (IV), default (V).
- Los placeholders CSS actuales en StationHero son funcionales y coherentes visualmente.

### Jerarquía de assets

1. **Crítico:** Lía Andina (4 estados PNG, integrados en bundle Vite). Ya en producción.
2. **Importante:** Assets visuales por estación en `assets/stations/`. Actualmente vacíos.
3. **Futuro:** Render 3D de Lía (pipeline pendiente). No bloquea v1.

### Reglas para reemplazo de placeholders

- Los placeholders CSS en StationHero **son aceptables para piloto en campo** si los assets reales no están listos. No bloquean la experiencia narrativa.
- Para reemplazar un placeholder por imagen real:
  1. Colocar archivo en `assets/stations/station-{n}/` (WebP preferido, PNG aceptable).
  2. Actualizar la propiedad `visual.hero` en `content/stations/station-{n}.ts`: cambiar `type: 'placeholder'` a `type: 'image'`, agregar `src` y `caption`.
  3. Verificar que StationHero renderiza correctamente en móvil (no crops no deseados).
  4. No agregar imágenes que pesen más de 500 KB sin optimización previa (WebP, calidad 85).

### Reglas para sistema visual

- No modificar la paleta CSS sin verificar que todos los componentes mantienen contraste WCAG AA+.
- No agregar dependencias de CSS externas (Tailwind, Bootstrap, etc.) en v1.
- Los temas por estación son aditivos: modifican el tono del hero, no cambian la paleta base de la aplicación.
- Animaciones: solo si sirven para orientar (no decorativas). Actualmente ninguna es obligatoria.

---

## 11. Estrategia para Lía Andina 2D (ahora) y pipeline 3D (futuro)

### Estado actual (2D funcional)

Los 4 assets PNG de Lía (`lia-idle.png`, `lia-three-quarter.png`, `lia-calm.png`, `lia-curious.png`) son placeholders de alta calidad coherentes con la spec. Están integrados en el bundle de Vite. Son renders 2D artísticos, NO renders 3D.

**Uso actual por pantalla:**

| Pantalla | Estado de Lía | Tamaño |
|----------|---------------|--------|
| Layout (header) | idle | sm (36px) |
| IntroScreen | curious | lg (120px) |
| FinalScreen | calm | lg (120px) |
| (sin asignar aún) | three-quarter | — |

**Reglas para la versión 2D:**
- No cambiar los assets actuales de Lía sin justificación fuerte (coherencia visual establecida).
- `lia-three-quarter.png` está disponible pero sin pantalla asignada. Se puede usar en una pantalla de transición o mantenerse en reserva.
- Si se necesita un quinto estado emocional, debe definirse primero en `docs/avatars/lia-andina/lia-andina-spec.md` antes de crear el asset.

### Pipeline 3D (futuro — no bloquea v1)

Estado del checklist 3D:
- [x] Referencia original consolidada
- [x] Turnaround de vistas canónicas (5 vistas en docs/avatars/lia-andina/turnaround/)
- [x] Detalles y estados emocionales (4 en docs/avatars/lia-andina/details/)
- [x] Model sheet compuesto (docs/avatars/lia-andina/model-sheet/)
- [x] Spec cerrada (lia-andina-spec.md)
- [ ] Aprobación final para producción 3D
- [ ] Generación de malla base (Meshy / Tripo3D u equivalente)
- [ ] Retopología y UVs
- [ ] Texturizado PBR (materiales: marfil mate, lavanda translúcido, ámbar luminoso)
- [ ] Rigging mínimo (5 huesos de tallo + blendshapes para estados)
- [ ] Animaciones idle (ciclo de 2-3 segundos, flotación suave)
- [ ] Integración en app (reemplazar `<img>` por `<canvas>` o componente 3D)

**Regla:** El pipeline 3D no se inicia hasta que:
1. v1 esté en piloto estable.
2. Exista decisión explícita del equipo sobre prioridad.
3. Haya un ticket de planificación que defina el alcance técnico (Three.js vs Babylon.js vs React Three Fiber, etc.).

---

## 12. Criterios para introducir 3D

El 3D solo se introduce si cumple **todos** los siguientes criterios:

1. **Aporta comprensión real:** El visitante entiende mejor algo del proyecto OKÚA porque Lía se presenta en 3D. No es decoración.
2. **No degrada el rendimiento en móvil de gama media:** El render 3D corre a ≥ 30fps en un teléfono de 2020 con WebGL disponible.
3. **No introduce dependencia de Internet:** Los assets 3D se sirven localmente.
4. **No requiere plugins o apps adicionales del visitante:** Solo navegador estándar.
5. **v1 está cerrada y en producción:** El 3D es una mejora de v1, no una feature de v1.
6. **Existe fallback 2D:** Si WebGL no está disponible, el sistema cae silenciosamente a los PNG actuales.

**Si algún criterio no se cumple:** Posponer. Los PNG actuales son suficientes para comunicar la identidad de Lía.

---

## 13. Backend, sesiones, QR, tipos compartidos, field mode y lab mode

### Backend

- Stack: Node.js >= 18, TypeScript 5.4.5, Fastify 5.8.4.
- Puerto: 3001 (configurable via env).
- CORS: configurable. En el piloto local con frontend servido por el backend, el arranque base usa `same-origin`; `permissive` queda para desarrollo separado y `allowlist` para casos con origen explícito.
- Rate limiting: base global de 60 req/min por IP y refuerzo de 10 req/min en los `POST` del journey. Sin Redis ni política distribuida.
- Estado: Map<string, JourneySession> en memoria. Sin base de datos. Sin Redis. Sin persistencia de sesiones. Esta es una decisión arquitectónica explícita para v1; suficiente para el caso de uso.
- TTL: 4h deslizante por defecto (`SESSION_TTL_MS=14400000`). Limpeza automática cada 15 minutos.
- Logging: persistente a `logs/gvo-local.log` en operación local. No hay logging persistente remoto ni rotación avanzada todavía.
- No hay endpoints administrativos, de autenticación o de consulta de todas las sesiones.

### Sesiones

- Se crean via POST /api/journey/session. El frontend las identifica con sessionStorage (clave: `gvo_session_id`).
- Si el visitante cierra el navegador, la sesión expira en 4h. No hay "recordarme" ni sesiones persistentes.
- Si el visitante recarga la página (F5), JourneyProvider rehidrata la sesión desde el backend (GET /api/journey/session/:id).
- `guide` siempre es `'flower'` (Lía Andina). GuideId es un literal único, no una union.

### QR

- Tokens definidos en `packages/shared/src/qr.ts`. Son strings constantes, no secrets criptográficos.
- Tokens actuales: `okua-entry`, `okua-e1`, `okua-e2`, `okua-e3`, `okua-e4`, `okua-e5`.
- Los QR físicos contienen URLs del tipo: `http://{IP_LOCAL}:{PUERTO}/entry/okua-entry` y `http://{IP_LOCAL}:{PUERTO}/qr/okua-e{n}`.
- La validación de token ocurre en el backend. El frontend redirige al backend para validar antes de avanzar.
- Los QR no son secrets: alguien que conozca el token puede navegar directamente. La seguridad no es el objetivo; el control de secuencia sí.

### Tipos compartidos

- `packages/shared` es un workspace npm. En desarrollo, resuelto directamente desde `src/` via alias de Vite/tsconfig. En producción, requiere `npm run build` en shared antes de build de web y server.
- Cualquier cambio a tipos compartidos requiere `npm run build` en shared y verificar que server y web compilan.
- Los tipos son el contrato: si server y web compilan con el mismo shared, el contrato está cumplido.

### Lab mode vs Field mode

| Aspecto | Lab (VITE_APP_MODE=lab) | Field (VITE_APP_MODE=field) |
|---------|-------------------------|------------------------------|
| Botón bypass QR | Visible en StationScreen | Oculto |
| Propósito | Desarrollo y testing sin QR físicos | Operación real en el espacio |
| Quién lo usa | Solo dev | Visitantes |

**Regla operativa:** El archivo `.env.local` del frontend nunca se commitea. La configuración de producción (`VITE_APP_MODE=field`) se aplica manualmente en la PC del espacio antes del piloto. Documentar en instrucciones de despliegue.

---

## 14. Hardening para producción local Windows

### Base operativa local actual

**1. Script de arranque**

`start-gvo.ps1` y `start-gvo.bat` ya existen y dejan el piloto listo para operar en Windows:
- comprueban Node.js y npm;
- ejecutan `npm run build`;
- levantan el backend sirviendo `apps/web/dist`;
- fijan `GVO_CORS_MODE=same-origin` y `GVO_LOG_FILE=logs/gvo-local.log` para el modo piloto local.
- el repo también incluye un generador de QR con manifiesto (`npm run qr:generate`).

**2. Configuración de red**

- IP fija en la PC Windows en la red MikroTik (reserva DHCP por MAC o IP estática).
- Hostname opcional (ej. `gvo.local`) para URLs más amigables en QR.
- Verificar que el firewall de Windows permite conexiones entrantes en puerto 3001 y puerto de frontend.

**3. QR físicos**

- Generar QR con URL completa: `http://{IP}:{PUERTO}/entry/okua-entry`, `http://{IP}:{PUERTO}/qr/okua-e1`, etc.
- Imprimir en tamaño mínimo de 3cm x 3cm. Probar legibilidad con el móvil del espacio a 30cm de distancia.
- Los QR de estaciones deben estar físicamente en la ubicación correspondiente a cada estación.

**4. Rate limiting básico**

Implementado en Fastify:
- Límite global: 60 requests/minuto por IP.
- Límite en `POST` del journey: 10 requests/minuto por IP.
- Respuesta homogénea: `429` con `ok: false, error: 'rate_limit_exceeded'`.

**5. Logging persistente**

Implementado como append simple a `logs/gvo-local.log`:
- registra arranque y requests relevantes;
- crea el directorio si no existe;
- no guarda datos personales del visitante;
- no usa rotación avanzada todavía.

**6. CORS configurable**

Implementado con modos explícitos:
- `same-origin` para el piloto local con frontend servido por el backend;
- `permissive` para desarrollo separado;
- `allowlist` cuando se necesite un origen específico.

### Recomendado (no bloquea piloto)

- pm2 o Task Scheduler para reinicio automático del proceso Node.js tras corte de luz.
- Prueba de carga manual: 3-5 visitantes simultáneos, verificar que sesiones no interfieren.
- Mensaje de mantenimiento configurable (banner en frontend cuando el servidor está arrancando).

### Deuda tolerable post-v1

- HTTPS con certificado autofirmado (solo si se detecta problema con mixed content o red poco confiable).
- Panel de estado del servidor (cuántas sesiones activas, uptime).
- Script de backup de logs.

---

## 15. Testing y release gates

### Estrategia de testing

**Capa 1 — Smoke test automatizado (existe, mantener)**
- `scripts/smoke-journey.mjs`: 9 verificaciones de contratos API.
- Corre en: `npm run smoke:journey` (requiere servidor corriendo).
- Obligatorio antes de cualquier merge a main que toque backend o tipos compartidos.

**Capa 2 — Typecheck (existe, mantener)**
- `npm run typecheck` en todos los paquetes.
- Obligatorio antes de cualquier commit que toque TypeScript.

**Capa 3 — Prueba manual de flujo completo (protocolo definido)**

Protocolo de prueba manual por cada sesión de trabajo relevante:

| Escenario | Pasos | Resultado esperado |
|-----------|-------|--------------------|
| Entrada válida | Navegar a /entry/okua-entry | Redirige a /intro |
| Entrada inválida | Navegar a /entry/token-falso | Error visible, no crash |
| Flujo completo | Intro → E1 → E2 → E3 → E4 → E5 → Final | ProgressTracker completo, Lía calm |
| Intento salto | Acceder a /station/3 sin haber hecho E2 | Redirige a /blocked |
| Rehidratación | Iniciar flujo → F5 en una estación | Continúa desde el mismo punto |
| Revisita libre | Completar flujo → acceder a /station/1 | Acceso sin validación de secuencia |
| QR estación | Navegar a /qr/okua-e1 con sesión en E0 (intro visitado) | Registra E1, redirige a /station/2 |
| QR fuera de secuencia | Navegar a /qr/okua-e3 sin haber hecho E2 | Error de secuencia visible |
| Modo field | VITE_APP_MODE=field, cargar app | No se ve botón bypass |

**Capa 4 — Tests de integración con framework (deuda tolerable para v1)**

No hay tests con Jest, Vitest o Playwright. `tests/` está vacío. Esta deuda es tolerable para v1 de piloto en campo. La capa de smoke + typecheck + prueba manual cubre los contratos críticos. Para v2 o mantenimiento a largo plazo, agregar al menos:
- Vitest para lógica de sesiones (sessions.ts).
- Playwright para flujo E2E.

### Release gates

Un release se considera listo para piloto cuando:

- [ ] `npm run typecheck` pasa sin errores en todos los paquetes.
- [ ] `npm run smoke:journey` pasa todos los checks (con servidor corriendo).
- [ ] Protocolo de prueba manual completo ejecutado sin fallos.
- [ ] `npm run build` produce artefactos sin errores.
- [ ] Script de arranque Windows probado en la PC objetivo.
- [ ] QR físicos probados con móvil real en el espacio.
- [ ] Modo field activo (`VITE_APP_MODE=field`).
- [ ] Copy de Frente C aprobado por el responsable principal.

---

## 16. Metodología de tickets

### Cuándo crear un ticket

- Toda unidad de trabajo que toca más de un archivo o tiene más de un paso.
- Cualquier cambio que requiera validación posterior (no solo "escribir código").
- Trabajo que puede pausarse y retomarse entre sesiones.

**No requiere ticket formal:** Correcciones de typo en docs, ajustes de un solo archivo obvios y verificables en el momento.

### Estructura de ticket (template: `docs/templates/TICKET_TEMPLATE.md`)

```
ID: GVO-XXX
Título: [verbo + sustantivo]
Tipo: fix | feature | content | ops | docs | refactor
Frente: frontend | backend | shared | content | docs | scripts | infra
Fase: [número de fase]
Prioridad: alta | media | baja
Estado: backlog | en-progreso | bloqueado | cerrado

Descripción: Qué y por qué.
Criterios de aceptación: Lista verificable.
Archivos involucrados: Lista de archivos que se esperan tocar.
Dependencias: Tickets que deben cerrarse antes.
Validaciones: Cómo verificar que está hecho.
Pruebas manuales sugeridas: Qué probar manualmente.
Notas de cierre: (se completa al cerrar)
```

### Ciclo de vida de un ticket

1. **Apertura:** Definir descripción + criterios de aceptación antes de empezar.
2. **Ejecución:** Cambios pequeños y verificables. Typecheck al terminar cada archivo relevante.
3. **Validación:** Smoke test si toca backend o tipos. Prueba manual si toca flujo de visitante.
4. **Cierre:** Notas de cierre en el ticket. Commit limpio con mensaje descriptivo. Actualizar docs si aplica.

### Prefijos de commit por tipo de ticket

| Tipo | Prefijo |
|------|---------|
| bug fix | `fix(área):` |
| feature | `feat(área):` |
| contenido narrativo | `content(copy):` |
| documentación | `docs:` |
| refactor | `refactor(área):` |
| scripts/ops | `ops:` |
| tipos compartidos | `types:` |
| tests | `test:` |
| alineación/limpieza | `fix(alignment):` |

### Tags de hitos

Usar `git tag` para marcar hitos de fase:
- `v0.1-doc-foundation`, `v0.2-mvp-shell`, etc. (ya existentes en historial)
- Próximos: `v0.8-phase0-alignment`, `v0.9-phase5-complete`, `v1.0-field-ready`

---

## 17. Cuándo usar Codex, Claude Code, skill o prompt puntual

### Claude Code (CLI interactivo — herramienta principal)

**Usar cuando:**
- Exploración de código desconocido o de contexto amplio.
- Refactors que tocan múltiples archivos.
- Implementación de nuevas funcionalidades con verificación iterativa.
- Debugging de errores que requieren leer código + ejecutar + leer resultado.
- Generación de documentación compleja basada en el estado real del repo.
- Cualquier tarea que requiere leer archivos, editar y verificar en ciclo.

**No usar cuando:**
- Una búsqueda rápida con `grep` es suficiente.
- El cambio es obvio y de un solo archivo (editar directamente).

### Skills de Claude Code (comandos especializados)

| Skill | Cuándo usar |
|-------|-------------|
| `/create-station` | Agregar o modificar una estación completa (narrativa + visual + código) |
| `/close-ticket` | Preparar cierre formal de un ticket (resumen, archivos, validaciones) |
| `/qr-flow-check` | Revisar o diseñar flujo de acceso por QR |
| `/local-security-scan` | Revisar riesgos de seguridad antes de despliegue |
| `/vertical-slice` | Planear un slice pequeño y verificable desde docs hasta código |
| `/simplify` | Revisar código recién escrito para calidad y reuso |
| `/fewer-permission-prompts` | Reducir interrupciones de permisos en sesiones largas |

**Usar skills en lugar de prompts libres cuando:** la tarea encaja exactamente en la descripción del skill y se quiere consistencia de proceso.

### Prompts puntuales (sin tool estructurado)

**Usar cuando:**
- Pregunta conceptual rápida sobre el proyecto.
- Decisión de diseño pequeña que no requiere leer código.
- Redactar un párrafo de copy para una estación (sin modificar archivos).
- Evaluar una opción técnica antes de decidir si abrir un ticket.

### Codex (OpenAI) u otro modelo externo

**Usar cuando:**
- Generación de código repetitivo bien especificado que no requiere contexto del repo.
- Traducciones o variaciones de copy (con supervisión humana posterior).
- Exploración de opciones técnicas fuera del contexto del proyecto.

**No usar Codex para:**
- Cambios directos al repo (el contexto del repo es clave; Claude Code con acceso a archivos es mejor).
- Decisiones que requieren conocer el estado real del código.

### Regla general

El contexto es el recurso más valioso. Usar la herramienta que puede acceder al contexto correcto con el menor costo de setup. Claude Code con acceso al repo supera a cualquier prompt sin contexto para tareas del proyecto.

---

## 18. Definición de "GVO v1 serio y estable"

GVO v1 está cerrada cuando cumple **todos** los siguientes criterios:

### Funcionales

- [ ] Flujo completo (QR entrada → intro → 5 estaciones → cierre → revisita libre) opera sin errores en móvil real en la red del espacio.
- [ ] Gating de secuencia funciona: no se puede saltar una estación en primera pasada.
- [ ] Modo field activo: visitantes no ven controles de developer.
- [ ] QR físicos funcionan: escanear el QR de la estación N avanza correctamente al paso N+1.
- [ ] Rehidratación de sesión: F5 en cualquier pantalla restaura el estado correcto.
- [ ] Cierre y revisita: después de completar, el visitante puede ver cualquier estación sin restricción.

### Narrativos

- [ ] Copy de las 5 estaciones + intro revisado y aprobado por el responsable principal.
- [ ] Ningún bloque de contenido menciona autonomía musical de las plantas sin mediación técnica.
- [ ] Lía presenta el sistema, no lo dramatiza.
- [ ] Microcopy (CTAs, hints, mensajes de error) validado con al menos 1 visitante de prueba.

### Técnicos

- [ ] `npm run typecheck` pasa sin errores.
- [ ] `npm run smoke:journey` pasa todos los checks.
- [ ] `npm run build` produce artefactos funcionales.
- [ ] Código muerto de flujo multi-avatar eliminado (BlockedScreen, StationScreen).
- [ ] CORS configurable en modo piloto local / allowlist cuando haga falta.
- [ ] Rate limiting básico activo.
- [ ] Logging a archivo activo.

### Operativos

- [ ] Script de arranque Windows funciona en la PC objetivo desde cero.
- [ ] Sistema opera 2h continuas sin intervención manual.
- [ ] Al menos 3 visitantes simultáneos sin degradación observable.
- [ ] QR físicos impresos y ubicados en las estaciones correctas.
- [ ] IP fija o hostname configurado en red MikroTik.
- [ ] Instrucciones de arranque documentadas para operador no técnico.

### Documentales

- [ ] README actualizado con instrucciones correctas de arranque y descripción real del proyecto.
- [x] Este documento (`metodologia-integral-gvo-v1.md`) refleja el estado real del proyecto.
- [x] Todos los correctivos de Fase 0 completados.

---

## 19. Artefactos obligatorios a mantener sincronizados

Estos artefactos deben estar coherentes entre sí en todo momento. Cuando uno cambia, los demás deben revisarse.

| Artefacto | Qué define | Sincronizar con |
|-----------|------------|-----------------|
| `packages/shared/src/types.ts` | Contratos de datos | server/routes, web/screens, web/state |
| `packages/shared/src/qr.ts` | Tokens QR | scripts/smoke-journey.mjs, QR físicos |
| `content/stations/` | Copy de estaciones | docs/02-script/front-c-auditoria-y-contrato-v1.md |
| `docs/avatars/lia-andina/lia-andina-spec.md` | Spec de Lía | apps/web/src/assets/lia/ (assets), GuideAvatar.tsx |
| `apps/web/src/app.css` | Paleta CSS | lia-andina-spec.md (paleta debe coincidir) |
| `apps/web/src/App.tsx` | Rutas del frontend | EntryScreen.tsx (resumeRoute), BlockedScreen.tsx |
| `docs/05-adr/` | Decisiones cerradas | Código que implementa la decisión |
| `README.md` | Instrucciones de uso | Estado real del repo |
| `CLAUDE.md` | Instrucciones para agentes IA | Comportamiento real del proyecto |
| `scripts/smoke-journey.mjs` | Contratos API validados | server/routes/journey.ts |

**Cadencia de revisión:** Al inicio de cada fase, verificar que estos artefactos son coherentes entre sí. No al finalizar — antes de empezar.

---

## 20. Checklist de entrada y salida por fase

### Fase 0 — Alineación

**Entrada:**
- [x] Repositorio en estado limpio (`git status` sin cambios no comprometidos).
- [x] `npm run typecheck` pasa (aunque sea con código muerto).
- [x] `npm run smoke:journey` pasa.

**Salida:**
- [x] Código muerto eliminado de BlockedScreen.tsx y StationScreen.tsx.
- [x] README actualizado: stack, rutas, instrucciones de arranque, Lía Andina.
- [x] architecture-overview.md revisado y vigente.
- [x] `npm run typecheck` pasa sin errores.
- [x] `npm run smoke:journey` pasa todos los checks.
- [x] Commit: `fix(alignment): phase-0 cleanup`.
- [x] Tag: `v0.8-phase0-alignment`.

---

### Fase 5 — UX diferenciada (completar la parcial)

**Entrada:**
- [x] Fase 0 cerrada.
- [ ] Copy semilla de Frente C disponible (ya está).
- [ ] Revisión unipersonal del copy realizada por el responsable principal.

**Salida:**
- [ ] Copy de Frente C revisado y aprobado por el responsable principal, o decisión explícita de piloto con copy semilla.
- [ ] Assets de estaciones reemplazados o decisión documentada de mantener placeholders en piloto.
- [ ] Microcopy validado (al menos revisión del solo dev contra flujo real).
- [ ] `npm run typecheck` pasa.
- [ ] `npm run smoke:journey` pasa.
- [ ] Prueba manual del flujo completo ejecutada.
- [ ] Commit de cierre de fase.
- [ ] Tag: `v0.9-phase5-complete`.

---

### Fase 6 — Hardening local Windows

**Entrada:**
- [ ] Fase 5 cerrada.
- [ ] PC Windows del espacio disponible para configuración.
- [ ] Red MikroTik del espacio accesible.
- [ ] Acceso físico al espacio para instalar QR.

**Salida:**
- [x] Script de arranque Windows funciona en PC objetivo.
- [ ] IP fija configurada, QR físicos generados e instalados.
- [x] Rate limiting activo.
- [x] Logging a archivo activo.
- [x] CORS configurable y en modo piloto local.
- [ ] Sistema corre 2h continuas sin intervención.
- [ ] Smoke test pasa contra sistema en producción local.
- [ ] Prueba con visitante real de prueba ejecutada.
- [ ] Instrucciones de operación para operador no técnico escritas.
- [ ] Tag: `v1.0-field-ready`.

---

### Cierre de v1

**Entrada:**
- [ ] Fases 0, 5 y 6 cerradas.
- [ ] Todos los criterios de la sección 18 cumplidos.

**Salida:**
- [ ] Tag: `v1.0-stable`.
- [ ] README final escrito (estado v1, cómo arrancar, cómo operar, qué es deuda conocida).
- [ ] Este documento actualizado si algún criterio cambió durante la ejecución.
- [ ] Decisión explícita sobre qué entra en v1.1 o v2 (lista de deuda tolerable gestionada).

---

## Apéndice A — Correctivos previos requeridos (resumen)

Los siguientes correctivos quedaron resueltos durante la alineación de C09-C11:

| ID | Descripción | Archivo | Severidad |
|----|-------------|---------|-----------|
| C-01 | Eliminar referencia muerta a ruta `/guide` en BlockedScreen | `apps/web/src/screens/BlockedScreen.tsx:10` | Media (código muerto, no bug) |
| C-02 | Eliminar caso de error `guide_required` en StationScreen | `apps/web/src/screens/StationScreen.tsx:32` | Baja (código muerto) |
| C-03 | Actualizar README con stack real, flujo real, instrucciones correctas | `README.md` | Alta (confunde a operadores) |
| C-04 | Revisar architecture-overview.md contra arquitectura actual | `docs/04-architecture/architecture-overview.md` | Media (desfase documental) |
| C-05 | Confirmar que copy de intro/estaciones no menciona flujo de selección de avatar | `content/stations/` | Alta (coherencia con ADR-001) |

---

## Apéndice B — Decisiones cerradas (no reabrir en v1)

| Decisión | Registro | Descripción |
|----------|----------|-------------|
| Avatar único Lía Andina | ADR-001 | No hay pantalla de selección, no hay múltiples guías, GuideId es literal 'flower' |
| Sin base de datos | Architecture overview + código | Estado en memoria para v1; suficiente para el caso de uso |
| Sin audio | CLAUDE.md, master summary | Cero audio en la aplicación |
| Sin dependencia de Internet | CLAUDE.md, master summary | Operación local completa |
| UX móvil primero | CLAUDE.md, master summary | CSS y flujo diseñados para pantalla de teléfono |
| Sin escritura obligatoria del visitante | CLAUDE.md | No hay forms, no hay inputs requeridos |
| No pseudomisticismo | Contrato narrativo Frente C | Mediación técnica real, no autonomía mágica de plantas |

---

*Documento generado el 2026-04-21 a partir del estado real del repositorio GVO v0.7.0.*  
*Actualizar este documento al cerrar cada fase si alguna sección quedó desactualizada.*
