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
