// src/components/PriceViewer.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../test/i18nForTests';
import { PriceViewer } from './PriceViewer'; // ✅ Named import

jest.mock('../hooks/useAssetPrice', () => ({
  useAssetPrice: () => ({
    data: null,
    loading: true,
    error: null,
  }),
}));

describe('PriceViewer', () => {
  it('renders loading state', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <PriceViewer symbol="BTC" />
      </I18nextProvider>
    );
    // Buscamos el string traducido exacto
    const loadingText = screen.getByText('Cargando precio de BTC...');
    expect(loadingText).toBeInTheDocument();
  });
});
