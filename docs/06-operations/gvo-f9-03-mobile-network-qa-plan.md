# GVO F9-03 — Plan de QA móvil y conectividad local

## 1. Propósito

Este documento prepara la validación móvil multibrowser y de red local posterior a F9-02.

Aclaraciones:

- No declara piloto ejecutado.
- No declara QR finales validados.
- No declara v1 estable.
- No reemplaza el reporte de piloto de campo.
- Se usa para ejecutar una prueba reproducible cuando haya móvil real y red disponible.
- Si no se ejecuta con móvil real, el resultado máximo de este ticket será `QA MÓVIL PREPARADA`.

## 2. Estado heredado de F9-02

F9-02 quedó como `VALIDACIÓN PARCIAL`.

Estado heredado confirmado:

- Base URL de laboratorio usada: `http://192.168.1.74:3001`
- QR generados: laboratorio, no finales.
- Móvil real disponible: no.
- QR finales listos para F9-03: no.
- Pendiente: validar acceso real desde móvil.

## 3. Matriz de conectividad autorizada

| Entorno | Uso | IP/host | Puerto esperado | ¿Apto para visitante? | ¿Apto para soporte remoto? | Observaciones |
| --- | --- | --- | --- | --- | --- | --- |
| Laboratorio LAN A | Pruebas locales de escritorio y móvil en red de trabajo | `192.168.1.74` | `3001` | Solo laboratorio | No | Útil para validar SPA y QR antes de campo. |
| Laboratorio LAN B | Pruebas locales alternativas en otra IP de laboratorio | `192.168.1.72` | `3001` | Solo laboratorio | No | Alternativa válida para aislar problemas de IP. |
| Laboratorio Tailscale | Soporte remoto del equipo responsable | `100.88.127.119` | `3001` | No | Sí, si el equipo responsable lo usa | No usar como URL normal de visitante. |
| Campo ethernet fijo | Servidor de campo en red local del espacio | `192.168.88.251` | `3001` | Sí, si la red Wi-Fi MikroTik enruta hacia esa IP | No | URL candidata para QR de recorrido en campo. |
| Campo Tailscale | Soporte remoto del equipo responsable en campo | `100.78.105.17` | `3001` | No | Sí, si aplica | No usar como URL de visitante. |

Regla obligatoria:

La URL de los QR del recorrido para visitantes debe usar una IP o host accesible desde la red Wi-Fi local del MikroTik. No debe usar Tailscale para visitantes.

## 4. Flujo correcto de acceso en campo

Secuencia operativa:

1. El visitante escanea o recibe el QR de la red Wi-Fi MikroTik.
2. El visitante se conecta a la red local de visitantes.
3. El visitante escanea el QR de entrada GVO.
4. El QR de entrada abre la app usando la base URL final de campo, por ejemplo:

   `http://192.168.88.251:3001/entry/okua-entry`

   si esa es la IP final confirmada en campo.

5. Las estaciones abren rutas:
   - `/qr/okua-e1`
   - `/qr/okua-e2`
   - `/qr/okua-e3`
   - `/qr/okua-e4`
   - `/qr/okua-e5`
6. El navegador del móvil debe resolver la URL sin internet.
7. La app debe operar en `field`.
8. No debe aparecer bypass de laboratorio.
9. No debe requerir escritura obligatoria.
10. No debe emitir audio.

Aclaraciones:

- El QR Wi-Fi MikroTik y el QR GVO son diferentes.
- El QR Wi-Fi no reemplaza los QR de estaciones.
- El QR GVO no conecta por sí mismo a la red Wi-Fi.
- El navegador del móvil debe estar en la red correcta antes de abrir la URL.

## 5. Precondiciones para ejecutar QA móvil

- [ ] PC servidor encendido.
- [ ] Repo actualizado en `main`.
- [ ] `npm install` ejecutado si aplica.
- [ ] `npm run build` pasa.
- [ ] `npm start` levanta backend + SPA.
- [ ] `VITE_APP_MODE=field` verificado para build de campo.
- [ ] `GVO_SERVE_WEB=true` activo si se sirve desde Fastify.
- [ ] `HOST` permite acceso LAN, no solo `localhost`.
- [ ] `PORT=3001`.
- [ ] Firewall Windows permite entrada al puerto `3001` desde la red local.
- [ ] MikroTik emite red Wi-Fi de visitantes.
- [ ] Móvil conectado a Wi-Fi MikroTik.
- [ ] Móvil no usa datos móviles para resolver la app.
- [ ] Base URL final definida.
- [ ] QR generados con base URL final o temporal explícita.

## 6. Matriz de dispositivos y navegadores

| Dispositivo | Sistema operativo | Navegador | Red usada | URL base | Entrada `/entry/okua-entry` | Estación `/qr/okua-e1` | Modo field sin bypass | Resultado | Incidencias |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Android + Chrome | Android | Chrome | Wi-Fi MikroTik o laboratorio | `<BASE_URL>` | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente |
| Android + navegador alterno, si disponible | Android | Navegador alterno | Wi-Fi MikroTik o laboratorio | `<BASE_URL>` | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente |
| iPhone + Safari, si disponible | iOS | Safari | Wi-Fi MikroTik o laboratorio | `<BASE_URL>` | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente |
| Otro dispositivo disponible | Variable | Variable | Variable | `<BASE_URL>` | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente |

Si un dispositivo no está disponible, registrar:

`No disponible — limitación de preflight`

No inventar prueba.

## 7. Prueba mínima de rutas desde móvil

Con cada móvil disponible, abrir:

- `<BASE_URL>/`
- `<BASE_URL>/entry/okua-entry`
- `<BASE_URL>/qr/okua-e1`
- `<BASE_URL>/qr/okua-e2`
- `<BASE_URL>/station/1`
- `<BASE_URL>/final`

Resultado esperado:

- `/` no muestra bypass de laboratorio si el modo es `field`.
- `/entry/okua-entry` permite entrada.
- `/qr/okua-e1` habilita Estación I después de entrada/intro, según el flujo real.
- Saltos fuera de secuencia muestran bloqueo pedagógico, no error técnico.
- Las rutas profundas no devuelven `404`.
- No se requiere internet.
- No se requiere escritura.
- No hay audio.

## 8. Prueba de QR físico o QR generado en pantalla

Definir:

- Escanear QR Wi-Fi MikroTik.
- Confirmar conexión a red local.
- Escanear QR de entrada GVO.
- Escanear QR de Estación I.
- Registrar si el QR fue:
  - físico impreso;
  - generado en pantalla;
  - baseline/sample;
  - final de campo.

Regla:

No declarar QR final validado si el QR probado no fue generado con la base URL final de campo.

## 9. Criterios de bloqueo

Bloquean avance a F9-04:

- El móvil no puede conectarse a la red Wi-Fi MikroTik.
- El móvil conectado a la red no resuelve la base URL.
- La URL usa `localhost` o `127.0.0.1`.
- La URL usa Tailscale para visitante.
- El puerto `3001` no responde desde móvil.
- El firewall bloquea el acceso.
- `/entry/okua-entry` no abre desde móvil.
- `/qr/okua-e1` no abre desde móvil.
- Aparece bypass de laboratorio en modo `field`.
- La app depende de internet.
- El QR Wi-Fi se confunde con el QR de recorrido.
- No se puede registrar evidencia mínima.

## 10. Resultado esperado de F9-03

Decisiones posibles:

- `QA MÓVIL PREPARADA`: la documentación queda lista, pero no se ejecutó móvil real por falta de red, campo o dispositivos.
- `QA MÓVIL VALIDADA EN LABORATORIO`: se probó al menos un móvil real en laboratorio con IP de laboratorio.
- `QA MÓVIL VALIDADA EN CAMPO`: se probó al menos un móvil real conectado a Wi-Fi MikroTik y accediendo al servidor por `192.168.88.251:3001` o la URL final aprobada.
- `BLOQUEADO`: hay bloqueo de red, IP, firewall, dispositivo, modo `field`, QR o acceso móvil.

Este ticket puede cerrarse como documentación operativa si no hay condiciones de campo, pero debe dejar claro que la validación real queda pendiente.

## 11. Pendientes para F9-04

Según el resultado:

- Si no hubo móvil: ejecutar QA móvil real antes del recorrido completo.
- Si hubo móvil laboratorio: repetir en campo.
- Si hubo móvil campo: pasar a recorrido completo Intro → I → II → III → IV → V → Final.
- Si hubo bloqueo de red: abrir correctivo operativo antes de F9-04.

Regla:

No iniciar F9-04 como recorrido completo validado si F9-03 cerró únicamente como `QA MÓVIL PREPARADA`.

## 12. Relación con reportes

Referencias:

- `docs/06-operations/gvo-f9-02-field-qr-validation.md`
- `docs/06-operations/field-preflight-checklist.md`
- `docs/templates/PILOT_VALIDATION_REPORT_TEMPLATE.md`
- `docs/templates/FIELD_PILOT_REPORT_TEMPLATE.md`

Perfiles operativos relacionados:

- `deploy/lab-profile.example.json`
- `deploy/field-profile.okua.example.json`

Aclaración:

F9-03 no reemplaza el reporte final de piloto. Solo prepara o ejecuta QA móvil multibrowser y conectividad.
