# GVO — Handoff de cierre F9 laboratorio y transición a F10

## 1. Propósito del documento

Este documento cierra la Fase 9 como validación operativa de laboratorio y deja preparado el salto ordenado a Fase 10.

El repo no está iniciando desde cero: ya tiene flujo funcional, assets base, copy coherente y QR de laboratorio validados. Lo que sigue no es "seguir probando campo", sino preparar el paquete que luego recibirá campo.

## 2. Estado real confirmado de main

Estado real confirmado en `main` y en la documentación asociada:

- Versión `0.9.0-rc.1`.
- F9-07R: `FLUJO QR COMPLETO VALIDADO EN LABORATORIO`.
- Base URL LAN activa en la validación: `http://192.168.1.75:3001`.
- F9-06: `GO LABORATORIO`, `NO-GO CAMPO PARA PILOTO PÚBLICO`, `GO CONDICIONADO SOLO PARA PREPARAR VALIDACIÓN DE CAMPO`, `NO V1 ESTABLE`.
- Las decisiones ADR-001 y ADR-002 siguen vigentes.
- Campo real no probado en sitio.
- IP de campo `192.168.88.251` no probada en sitio.
- MikroTik de campo no probado en esta fase.

## 3. Etapa que puede darse por cerrada

Puede darse por cerrada la siguiente etapa:

**Fase 9 — Validación operativa de laboratorio y cierre pre-campo**

Resumen de la fase:

- F9-01: checklist operativo reproducible.
- F9-03T: QA móvil real con iPhone SE + Chrome.
- F9-04: recorrido completo en laboratorio.
- F9-05: concurrencia y soak.
- F9-06: go/no-go de laboratorio.
- F9-07R: retest físico del flujo QR completo de laboratorio.

Esta fase queda cerrada a nivel de laboratorio. No debe presentarse como campo ejecutado.

## 4. Lo que SÍ está listo para F10

Está listo para abrir Fase 10 porque ya existe:

- flujo QR de laboratorio validado físicamente;
- checklist operativo reproducible;
- perfil de laboratorio probado;
- validaciones automáticas sanas (`typecheck`, `build`, `smoke:journey`);
- una base documental suficiente para congelar el comportamiento antes de ir a campo.

## 5. Lo que TODAVÍA no está listo y no debe fingirse como resuelto

Todavía no está listo:

- paquete field-ready empaquetado para PC de campo;
- runbook de instalación/copia en PC de campo;
- QR finales de campo generados y verificados;
- prueba en red MikroTik de campo real;
- prueba con IP `192.168.88.251`;
- prueba con móviles reales en el espacio físico de campo;
- declaración de v1 estable.

## 6. Decisiones cerradas que no deben reabrirse

- Lía única, sin multiavatar.
- Sin audio.
- Sin AR.
- Sin scanner QR interno.
- Sin Lía 3D runtime.
- Assets desde `apps/web/src/lib/content.ts`.
- No debe haber `src` en `content/stations/*.ts`.
- Las plantas no hacen música por sí solas.
- Los 8 nodos de mediación se mantienen.
- Campo como fase final: no iterar en campo, solo desplegar y aceptar.

## 7. Brecha entre laboratorio validado y campo real

Lo validado en laboratorio con `http://192.168.1.75:3001` no equivale al campo real con `192.168.88.251` y MikroTik de campo.

La brecha incluye:

- red distinta;
- host/IP definitivos diferentes;
- visitantes reales;
- condiciones físicas del espacio;
- riesgo de operación si el paquete no está congelado.

F10 existe para cerrar esa brecha antes de tocar campo.

## 8. Decisión recomendada: Fase 10

La fase que sigue debe llamarse:

**Fase 10 — Paquete field-ready y congelamiento pre-campo**

F10 no es campo.
F10 prepara el paquete que campo recibirá.

La recomendación es no abrir tickets de prueba de campo todavía. Primero se arma el paquete field-ready, se congela, se deja documentado y luego se pasa a la fase final.

## 9. Preguntas que el nuevo chat debe resolver antes de abrir tickets

1. ¿Qué archivos exactos debe contener el paquete field-ready para copiar al PC de campo?
2. ¿Qué perfil de campo debe usarse como base final para `deploy/field-profile.okua.example.json`?
3. ¿Qué variables son editables en campo y cuáles deben quedar congeladas?
4. ¿Cómo se generarán QR finales sin dejar QR temporales versionados en el repo?
5. ¿Qué procedimiento de rollback existe si el despliegue en campo falla?
6. ¿Qué evidencia debe recogerse antes de autorizar la fase de campo?
7. ¿Qué debe quedar probado en laboratorio después de empaquetar, no antes?
8. ¿Qué queda explícitamente prohibido modificar una vez que el paquete esté congelado?

## 10. Lista recomendada de primeros tickets F10

1. F10-01 — Definir manifiesto de paquete field-ready para PC de campo.
2. F10-02 — Crear perfil final de despliegue de campo sin secretos.
3. F10-03 — Crear runbook de instalación/copia en PC de campo.
4. F10-04 — Preparar procedimiento de QR finales y rollback.
5. F10-05 — Ejecutar dry-run de paquete field-ready en laboratorio.
6. F10-06 — Emitir go/no-go para entrar a fase de campo.

## 11. Riesgos si se salta F10

- Llegar a campo sin runbook y terminar improvisando en sitio.
- QR con IP incorrecta y flujo roto desde el primer visitante.
- Sin rollback documentado, no hay capacidad de recuperación clara.
- Sin paquete reproducible, la instalación manual queda frágil.
- Iterar correcciones en campo interrumpe la experiencia del visitante.

## 12. Criterio de cierre de F10

F10 se considera cerrada cuando existe:

- paquete reproducible;
- runbook de instalación;
- perfil de campo sin secretos;
- procedimiento de QR finales y rollback;
- dry-run de laboratorio exitoso;
- decisión go/no-go para entrar a campo.
