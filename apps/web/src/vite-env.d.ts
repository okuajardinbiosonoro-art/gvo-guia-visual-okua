/// <reference types="vite/client" />

// Arquitectura de integración de assets (decisión F7-07):
// Los imports binarios (.webp, .png, .svg) ocurren únicamente dentro de
// apps/web/src/, no en content/stations/*.ts.
// vite/client ya declara *.webp, *.png y *.svg como string para todo el
// scope de este proyecto.
// Ver apps/web/src/assets/stations/README.md para el flujo completo.
