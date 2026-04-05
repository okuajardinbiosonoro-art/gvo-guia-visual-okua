# Arquitectura general — visión inicial

## Capas principales

### 1. Capa visitante
Aplicación web móvil local.

Responsabilidades:
- render de experiencia;
- navegación;
- validación de flujo;
- consulta de progreso;
- interacción por estación.

### 2. Capa servidor local
Servicio local alojado en PC Windows.

Responsabilidades:
- creación y mantenimiento de sesión temporal;
- validación de QR / estaciones;
- control de secuencia;
- persistencia temporal;
- entrega de contenido y estado.

### 3. Capa de red local
Router MikroTik y red de visitantes.

Responsabilidades:
- acceso local controlado;
- aislamiento básico respecto al sistema principal;
- disponibilidad del servicio al visitante.

## Reglas arquitectónicas iniciales

- separar frontend y backend;
- no acoplar contenido narrativo al código más de lo necesario;
- no exponer rutas administrativas al visitante;
- mantener estado temporal simple y reemplazable;
- preferir soluciones mantenibles por una sola persona.

## Pendientes a fijar

- stack frontend;
- stack backend;
- formato de contenido de estaciones;
- estrategia concreta de sesión;
- diseño de QR y validación;
- mecanismo de arranque del servicio en Windows.
