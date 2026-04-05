import { createContext, useContext, useReducer, type ReactNode } from 'react';
import {
  INITIAL_STATE,
  journeyReducer,
  type JourneyState,
  type JourneyAction,
} from './journey';

interface JourneyContextValue {
  state: JourneyState;
  dispatch: (action: JourneyAction) => void;
}

const JourneyContext = createContext<JourneyContextValue | null>(null);

export function JourneyProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(journeyReducer, INITIAL_STATE);

  return (
    <JourneyContext.Provider value={{ state, dispatch }}>
      {children}
    </JourneyContext.Provider>
  );
}

export function useJourney(): JourneyContextValue {
  const ctx = useContext(JourneyContext);
  if (!ctx) throw new Error('useJourney debe usarse dentro de JourneyProvider');
  return ctx;
}
