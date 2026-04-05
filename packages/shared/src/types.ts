// Tipos compartidos de GVO — Guía Visual OKÚA
// Este archivo crece con los tickets siguientes (sesiones, QR, estaciones).

export type StationId = 0 | 1 | 2 | 3 | 4 | 5;

export interface Station {
  id: StationId;
  slug: string;
  title: string;
}

// Placeholder — se expande en Ticket 0.3 (sesiones + gating)
export interface SessionState {
  sessionId: string;
  currentStation: StationId;
  completedStations: StationId[];
  startedAt: number;
}
