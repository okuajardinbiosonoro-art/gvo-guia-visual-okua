# Estrategia de pruebas — base

## Objetivo

Validar que GVO funcione con estabilidad razonable en laboratorio antes del piloto de campo.

## Capas de prueba

### 1. Pruebas unitarias
Para utilidades, contratos, validaciones y reglas de secuencia.

### 2. Pruebas de integración
Para sesión, persistencia temporal, validación de QR y flujo entre frontend/backend.

### 3. Pruebas manuales UX
Para navegación móvil, visualización, bloqueos de secuencia y recuperación de sesión.

### 4. Pruebas de laboratorio
Para red local, varios dispositivos, tiempos de carga y coexistencia básica con el entorno.

## Casos mínimos obligatorios del MVP

- entrar por URL/QR inicial;
- completar intro;
- elegir avatar;
- intentar saltar estación;
- avanzar estación correcta;
- cerrar y reabrir sesión dentro del tiempo válido;
- completar recorrido;
- acceder a menú libre post-final.

## Criterio de cierre de ticket técnico

Un ticket técnico no se cierra solo porque compile.
Debe dejar:
- validación técnica;
- prueba manual mínima;
- nota de riesgo residual si existe.
