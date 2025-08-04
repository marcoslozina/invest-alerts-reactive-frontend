import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', // 👈 clave para simular el DOM
    globals: true,
    setupFiles: './vitest.setup.ts', // archivo de setup
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
    },
  },
});
