# Validación de piloto de laboratorio

## Propósito

Este kit permite validar el piloto local de GVO con una corrida prolongada y una prueba concurrente básica antes de pasar a campo.

## Prerrequisitos

- `npm install`
- `npm run build`
- Backend levantado con `npm start` o `npm run start:windows`
- `http://localhost:3001` respondiendo en `/health`

## Comandos

Soak test:

```bash
npm run pilot:soak -- --base-url http://localhost:3001 --minutes 1
```

Prueba concurrente:

```bash
npm run pilot:concurrency -- --base-url http://localhost:3001 --sessions 3
```

Generación de QR:

```bash
npm run qr:generate -- --base-url http://localhost:3001
```

## Interpretación básica

- Si el soak reporta fallos en `/health` o `/api/meta`, el backend no está estable para seguir.
- Si la prueba concurrente falla al crear sesiones o avanzar intro/estación 1, hay una regresión de flujo o una restricción de rate limit que hay que revisar.
- Los reportes se escriben en `reports/pilot-validation/` y sirven como evidencia de la corrida.

## Limitaciones

- El soak no reemplaza una prueba de 2h real en el espacio.
- La concurrencia es básica, no un load test industrial.
- El kit no reemplaza la verificación manual de QR físicos ni la revisión de red final.

## Qué sigue siendo manual o de campo

- IP/hostname definitivo.
- Impresión e instalación física de QR.
- Prueba real con móvil en el espacio.
- Corrida continua de 2h en entorno de operación.
