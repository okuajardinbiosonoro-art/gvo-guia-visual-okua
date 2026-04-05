import { Fragment, type FC } from 'react';
import { STATIONS } from '../state/journey';
import { useJourney } from '../state/JourneyProvider';

interface ProgressTrackerProps {
  currentStep: number | null;
}

const ALL_STEPS = [
  { id: 0, label: '·' },
  ...STATIONS.map((s) => ({ id: s.id, label: s.label })),
];

export const ProgressTracker: FC<ProgressTrackerProps> = ({ currentStep }) => {
  const { state } = useJourney();

  return (
    <nav className="progress-track" aria-label="Progreso del recorrido">
      {ALL_STEPS.map((step, index) => {
        const isVisited = state.visitedSteps.includes(step.id);
        const isCurrent = step.id === currentStep;

        const stepClass = [
          'progress-step',
          isCurrent ? 'progress-step--current' : '',
          !isCurrent && isVisited ? 'progress-step--visited' : '',
          !isCurrent && !isVisited ? 'progress-step--locked' : '',
        ]
          .filter(Boolean)
          .join(' ');

        return (
          <Fragment key={step.id}>
            {index > 0 && (
              <div
                className={`progress-connector${isVisited ? ' progress-connector--done' : ''}`}
              />
            )}
            <div
              className={stepClass}
              title={step.id === 0 ? 'Introducción' : `Estación ${step.label}`}
            >
              <span className="progress-step-label">{step.label}</span>
            </div>
          </Fragment>
        );
      })}
    </nav>
  );
};
