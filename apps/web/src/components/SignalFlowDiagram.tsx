import { useState } from 'react';
import type { FC } from 'react';

type Step = {
  id: string;
  symbol: string;
  title: string;
  description: string;
};

const STEPS: Step[] = [
  {
    id: 'planta',
    symbol: '◉',
    title: 'Planta',
    description: 'La planta es el origen vivo de la señal. No produce música por sí sola.',
  },
  {
    id: 'bionosificador',
    symbol: '⊕',
    title: 'Bionosificador',
    description: 'El bionosificador capta y acondiciona la señal bioeléctrica para que el sistema pueda leerla.',
  },
  {
    id: 'esp32',
    symbol: 'E',
    title: 'ESP32',
    description: 'El microcontrolador interpreta la señal acondicionada y prepara eventos digitales.',
  },
  {
    id: 'midi',
    symbol: '♩',
    title: 'MIDI',
    description: 'La información se organiza como eventos musicales, no como sonido directo de la planta.',
  },
  {
    id: 'wifi-udp',
    symbol: '⌁',
    title: 'Wi-Fi / UDP',
    description: 'Los eventos viajan por red local mediante comunicación inalámbrica de baja fricción.',
  },
  {
    id: 'router',
    symbol: 'R',
    title: 'Router',
    description: 'El router ordena la comunicación entre nodos y sistema central dentro del entorno local.',
  },
  {
    id: 'sistema-central',
    symbol: 'S',
    title: 'Sistema central',
    description: 'El software central recibe los eventos y los integra con la lógica del montaje.',
  },
  {
    id: 'sonido',
    symbol: '♪',
    title: 'Sonido',
    description: 'El resultado audible es una traducción artística y técnica de la señal, no una música espontánea.',
  },
];

export const SignalFlowDiagram: FC = () => {
  const [active, setActive] = useState(0);
  const current = STEPS[active];
  const lastIndex = STEPS.length - 1;

  return (
    <div className="signal-flow-diagram" aria-label="Cadena técnica del sistema">
      <div className="signal-flow-steps" aria-label="Pasos de la cadena técnica">
        {STEPS.map((step, index) => (
          <button
            key={step.id}
            type="button"
            className={`signal-flow-step-btn${active === index ? ' signal-flow-step-btn-active' : ''}`}
            aria-label={step.title}
            aria-pressed={active === index}
            onClick={() => setActive(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <div className="signal-flow-detail" aria-live="polite">
        <span className="signal-flow-symbol" aria-hidden="true">
          {current.symbol}
        </span>
        <h3 className="signal-flow-title">{current.title}</h3>
        <p className="signal-flow-description">{current.description}</p>
      </div>

      <div className="signal-flow-nav">
        <button
          type="button"
          className="signal-flow-nav-btn"
          disabled={active === 0}
          onClick={() => setActive((value) => Math.max(0, value - 1))}
        >
          ← Anterior
        </button>
        <span className="signal-flow-progress">
          Paso {active + 1} de {STEPS.length}
        </span>
        <button
          type="button"
          className="signal-flow-nav-btn"
          disabled={active === lastIndex}
          onClick={() => setActive((value) => Math.min(lastIndex, value + 1))}
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
};
