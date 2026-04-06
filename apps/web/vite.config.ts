import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const serverTarget = env.VITE_API_BASE_URL || 'http://localhost:3001';

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@gvo/shared': fileURLToPath(
          new URL('../../packages/shared/src/index.ts', import.meta.url),
        ),
      },
    },
    server: {
      port: 5173,
      host: true, // expone a la red local para acceso desde móvil
      proxy: {
        '/api': { target: serverTarget, changeOrigin: true },
        '/health': { target: serverTarget, changeOrigin: true },
      },
    },
    build: {
      outDir: 'dist',
    },
  };
});
