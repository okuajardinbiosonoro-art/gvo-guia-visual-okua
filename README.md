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

## 4. Meta de la versión inicial

La versión inicial debe cubrir como mínimo:

- acceso inicial por QR;
- pantalla de bienvenida;
- selección de guía visual;
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
├─ README.md
├─ AGENTS.md
├─ CLAUDE.md
├─ docs/
├─ apps/
│  ├─ web/
│  └─ server/
├─ packages/
│  └─ shared/
├─ content/
│  ├─ stations/
│  ├─ avatars/
│  └─ qr/
├─ assets/
├─ scripts/
├─ tests/
└─ .claude/
   ├─ settings.json
   └─ skills/
```

## 6. Flujo de trabajo

Este proyecto usa un flujo **solo-dev**:

- `main` es la rama estable.
- No hay PR obligatoria.
- Se permiten ramas cortas solo cuando el cambio sea riesgoso o tome varias sesiones.
- Cada ticket debe cerrar con validación explícita.
- No se mezcla en un solo ticket una refactorización grande con una funcionalidad nueva.
- Toda decisión relevante debe dejar huella en `docs/`.

## 7. Orden recomendado de ejecución

1. consolidar documentación base;
2. fijar stack del MVP;
3. scaffold de `apps/web` y `apps/server`;
4. implementar shell funcional del MVP;
5. implementar secuencia y sesiones;
6. integrar QR y validaciones;
7. enriquecer UX/interacciones por estación;
8. pruebas controladas;
9. piloto;
10. estabilización.

## 8. Primer commit recomendado

Este paquete está diseñado para servir como **primer commit estructural** del proyecto.

Sugerencia de mensaje:

```bash
git add .
git commit -m "chore: initialize GVO repository structure and project governance"
```

---

## 9. Arranque técnico (scaffold v0.1)

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

El script verifica 10 puntos del flujo: health, meta, entry token válido e inválido, creación de sesión, selección de guía, visita intro, QR en secuencia, QR fuera de secuencia y contratos de error uniformes. Sale con código distinto de 0 si algo falla.

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
| `POST` | `/api/journey/session/:id/guide` | Selecciona guía visual |
| `POST` | `/api/journey/session/:id/intro` | Registra visita a la introducción |
| `POST` | `/api/journey/session/:id/station/:n` | Registra visita a estación 1–5 (valida secuencia) |
| `POST` | `/api/journey/session/:id/finalize` | Finaliza recorrido (requiere estación 5 visitada) |
| `POST` | `/api/journey/session/:id/scan/:token` | Resuelve token QR → estación y registra avance |

El TTL de sesión es configurable con la variable de entorno `SESSION_TTL_MS` (por defecto 4 horas).

### Token de acceso inicial

El QR de entrada del espacio apunta a la ruta `/entry/<token>`:

```text
http://<ip-servidor>:5173/entry/okua-entry
```

- Token válido: redirige al punto correcto del recorrido (guía, intro o próxima estación pendiente).
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

La URL de QR completa para imprimir en el espacio es: `http://<ip-servidor>:5173/qr/<token>`

### Modo de operación: laboratorio vs campo

Configurable en `apps/web/.env.local` mediante `VITE_APP_MODE`:

| Valor | Comportamiento |
| ----- | -------------- |
| `lab` (por defecto) | El botón "Continuar sin QR" es visible en estaciones — permite navegar sin escanear QR físico |
| `field` | El bypass manual queda oculto — el visitante debe escanear el QR de cada estación para avanzar |

```bash
# apps/web/.env.local
VITE_APP_MODE=lab    # desarrollo
VITE_APP_MODE=field  # uso real en el espacio
```

### Prueba de acceso inicial (laboratorio)

```text
http://localhost:5173/entry/okua-entry  → acceso válido, redirige al punto del recorrido
http://localhost:5173/entry/invalido    → pantalla "Código no reconocido"
```

### Prueba de QR de estación sin cámara (laboratorio)

```text
http://localhost:5173/qr/okua-e1   → desbloquea estación 1 (si la sesión está en orden)
http://localhost:5173/qr/okua-e3   → sequence_violation si no se visitaron 1 y 2 antes
http://localhost:5173/qr/invalido  → pantalla "Código no reconocido"
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

### Assets visuales por estación (Ticket 0.7)

Los assets estáticos (ilustraciones, diagramas, imágenes) se organizan por estación bajo `assets/stations/`:

```
assets/stations/
├── intro/         ← assets de la introducción
├── station-1/     ← assets de Estación I
├── station-2/     ← assets de Estación II
├── station-3/     ← assets de Estación III
├── station-4/     ← assets de Estación IV
└── station-5/     ← assets de Estación V
```

Actualmente todos los directorios contienen `.gitkeep` — son **estructura preparada, sin assets de producción todavía**.

Cada estación puede declarar un hero visual en su campo `visual` dentro de `content/stations/station-N.ts`:

```typescript
visual: {
  hero: {
    type: 'placeholder',   // 'placeholder' | 'image'
    label: '[ Señales bioeléctricas ]',
    caption: 'Lo que el sistema registra',
    // src: 'stations/station-2/diagram.png'  ← cuando type='image'
  },
  tone: 'cool',   // 'default' | 'warm' | 'cool' | 'cold' | 'neutral'
}
```

Para conectar una imagen real: coloca el archivo en `assets/stations/station-N/`, cambia `type` a `'image'` y añade `src` con la ruta relativa al directorio `assets/`. El componente `StationHero` en `apps/web/src/components/StationHero.tsx` maneja ambos modos sin cambios al código.

**Bloques de contenido (`ContentBlock`):**
- `paragraph` — texto normal
- `note` — observación destacada (borde acento)
- `hint` — instrucción contextual (texto muted)
- `heading` — encabezado dentro de la estación

El contenido de esta versión es **semilla funcional**, alineado con la narrativa base del proyecto. El guion final se afina en tickets posteriores sin tocar la lógica de sesión o QR.

El frontend carga el contenido desde `apps/web/src/lib/content.ts` vía el alias `@content` (configurado en `vite.config.ts` y `tsconfig.json`). La lógica de sesión y secuencia no toca este módulo.

### Qué incluye el estado actual (Tickets 0.1 – 0.5)

- Workspace npm con `apps/web`, `apps/server`, `packages/shared`.
- Shell funcional del recorrido (bienvenida, guía, intro, 5 estaciones, cierre).
- Sesión temporal en memoria del servidor con TTL de 4 horas.
- Validación de secuencia en backend (intro → estaciones 1–5 → finalización).
- Token de acceso inicial (`okua-entry`) con ruta `/entry/:token` y redirección inteligente.
- Tokens QR por estación; flujo `/qr/:token` resuelve y registra avance real.
- Modo de operación `lab`/`field` configurable vía `VITE_APP_MODE`; bypass visible solo en lab.
- Frontend integrado con API real; sin URLs dispersas (todas pasan por `api.ts`).
- `VITE_API_BASE_URL` y `VITE_APP_MODE` consumidos activamente desde `config.ts`.
- Rehidratación básica de sesión tras refresh de página.
- `typecheck` y `dev:server` ya no compilan shared (server tsconfig resuelve desde source via paths).
- Contrato de errores mutadores uniforme: todas las respuestas de error incluyen `ok: false`.
- Contenido narrativo centralizado en `content/stations/` con tipos en `packages/shared/src/content.ts`.
- Capa visual por estación: `StationHero` + modelo `StationVisual` + tono por estación.
- Assets scaffolded en `assets/stations/` (estructura lista; imágenes/diagramas en tickets siguientes).
- Versionado alineado en todos los paquetes: `0.7.0`.

### Qué NO incluye todavía

- Escaneo de QR por cámara dentro del navegador.
- Estaciones con contenido narrativo y visual final.
- Guías visuales con ilustraciones finales (actualmente SVG placeholder).
- Base de datos, autenticación, panel administrativo.
- Docker, despliegue en producción.
