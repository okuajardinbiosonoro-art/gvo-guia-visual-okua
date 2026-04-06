import { API_BASE_URL } from '../config';
import type { GuideId, QrScanResponse, SessionResponse, StepResponse } from '@gvo/shared';

interface ApiError extends Error {
  status: number;
  code: string;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...init?.headers },
  });

  if (!response.ok) {
    let code = response.statusText;
    try {
      const body = (await response.json()) as { error?: string };
      if (body.error) code = body.error;
    } catch {
      // non-JSON body — ignorar
    }
    const err = Object.assign(new Error(code), {
      status: response.status,
      code,
    }) as ApiError;
    throw err;
  }

  return response.json() as Promise<T>;
}

export const journeyApi = {
  createSession: () =>
    request<SessionResponse>('/api/journey/session', { method: 'POST' }),

  getSession: (id: string) =>
    request<SessionResponse>(`/api/journey/session/${id}`),

  selectGuide: (id: string, guide: GuideId) =>
    request<StepResponse>(`/api/journey/session/${id}/guide`, {
      method: 'POST',
      body: JSON.stringify({ guide }),
    }),

  visitIntro: (id: string) =>
    request<StepResponse>(`/api/journey/session/${id}/intro`, { method: 'POST' }),

  visitStation: (id: string, stationId: number) =>
    request<StepResponse>(`/api/journey/session/${id}/station/${stationId}`, {
      method: 'POST',
    }),

  finalize: (id: string) =>
    request<StepResponse>(`/api/journey/session/${id}/finalize`, { method: 'POST' }),

  scanQr: (id: string, token: string) =>
    request<QrScanResponse>(`/api/journey/session/${id}/scan/${token}`, { method: 'POST' }),
};
