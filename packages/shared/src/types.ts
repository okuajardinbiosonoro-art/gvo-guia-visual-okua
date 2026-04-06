// Tipos compartidos — GVO Guía Visual OKÚA

/** Identificador de guía visual */
export type GuideId = 'masculine' | 'feminine' | 'flower';

/** Sesión temporal del recorrido almacenada en backend */
export interface JourneySession {
  sessionId: string;
  /** Guía visual elegida; null si aún no se seleccionó */
  guide: GuideId | null;
  /** Pasos visitados: 0 = introducción, 1–5 = estaciones */
  visitedSteps: number[];
  /** true tras la finalización explícita del recorrido */
  completed: boolean;
  createdAt: number;
  updatedAt: number;
  /** Expiración con ventana deslizante */
  expiresAt: number;
}

/** Respuesta de creación o recuperación de sesión */
export interface SessionResponse {
  session: JourneySession;
}

/** Respuesta de endpoints de acción del recorrido */
export interface StepResponse {
  ok: boolean;
  session: JourneySession;
}

/** Respuesta del endpoint de desbloqueo por QR/token */
export interface QrScanResponse {
  ok: boolean;
  stationId?: number;
  error?: string;
  session?: JourneySession;
}

/** Respuesta del endpoint de validación de token de acceso inicial */
export interface EntryResponse {
  ok: boolean;
  error?: string;
}
