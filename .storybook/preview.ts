import type { Preview } from '@storybook/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../src/i18n'; // Asegurate de que i18n esté en src/i18n.ts
import '../src/index.css';

const preview: Preview = {
  decorators: [
    (Story) => (
      <I18nextProvider i18n={i18n}>
        <Story />
      </I18nextProvider>
    ),
  ],
};

export default preview;
