# Arquitectura general — estado actual

## Stack

- Frontend: React 18 + TypeScript + Vite 5.
- Backend: Node.js + TypeScript + Fastify 5.
- Shared: `packages/shared` (`@gvo/shared`) con tipos, meta y tokens QR.
- Contenido editorial: `content/stations/` para la introducción y las 5 estaciones.
- Assets del cliente: `apps/web/src/assets/` para recursos visuales usados hoy en la web.

## Estructura del monorepo

- `apps/web` - cliente React mobile-first.
- `apps/server` - servidor Fastify con sesiones temporales en memoria.
- `packages/shared` - contratos compartidos, utilidades QR y `GVO_META`.
- `content/` - contenido narrativo del recorrido.
- `docs/` - producto, arquitectura, operación y pruebas.
- `scripts/` - smoke tests y utilidades del repo.

## Flujo de sesión

- Entrada por QR: `/entry/:token` valida el acceso inicial y habilita la sesión.
- Inicio del recorrido: `/intro` registra la introducción en la sesión.
- QR por estación: `/qr/:token` resuelve el token y ejecuta `visitStation`.
- Primera pasada secuencial: el backend bloquea saltos y el frontend muestra `BlockedScreen`.
- Cierre: completar la estación 5 habilita `/final` y marca la sesión como finalizada.
- Revisita libre: después de completar el recorrido, las estaciones pueden revisitarse sin restricción de secuencia.

## Modos de operación

- `lab`: desarrollo local, atajos visibles en la interfaz y bypass manual permitido solo como apoyo de prueba.
- `field`: operación real en el espacio, sin bypass visible desde la bienvenida ni desde las estaciones.

## Límites actuales conocidos

- Sesiones en memoria, sin persistencia entre reinicios del servidor.
- Sin rate limiting.
- Sin logging persistente de sesiones.
- Sin script de arranque automático en Windows.

## Próximo hardening

- Script de arranque en Windows.
- Logging básico de sesiones y errores del flujo.
- Rate limiting local.

