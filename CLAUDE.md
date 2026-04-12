# Proyecto: GVO — Guía Visual OKÚA

## Objetivo del producto

Construir una aplicación web local para visitantes, accesible desde móvil por QR y red local, que guíe una experiencia de introducción + 5 estaciones del proyecto de bionosificación con control de secuencia, persistencia temporal y cierre final.

## Restricciones no negociables

- Cero audio en la aplicación.
- No depender de Internet durante operación normal.
- UX móvil primero.
- Sin escritura obligatoria.
- No permitir saltarse estaciones en la primera pasada.
- La experiencia no debe parecer una página informativa tradicional.
- El sistema no debe interferir con el sistema principal de bionosificación.

## Infraestructura objetivo

- PC Windows como servidor local.
- Router MikroTik para red de visitantes.
- QR inicial y QR por estación.
- Navegador móvil como cliente.

## Modo de trabajo

- Un solo desarrollador.
- Sin PR obligatoria.
- `main` es rama estable.
- Ramas cortas opcionales para trabajos riesgosos o largos.
- Cambios en incrementos pequeños y verificables.
- Si el cambio toca muchos archivos, proponer plan antes de editar.

## Entregables por fases

1. Base documental y gobierno del repo.
2. MVP shell: acceso, bienvenida, navegación base.
3. Sesión temporal + secuencia + gating por QR.
4. Cierre final + revisión libre.
5. UX diferenciada por estación.
6. Hardening local: rendimiento, concurrencia y seguridad básica.

## Reglas técnicas

- No introducir dependencias de runtime que obliguen nube o servicios externos.
- No commitear secretos, tokens ni credenciales.
- Separar contenido del código cuando tenga sentido.
- Mantener arquitectura entendible para mantenimiento por una sola persona.
- Actualizar documentación si cambia producto, arquitectura o despliegue.

## Documentación a revisar según tarea

- `AGENTS.md`
- `docs/00-master/`
- `docs/01-product/`
- `docs/04-architecture/`
- `docs/06-operations/`
- `docs/07-testing/`

## Cierre esperado de cada tarea

Antes de cerrar una tarea:

- resumir qué se hizo;
- listar archivos tocados;
- indicar validaciones ejecutadas;
- indicar pruebas manuales sugeridas o ejecutadas;
- decir si corresponde commit;
- actualizar documentación si aplica.
