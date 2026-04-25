# GVO F9-03T - QA movil iPhone laboratorio

## 1. Proposito

Este documento registra la QA movil real en laboratorio con iPhone SE de segunda generacion + Chrome.

No declara piloto ejecutado.
No declara QR finales de campo.
No declara recorrido completo de campo.
Puede desbloquear F9-04 solo para recorrido completo de laboratorio si se valida flujo field-like desde movil real.

## 2. Estado heredado

- F9-03R quedo `BLOQUEADO`.
- F9-03S quedo `BLOQUEADO`.
- Motivo: no habia movil real documentado en el reporte.
- Ahora el responsable aporta evidencia de uso con iPhone SE de segunda generacion + Chrome.

## 3. Evidencia aportada por responsable

- Dispositivo: iPhone SE de segunda generacion.
- Navegador: Chrome.
- Red: red Wi-Fi de laboratorio aprobada.
- IP servidor observada: `192.168.1.74`.
- Dev frontend observado: `http://192.168.1.74:5173/`.
- Backend observado: `http://192.168.1.74:3001`.
- Resultado visual reportado: acceso correcto, informacion visible y sin errores de presentacion relevantes.
- Logs aportados: sesiones, intro, estaciones 1 a 5 y finalizacion.
- Observacion: los logs muestran backend con `host:"localhost:3001"` y `remoteAddress:"127.0.0.1"`, por lo que esa evidencia se clasifica como dev/proxy y no como prueba directa de red movil contra Fastify.
- Observacion adicional: en los logs se vio un `400` inicial al intentar saltar a estacion 5, coherente con bloqueo de secuencia si se omite el orden.

No incluir contraseña Wi-Fi.
No incluir SSID real si no esta aprobado para repo publico.

## 4. Validacion local automatica

| Validacion | Resultado |
| --- | --- |
| `npm run typecheck` | pasa |
| `npm run build` | pasa |
| `npm run smoke:journey` | pasa |

## 5. Servidor field-like

Se levanto servidor field-like en terminal separada con `npm start`.

Confirmacion local:

- Servidor backend activo.
- SPA servida por Fastify.
- Puerto `3001` activo.
- URL LAN visible en consola:
  - `http://192.168.1.74:3001`
  - y `http://127.0.0.1:3001`
- `npm run verify:local` paso contra `http://localhost:3001` como verificacion de salud local.

Nota:

`npm start` y `npm run start:windows` pueden quedar en ejecucion. No continuar el resto de comandos en la misma terminal si queda ocupada por el servidor.

## 6. Ciclo guiado con el responsable humano

Base URL LAN usada para la validacion field-like:

`http://192.168.1.74:3001`

No se uso `localhost` como URL de visitante.
No se uso Tailscale como URL de visitante.
No se usaron datos moviles como ruta principal.

El responsable humano reporto la siguiente experiencia en iPhone SE de segunda generacion + Chrome:

1. `<BASE_URL>/` abre correctamente.
2. `<BASE_URL>/entry/okua-entry` abre correctamente.
3. `<BASE_URL>/qr/okua-e1` abre correctamente.
4. `<BASE_URL>/station/1` abre correctamente.
5. `<BASE_URL>/final` abre correctamente.
6. No aparecio boton de bypass de laboratorio.
7. No hubo audio no esperado.
8. No se pidio escribir nada.
9. La app se vio correctamente en pantalla pequena.
10. No hubo errores visuales relevantes.

## 7. Validacion movil field-like

Desde iPhone SE de segunda generacion + Chrome, conectado a red Wi-Fi de laboratorio, se valido la base URL LAN:

`http://192.168.1.74:3001`

Rutas comprobadas:

- `/` - abre correctamente.
- `/entry/okua-entry` - abre correctamente.
- `/qr/okua-e1` - abre correctamente.
- `/station/1` - abre correctamente.
- `/final` - abre correctamente.

Confirmaciones:

- No se uso `localhost` como URL de visitante.
- No se uso Tailscale como URL de visitante.
- No se usaron datos moviles como ruta principal.
- No aparecio bypass de laboratorio en modo field.
- No hubo audio.
- No hubo escritura obligatoria.
- La app se vio correctamente en iPhone SE.

## 8. QR de laboratorio

No fue necesario generar QR temporales en esta corrida.

La validacion se hizo por acceso directo a la base URL LAN y por la evidencia aportada por el responsable humano.

Si en una sesion posterior se requiere probar QR en pantalla o impreso, la base URL de laboratorio debe ser:

`http://192.168.1.74:3001`

o, si corresponde, `http://192.168.1.72:3001`.

Si se generan QR temporales de laboratorio en el futuro, deben revertirse antes del commit salvo aprobacion explicita.

## 9. Matriz de resultado

| Dispositivo | Sistema | Navegador | Red | Base URL | `/` | `/entry/okua-entry` | `/qr/okua-e1` | `/station/1` | `/final` | Modo field sin bypass | Resultado | Incidencias |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| iPhone SE de segunda generacion | iOS | Chrome | Wi-Fi de laboratorio aprobada | `http://192.168.1.74:3001` | abre | abre | abre | abre | abre | si | QA MÓVIL VALIDADA EN LABORATORIO | Sin errores visuales relevantes reportados |

## 10. Decision

- `QA MÓVIL VALIDADA EN LABORATORIO`: si.
- `BLOQUEADO`: no.

## 11. Condicion para F9-04

- F9-04 puede iniciar en laboratorio: si.

Solo puede ser si porque la decision fue `QA MÓVIL VALIDADA EN LABORATORIO`.

## 12. Evidencia y residuos

- Base URL usada: `http://192.168.1.74:3001`.
- Red usada sin exponer contraseña: Wi-Fi de laboratorio aprobada.
- Dispositivo: iPhone SE de segunda generacion.
- Navegador: Chrome.
- QR generados/revertidos: no ejecutado en esta corrida.
- Release candidate generado/revertido: no ejecutado en esta corrida.
- `.env.local`: ausente / no versionado.
- perfiles `.local.json`: ausentes / no versionados.
- residuos locales:
  - `.agents/`
  - `.claude/settings.json`
  - `GVO_ESTADO_TECNICO_*.txt`

## 13. Aclaracion final

La evidencia de Vite `5173` y los logs con `host:"localhost:3001"` y `remoteAddress:"127.0.0.1"` se conservan como soporte de entorno dev/proxy, pero no reemplazan la validacion field-like documentada arriba en `3001`.
