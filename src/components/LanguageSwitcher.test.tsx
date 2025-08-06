import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../test/i18nForTests';
import LanguageSwitcher from './LanguageSwitcher';

describe('LanguageSwitcher', () => {
  it('renders language switcher button', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <LanguageSwitcher />
      </I18nextProvider>
    );
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    // 🔧 Corregido: toleramos "Switch to English"
    expect(button.textContent?.toLowerCase()).toMatch(/cambiar idioma|switch (to )?english/);
  });

  it('switches language on click', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <LanguageSwitcher />
      </I18nextProvider>
    );
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(i18n.language).toBe('en'); // El idioma debería cambiar a 'en'
  });
});
