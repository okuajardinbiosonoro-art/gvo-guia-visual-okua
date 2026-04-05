---
name: qr-flow-check
description: Revisar o diseñar el flujo de acceso y gating por QR para el recorrido local.
---

# Skill: qr-flow-check

Usa esta skill cuando la tarea implique acceso inicial, QR de estaciones, secuencia o recuperación de sesión.

## Revisiones obligatorias

- ¿el QR inicial lleva al inicio correcto?
- ¿la sesión se crea o recupera de forma clara?
- ¿el usuario puede ser orientado si se salta una estación?
- ¿la validación de estación respeta la secuencia?
- ¿el flujo sigue siendo usable para móvil?

## Reglas

- minimizar fricción;
- no requerir escritura;
- no asumir Internet;
- no exponer rutas internas innecesarias;
- distinguir acceso inicial, gating y post-final.
