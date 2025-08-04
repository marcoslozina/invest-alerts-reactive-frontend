import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest.setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      reportsDirectory: './coverage',
      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        '**/*.d.ts',
        '**/*.config.{js,ts,cjs,mjs}',
        '**/*.cy.{js,ts,jsx,tsx}',
        '**/cypress/**',
        '**/src/main.tsx',
        '**/src/App.tsx',
        '**/src/i18n.ts',
        '**/src/router/**',
        '**/src/layouts/**',
        '**/src/pages/**',
        '**/src/services/api.ts',
        '**/src/services/priceService.ts',
        '**/src/components/TranslatedText.tsx',
        '**/src/components/LanguageSwitcher.tsx',
        '**/src/components/PriceViewer.tsx',
        '**/src/utils/index.ts',
      ],
    },
  },
});
