---
name: local-security-scan
description: Revisar riesgos básicos de seguridad y exposición innecesaria del servicio local para visitantes.
---

# Skill: local-security-scan

Usa esta skill para revisar el hardening básico del entorno local del recorrido.

## Checklist base

- rutas administrativas no expuestas al visitante;
- no listing de directorios;
- manejo de errores sin trazas visibles al visitante;
- exposición mínima de puertos;
- separación razonable entre red visitante y sistema principal;
- secretos fuera del repo;
- dependencias externas no requeridas en runtime.

## Salida esperada

- hallazgos
- severidad
- recomendación concreta
- archivos/configuración implicados
