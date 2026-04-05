# AGENTS.md

Este documento define cómo deben trabajar los agentes de IA y el desarrollador humano dentro de este repositorio.

## 1. Naturaleza del proyecto

**GVO (Guía Visual OKÚA)** es una aplicación web local para mediación del proyecto de bionosificación. No es una web informativa convencional. Debe sentirse como una experiencia guiada, inmersiva y controlada.

## 2. Rol del agente

El agente debe actuar como apoyo de desarrollo, documentación, diseño técnico y validación, no como una fuente de improvisación desanclada del repositorio.

Toda propuesta debe respetar la documentación del proyecto y dejar trazabilidad en el repositorio.

## 3. Líneas rojas del producto

Nunca proponer ni introducir cambios que violen estas reglas sin aprobación explícita documentada:

- no audio;
- no dependencia operativa de Internet;
- no formularios ni escritura obligatoria para el visitante;
- no saltos libres en la primera pasada;
- no exponer complejidad administrativa al visitante;
- no interferir con el sistema principal de bionosificación;
- no convertir la experiencia en una web plana tipo revista o periódico.

## 4. Principios de implementación

- priorizar claridad antes que complejidad;
- trabajar por incrementos pequeños y verificables;
- separar contenido, UX y lógica técnica cuando sea posible;
- documentar decisiones importantes;
- no introducir dependencias que obliguen a servicios cloud en runtime;
- no almacenar secretos en el repositorio.

## 5. Regla de tickets

Todo trabajo relevante debe partir de un ticket o subticket explícito.

Cada ticket debe declarar como mínimo:

- objetivo;
- alcance;
- fuera de alcance;
- archivos esperados a tocar;
- restricciones;
- validaciones automáticas;
- pruebas manuales;
- criterios de aceptación;
- cierre documental;
- criterio de commit.

## 6. Regla de tamaño de cambio

No mezclar en un mismo cambio:

- una refactorización amplia;
- una nueva funcionalidad;
- un cambio visual grande;
- y una decisión arquitectónica mayor.

Si aparecen juntas, se deben dividir.

## 7. Regla de honestidad técnica

Si una tarea no puede cerrarse bien, el agente debe decirlo explícitamente y dejar:

- qué quedó hecho;
- qué no quedó hecho;
- por qué;
- qué bloquea;
- cuál es el siguiente paso correcto.

## 8. Git y ramas

Flujo adoptado: **solo-dev**.

- rama principal: `main`
- sin PR obligatoria
- ramas cortas opcionales para trabajos de riesgo o varias sesiones
- merge manual por el propio desarrollador
- tags para hitos importantes

## 9. Criterio de documentación mínima

Si cambia alguno de estos elementos, la documentación debe actualizarse en el mismo trabajo:

- alcance del producto
- arquitectura
- flujo de usuario
- comandos de desarrollo
- estrategia de despliegue
- decisiones estructurales

## 10. Criterio de validación antes de cerrar

Antes de cerrar un ticket, revisar:

1. ¿cumple el objetivo?
2. ¿respeta líneas rojas?
3. ¿tiene pruebas?
4. ¿deja documentación consistente?
5. ¿el cambio es mantenible por una sola persona?

## 11. Regla para Claude Code

Cuando Claude Code trabaje en este repositorio:

- debe leer `CLAUDE.md`;
- debe revisar la documentación relevante en `docs/`;
- debe preferir cambios pequeños;
- debe proponer plan antes de tocar múltiples archivos;
- debe usar skills del proyecto cuando sean pertinentes.
