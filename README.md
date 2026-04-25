# GVO — Guía Visual OKÚA

Repositorio oficial del proyecto **GVO (Guía Visual OKÚA)**.

## 1. Qué es GVO

GVO es una aplicación web local, accesible desde dispositivos móviles por medio de códigos QR y una red local, diseñada para complementar la mediación presencial del proyecto de bionosificación.

Su función no es reemplazar al guía humano. Su función es aportar una segunda capa de mediación: más estable, más clara, más visual y más rigurosa.

## 2. Principios no negociables

- Cero audio dentro de la aplicación.
- Operación normal sin dependencia de Internet.
- Experiencia pensada primero para móvil.
- Sin escritura obligatoria para el visitante.
- Secuencia obligatoria en la primera pasada.
- La aplicación debe complementar el espacio, no competir contra él.
- La experiencia debe ser inmersiva y clara, no parecer una página informativa tradicional.
- El sistema no debe interferir con la operación del sistema principal de bionosificación.

## 3. Infraestructura objetivo

- **Servidor local:** PC Windows del espacio.
- **Red:** router MikroTik con red de visitantes separada.
- **Acceso:** QR inicial + QR por estación.
- **Cliente:** navegador móvil del visitante.

## 4. Funcionalidades incluidas en la versión inicial

La versión inicial incluye:

- acceso inicial por QR;
- pantalla de bienvenida;
- integración de Lía Andina como avatar-guía único;
- introducción + 5 estaciones;
- control de secuencia;
- advertencia ante saltos;
- persistencia temporal de sesión;
- cierre final;
- revisión libre posterior a finalización;
- compatibilidad móvil razonable;
- despliegue local en Windows.

## 5. Estructura del repositorio

```text
.
├─ apps/
│  ├─ web/
│  └─ server/
├─ packages/
│  └─ shared/
├─ content/
│  └─ stations/
├─ docs/
├─ scripts/
├─ README.md
├─ AGENTS.md
└─ CLAUDE.md
```

## 6. Flujo de trabajo

Este proyecto usa un flujo **solo-dev**:

- `main` es la rama estable.
- No hay PR obligatoria.
- Se permiten ramas cortas solo cuando el cambio sea riesgoso o tome varias sesiones.
- Cada ticket debe cerrar con validación explícita.
- No se mezcla en un solo ticket una refactorización grande con una funcionalidad nueva.
- Toda decisión relevante debe dejar huella en `docs/`.

## 7. Flujo actual

1. El visitante abre el QR inicial o la ruta `/entry/okua-entry`.
2. El backend valida el token de entrada y el cliente crea o reanuda la sesión temporal.
3. El recorrido pasa por `/intro`.
4. Las estaciones 1 a 5 se resuelven con `/qr/:token`.
5. La estación 5 habilita `/final`.
6. Tras completar el primer paso, la revisita a estaciones ya visitadas queda libre.

## 8. Stack actual

### Stack

| Capa | Tecnología |
|---|---|
| Frontend | React 18 + TypeScript + Vite 5 |
| Backend | Node.js + TypeScript + Fastify 5 |
| Workspace | npm workspaces (monorepo) |
| Tipos compartidos | `packages/shared` (`@gvo/shared`) |

### Requisitos previos

- Node.js >= 18
- npm >= 8

### Instalación

```bash
# Desde la raíz del repo
npm install
```

### Desarrollo

```bash
# Backend + Frontend en paralelo (recomendado)
npm run dev

# O por separado:
npm run dev:server   # Backend  — http://localhost:3001
npm run dev:web      # Frontend — http://localhost:5173
```

### Build

```bash
# Compila shared → web → server
npm run build
```

### Typecheck

```bash
npm run typecheck
```

### Smoke test del flujo de recorrido

Verifica que los contratos de la API estén operativos. Requiere el backend corriendo.

```bash
npm run dev:server   # en una terminal
npm run smoke:journey  # en otra terminal
```

O con ambos corriendo:

```bash
npm run smoke:journey
```

El script verifica 9 puntos del flujo: health, meta, entry token válido e inválido, creación de sesión, visita intro, QR en secuencia, QR fuera de secuencia y contratos de error uniformes. Sale con código distinto de 0 si algo falla.

### Verificar que el servidor está vivo

```
GET http://localhost:3001/health
GET http://localhost:3001/api/meta
```

### Configuración de URL del backend

El frontend lee la URL base del servidor desde la variable de entorno `VITE_API_BASE_URL`
(definida en `apps/web/src/config.ts`).

Crea `apps/web/.env.local` a partir del ejemplo:

```bash
# Git Bash / macOS / Linux
cp apps/web/.env.example apps/web/.env.local
```

```powershell
# PowerShell (Windows)
Copy-Item apps/web/.env.example apps/web/.env.local
```

O duplica manualmente el archivo `apps/web/.env.example` y renómbralo `.env.local`.

| Escenario | Valor recomendado |
| --- | --- |
| Desarrollo local (proxy Vite activo) | dejar vacío — el proxy reenvía `/api/*` a `:3001` |
| Red local directa (sin proxy) | `http://192.168.X.X:3001` |

El archivo `apps/web/.env.local` está ignorado por `.gitignore`. El ejemplo documentado es `apps/web/.env.example`.

### API del recorrido (Tickets 0.3 – 0.5)

El servidor expone los siguientes endpoints:

| Método | Ruta | Descripción |
| ------ | ---- | ----------- |
| `POST` | `/api/journey/entry/:token` | Valida token de acceso inicial al recorrido |
| `POST` | `/api/journey/session` | Crea una nueva sesión temporal |
| `GET` | `/api/journey/session/:id` | Recupera sesión si no ha expirado (TTL: 4h) |
| `POST` | `/api/journey/session/:id/intro` | Registra visita a la introducción |
| `POST` | `/api/journey/session/:id/station/:n` | Registra visita a estación 1–5 (valida secuencia) |
| `POST` | `/api/journey/session/:id/finalize` | Finaliza recorrido (requiere estación 5 visitada) |
| `POST` | `/api/journey/session/:id/scan/:token` | Resuelve token QR → estación y registra avance |

El TTL de sesión es configurable con la variable de entorno `SESSION_TTL_MS` (por defecto 4 horas).

### Token de acceso inicial

El QR de entrada del espacio apunta a la ruta `/entry/<token>`:

```text
<BASE_URL>/entry/okua-entry
```

- Token válido: redirige al siguiente paso pendiente del recorrido.
- Sesión reanudada automáticamente si existe y está vigente.
- Token inválido: pantalla "Código no reconocido".

El token de entrada es distinto de los tokens por estación — no desbloquea ninguna estación.

### Tokens QR por estación

Los tokens están definidos en `packages/shared/src/qr.ts` y pueden cambiarse sin tocar la lógica:

| Token | Estación |
| ----- | -------- |
| `okua-e1` | 1 — Origen y propósito |
| `okua-e2` | 2 — Señales bioeléctricas |
| `okua-e3` | 3 — Prototipos y evolución |
| `okua-e4` | 4 — Operación técnica |
| `okua-e5` | 5 — Estado actual |

La URL de QR completa para imprimir en el espacio es: `<BASE_URL>/qr/<token>`

### Modo de operación: laboratorio vs campo

Configurable en `apps/web/.env.local` mediante `VITE_APP_MODE`:

| Valor | Comportamiento |
| ----- | -------------- |
| `lab` (por defecto) | El botón "Continuar sin QR" es visible en estaciones y la bienvenida muestra acceso directo de desarrollo |
| `field` | El bypass manual queda oculto en estaciones y la bienvenida solo instruye a escanear el QR de entrada |

```bash
# apps/web/.env.local
VITE_APP_MODE=lab    # desarrollo
VITE_APP_MODE=field  # uso real en el espacio
```

### Prueba de acceso inicial (laboratorio)

```text
http://localhost:3001/entry/okua-entry  → acceso válido, redirige al punto del recorrido
http://localhost:3001/entry/invalido    → pantalla "Código no reconocido"
```

### Prueba de QR de estación sin cámara (laboratorio)

```text
http://localhost:3001/qr/okua-e1   → desbloquea estación 1 (si la sesión está en orden)
http://localhost:3001/qr/okua-e3   → sequence_violation si no se visitaron 1 y 2 antes
http://localhost:3001/qr/invalido  → pantalla "Código no reconocido"
```

### Persistencia de sesión y prueba de refresh

La sesión del visitante se guarda en `sessionStorage` bajo la clave `gvo_session_id`.

Para probar la recuperación tras refresh:

1. Inicia el recorrido y avanza algunas estaciones.
2. Recarga la página (`F5` / pull-to-refresh).
3. El frontend recupera la sesión del backend automáticamente.
4. Si la sesión expiró o no existe en el backend, se crea una nueva sesión limpia.

### Contenido narrativo de estaciones (Ticket 0.6)

El contenido de la introducción y las cinco estaciones vive en `content/stations/`:

```
content/stations/
├── index.ts       ← punto de entrada; re-exporta todo
├── intro.ts       ← introducción (paso 0)
├── station-1.ts   ← Origen y propósito
├── station-2.ts   ← Señales bioeléctricas
├── station-3.ts   ← Prototipos y evolución
├── station-4.ts   ← Operación técnica
└── station-5.ts   ← Estado actual
```

**Para editar el guion:** modifica el archivo de la estación correspondiente. Cada archivo exporta un objeto `StationContent` (tipos en `packages/shared/src/content.ts`) con campos: `title`, `subtitle`, `blocks`, `cta`, `qrHint`, `visual`.

### Assets visuales por estación

Los assets visuales runtime viven en `apps/web/src/assets/stations/`.
El staging editorial vive en `assets/stations/`.

**Estado F8:**

- Estación II: ilustración SVG técnica integrada y aprobada.
  `apps/web/src/assets/stations/station-2/diagram-bioelectric-chain.svg`

- Estación V: fotografía del montaje real integrada y aprobada.
  `apps/web/src/assets/stations/station-5/hero-current-montage.webp`

- Estación IV: usa `SignalFlowDiagram` con `hero.type:'diagram'`
  y `diagramId:'signal-flow'`.

- Intro, Estación I y Estación III: placeholders CSS aceptados para piloto.

**Patrón correcto de integración de assets:**

1. Producir/revisar asset en `assets/stations/station-N/`.
2. Copiar a `apps/web/src/assets/stations/station-N/`.
3. Importar en `apps/web/src/lib/content.ts` como módulo ES.
4. Asignar en `stationHeroSrc[id]` o `introHeroSrc`.
5. En `content/stations/station-N.ts`, cambiar `hero.type` a `'image'`
   y ajustar `label`/`caption` si aplica.
6. **Mantener `src` fuera de `content/stations/*.ts`.** El campo `src` lo inyecta
   `withStationHero()` desde `lib/content.ts`.

**Tipos vigentes de `VisualHero`:** `'placeholder'` | `'image'` | `'diagram'`

**Bloques de contenido (`ContentBlock`):**
- `paragraph` — texto normal
- `note` — observación destacada (borde acento)
- `hint` — instrucción contextual (texto muted)
- `heading` — encabezado dentro de la estación

El frontend carga el contenido desde `apps/web/src/lib/content.ts` vía el alias
`@content` (configurado en `vite.config.ts` y `tsconfig.json`). La lógica de
sesión y secuencia no toca este módulo.

### Qué incluye el estado actual (v0.9.0-rc.1 — F8 cerrada)

- Workspace npm con `apps/web`, `apps/server`, `packages/shared`.
- Shell funcional del recorrido (bienvenida, intro, 5 estaciones, cierre) con Lía Andina como avatar-guía único.
- Sesión temporal en memoria del servidor con TTL de 4 horas.
- Validación de secuencia en backend (intro → estaciones 1–5 → finalización).
- Token de acceso inicial (`okua-entry`) con ruta `/entry/:token` y redirección inteligente.
- Tokens QR por estación; flujo `/qr/:token` resuelve y registra avance real.
- Modo de operación `lab`/`field` configurable vía `VITE_APP_MODE`; bypass visible solo en lab y bienvenida sin acceso directo en field.
- Frontend integrado con API real; sin URLs dispersas (todas pasan por `api.ts`).
- `VITE_API_BASE_URL` y `VITE_APP_MODE` consumidos activamente desde `config.ts`.
- Rehidratación básica de sesión tras refresh de página.
- `typecheck` y `dev:server` ya no compilan shared (server tsconfig resuelve desde source via paths).
- Contrato de errores mutadores uniforme: todas las respuestas de error incluyen `ok: false`.
- Contenido narrativo centralizado en `content/stations/` con tipos en `packages/shared/src/content.ts`.
- Capa visual por estación: `StationHero` + modelo `StationVisual` + tono por estación.
- Assets del cliente organizados en `apps/web/src/assets/` con recursos actuales de Lía Andina.
- Versionado alineado en todos los paquetes: `0.9.0-rc.1`.

### Qué NO incluye todavía

- Assets visuales finales para Intro, Estación I y Estación III
  (placeholders CSS aceptados para piloto por decisión explícita).
- Iconografía SVG final para Estación IV
  (diferida; `SignalFlowDiagram` funciona con fallback simbólico).
- Validación con visitantes reales en campo (piloto pendiente).
- QR físicos finales impresos y verificados contra host/IP de campo.
- Prueba de red local completa con dispositivos móviles reales.
- Escaneo de QR por cámara dentro del navegador
  (decisión cerrada por ADR-002 para v1; revisable solo en v2+ con evidencia).
- Lía Andina en 3D runtime
  (decisión cerrada por ADR-002 para v1; pipeline no iniciado).
- Base de datos, autenticación, panel administrativo.
- Docker, despliegue en producción.
