// Estado del recorrido GVO — shell frontend (Ticket 0.2)
// TODO (Ticket 0.3): reemplazar canAccessStep y JourneyState con lógica
//   derivada desde el backend cuando se implementen sesión temporal y QR real.

export type GuideId = 'masculine' | 'feminine' | 'flower';

export interface Guide {
  id: GuideId;
  name: string;
  description: string;
}

// Nombres de trabajo — se ajustan con contenido real en tickets posteriores
export const GUIDES: readonly Guide[] = [
  { id: 'masculine', name: 'Raíz',  description: 'Forma humana — masculina' },
  { id: 'feminine',  name: 'Hoja',  description: 'Forma humana — femenina' },
  { id: 'flower',    name: 'Flor',  description: 'Forma orgánica — vegetal' },
];

export interface StationMeta {
  id: number;
  title: string;
  label: string; // etiqueta romana para el tracker de progreso
}

// Títulos de trabajo — contenido narrativo real se integra en tickets posteriores
export const STATIONS: readonly StationMeta[] = [
  { id: 1, title: 'Origen y propósito',    label: 'I'   },
  { id: 2, title: 'Señales bioeléctricas', label: 'II'  },
  { id: 3, title: 'Prototipos y evolución', label: 'III' },
  { id: 4, title: 'Operación técnica',     label: 'IV'  },
  { id: 5, title: 'Estado actual',         label: 'V'   },
];

// Paso 0 = introducción; pasos 1..5 = estaciones 1..5
export interface JourneyState {
  guide: GuideId | null;
  visitedSteps: number[];
  completed: boolean;
}

export type JourneyAction =
  | { type: 'SELECT_GUIDE'; guide: GuideId }
  | { type: 'VISIT_STEP'; step: number }
  | { type: 'COMPLETE' }
  | { type: 'RESET' };

export const INITIAL_STATE: JourneyState = {
  guide: null,
  visitedSteps: [],
  completed: false,
};

export function journeyReducer(
  state: JourneyState,
  action: JourneyAction,
): JourneyState {
  switch (action.type) {
    case 'SELECT_GUIDE':
      return { ...state, guide: action.guide };
    case 'VISIT_STEP':
      if (state.visitedSteps.includes(action.step)) return state;
      return { ...state, visitedSteps: [...state.visitedSteps, action.step] };
    case 'COMPLETE':
      return { ...state, completed: true };
    case 'RESET':
      return INITIAL_STATE;
    default:
      return state;
  }
}

// Gating del shell (solo frontend — sin QR ni sesión real)
// TODO (Ticket 0.3): reemplazar con validación desde backend + sesión + QR

/** Intro (paso 0) requiere guía seleccionada. */
export function canAccessIntro(state: JourneyState): boolean {
  return state.guide !== null;
}

/**
 * Estación N (1..5) requiere intro (paso 0) y todas las estaciones previas (1..N-1).
 * En modo libre (completed) toda estación queda accesible.
 */
export function canAccessStep(state: JourneyState, step: number): boolean {
  if (state.completed) return true;
  if (step === 0) return canAccessIntro(state);
  for (let i = 0; i < step; i++) {
    if (!state.visitedSteps.includes(i)) return false;
  }
  return true;
}

/**
 * El cierre final requiere que la estación 5 haya sido visitada.
 * En modo libre (completed) el cierre sigue accesible.
 */
export function canAccessFinal(state: JourneyState): boolean {
  if (state.completed) return true;
  return state.visitedSteps.includes(5);
}

export function getGuideName(id: GuideId): string {
  return GUIDES.find((g) => g.id === id)?.name ?? id;
}
