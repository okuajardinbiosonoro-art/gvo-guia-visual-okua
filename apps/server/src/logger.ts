import { appendFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, isAbsolute, resolve } from 'node:path';
import type { FastifyInstance } from 'fastify';

export type LocalLogLevel = 'info' | 'warn' | 'error';

const DEFAULT_LOG_RELATIVE_PATH = 'logs/gvo-local.log';

export function resolveLocalLogFilePath(): string {
  const configuredPath = process.env.GVO_LOG_FILE?.trim() || DEFAULT_LOG_RELATIVE_PATH;
  return isAbsolute(configuredPath)
    ? configuredPath
    : resolve(__dirname, '../../..', configuredPath);
}

export function ensureLocalLogFile(): string {
  const logFilePath = resolveLocalLogFilePath();
  mkdirSync(dirname(logFilePath), { recursive: true });

  if (!existsSync(logFilePath)) {
    appendFileSync(logFilePath, '', 'utf8');
  }

  return logFilePath;
}

export function appendLocalLog(
  level: LocalLogLevel,
  message: string,
  details: Record<string, unknown> = {},
): void {
  const logFilePath = ensureLocalLogFile();
  const line = JSON.stringify({
    timestamp: new Date().toISOString(),
    level,
    message,
    ...details,
  });

  appendFileSync(logFilePath, `${line}\n`, 'utf8');
}

export function attachLocalFileLogging(server: FastifyInstance): void {
  const requestStarts = new Map<string, number>();

  server.addHook('onRequest', async (request) => {
    requestStarts.set(request.id, Date.now());
  });

  server.addHook('onResponse', async (request, reply) => {
    const pathname = request.url.split('?')[0] ?? request.url;
    if (pathname.startsWith('/assets/')) {
      return;
    }

    const startedAt = requestStarts.get(request.id);
    const durationMs = typeof startedAt === 'number' ? Date.now() - startedAt : undefined;

    appendLocalLog('info', 'request_completed', {
      method: request.method,
      path: pathname,
      statusCode: reply.statusCode,
      durationMs,
    });

    requestStarts.delete(request.id);
  });

  server.addHook('onError', async (request, _reply, error) => {
    const pathname = request.url.split('?')[0] ?? request.url;
    appendLocalLog('error', 'request_failed', {
      method: request.method,
      path: pathname,
      errorName: error.name,
      errorMessage: error.message,
    });
    requestStarts.delete(request.id);
  });
}
