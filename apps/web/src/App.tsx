import type { FC } from 'react';

const CONSTRAINTS: { label: string }[] = [
  { label: 'Sin audio' },
  { label: 'Sin Internet requerido en operación' },
  { label: 'Experiencia móvil primero' },
  { label: 'Sin escritura obligatoria para el visitante' },
  { label: 'Secuencia obligatoria en la primera pasada' },
];

const BUILD_STATUS: { label: string; done: boolean }[] = [
  { label: 'Workspace npm monorepo', done: true },
  { label: 'Frontend React + Vite + TypeScript', done: true },
  { label: 'Backend Fastify + TypeScript', done: true },
  { label: 'Shell funcional del MVP', done: false },
  { label: 'Sesiones temporales + gating por QR', done: false },
  { label: 'Estaciones con contenido real', done: false },
  { label: 'Avatar y bienvenida', done: false },
  { label: 'Cierre final', done: false },
];

const App: FC = () => {
  return (
    <main className="shell">
      <header className="shell-header">
        <span className="shell-tag">Shell técnico — v0.1</span>
        <h1 className="shell-title">GVO</h1>
        <p className="shell-subtitle">Guía Visual OKÚA</p>
      </header>

      <section className="shell-section">
        <h2 className="section-title">Restricciones del sistema</h2>
        <ul className="constraint-list">
          {CONSTRAINTS.map((c) => (
            <li key={c.label}>
              <span className="mark mark--ok" aria-hidden="true" />
              {c.label}
            </li>
          ))}
        </ul>
      </section>

      <section className="shell-section">
        <h2 className="section-title">Estado de implementación</h2>
        <ul className="status-list">
          {BUILD_STATUS.map((s) => (
            <li key={s.label} className={s.done ? 'done' : 'pending'}>
              <span className={`mark ${s.done ? 'mark--done' : 'mark--pending'}`} aria-hidden="true" />
              {s.label}
            </li>
          ))}
        </ul>
      </section>

      <footer className="shell-footer">
        <p>
          Base técnica mínima ejecutable. La experiencia final para visitantes
          se construye en tickets posteriores.
        </p>
      </footer>
    </main>
  );
};

export default App;
