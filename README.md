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
- selección de avatar;
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
# Frontend (http://localhost:5173)
npm run dev:web

# Backend (http://localhost:3001)
npm run dev:server
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

### API del recorrido (Tickets 0.3 – 0.4)

El servidor expone los siguientes endpoints:

| Método | Ruta | Descripción |
| ------ | ---- | ----------- |
| `POST` | `/api/journey/session` | Crea una nueva sesión temporal |
| `GET` | `/api/journey/session/:id` | Recupera sesión si no ha expirado (TTL: 4h) |
| `POST` | `/api/journey/session/:id/guide` | Selecciona guía visual |
| `POST` | `/api/journey/session/:id/intro` | Registra visita a la introducción |
| `POST` | `/api/journey/session/:id/station/:n` | Registra visita a estación 1–5 (valida secuencia) |
| `POST` | `/api/journey/session/:id/finalize` | Finaliza recorrido (requiere estación 5 visitada) |
| `POST` | `/api/journey/session/:id/scan/:token` | Resuelve token QR → estación y registra avance |

El TTL de sesión es configurable con la variable de entorno `SESSION_TTL_MS` (por defecto 4 horas).

### Tokens QR disponibles

Los tokens están definidos en `packages/shared/src/qr.ts` y pueden cambiarse sin tocar la lógica:

| Token | Estación |
| ----- | -------- |
| `okua-e1` | 1 — Origen y propósito |
| `okua-e2` | 2 — Señales bioeléctricas |
| `okua-e3` | 3 — Prototipos y evolución |
| `okua-e4` | 4 — Operación técnica |
| `okua-e5` | 5 — Estado actual |

La URL de QR completa para imprimir en laboratorio es: `http://<ip-servidor>:5173/qr/<token>`

### Prueba de QR sin cámara (laboratorio)

Abre directamente en el navegador cualquiera de estas URLs:

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

### Qué incluye el estado actual (Tickets 0.1 – 0.4)

- Workspace npm con `apps/web`, `apps/server`, `packages/shared`.
- Shell funcional del recorrido (bienvenida, guía, intro, 5 estaciones, cierre).
- Sesión temporal en memoria del servidor con TTL de 4 horas.
- Validación de secuencia en backend (intro → estaciones 1–5 → finalización).
- Tokens QR por estación; flujo `/qr/:token` resuelve y registra avance real.
- Frontend integrado con API real; sin URLs dispersas (todas pasan por `api.ts`).
- `VITE_API_BASE_URL` consumido activamente desde `config.ts`.
- Rehidratación básica de sesión tras refresh de página.
- Estaciones en primera pasada muestran hint de QR; botón de fallback para laboratorio.
- `typecheck` y `dev:server` ya no compilan shared (server tsconfig resuelve desde source via paths).
- Contrato de errores mutadores uniforme: todas las respuestas de error incluyen `ok: false`.

### Qué NO incluye todavía

- Escaneo de QR por cámara dentro del navegador.
- Estaciones con contenido narrativo y visual final.
- Avatar y guías con ilustraciones finales.
- Base de datos, autenticación, panel administrativo.
- Docker, despliegue en producción.
