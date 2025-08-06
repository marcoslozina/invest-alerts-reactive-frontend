import React from 'react';
import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../test/i18nForTests';
import { PriceViewer } from './PriceViewer';

// Mock dinámico del hook
jest.mock('../hooks/useAssetPrice');
const mockedUseAssetPrice = require('../hooks/useAssetPrice').useAssetPrice;

describe('PriceViewer', () => {
  it('renders loading state', () => {
    mockedUseAssetPrice.mockReturnValue({ loading: true, data: null, error: null });

    render(
      <I18nextProvider i18n={i18n}>
        <PriceViewer symbol="BTC" />
      </I18nextProvider>
    );

    expect(screen.getByText('Cargando precio de BTC...')).toBeInTheDocument();
  });

  it('renders error state', () => {
    mockedUseAssetPrice.mockReturnValue({ loading: false, data: null, error: 'Algo falló' });

    render(
      <I18nextProvider i18n={i18n}>
        <PriceViewer symbol="BTC" />
      </I18nextProvider>
    );

    expect(screen.getByText('Error al cargar el precio')).toBeInTheDocument();
  });

  it('renders no data state', () => {
    mockedUseAssetPrice.mockReturnValue({ loading: false, data: null, error: null });

    render(
      <I18nextProvider i18n={i18n}>
        <PriceViewer symbol="BTC" />
      </I18nextProvider>
    );

    expect(screen.getByText('No hay datos disponibles.')).toBeInTheDocument();
  });

  it('renders valid price', () => {
    mockedUseAssetPrice.mockReturnValue({
      loading: false,
      data: { symbol: 'BTC', price: 12345.67, timestamp: 1722979200000 },
      error: null,
    });

    render(
      <I18nextProvider i18n={i18n}>
        <PriceViewer symbol="BTC" />
      </I18nextProvider>
    );

    expect(screen.getByText('Precio actual de BTC')).toBeInTheDocument();
    expect(screen.getByText('$12345.67')).toBeInTheDocument();
    expect(screen.getByText(/Actualizado:/)).toBeInTheDocument();
  });

  it('renders fallback for non-numeric price', () => {
    mockedUseAssetPrice.mockReturnValue({
      loading: false,
      data: { symbol: 'BTC', price: 'not-a-number', timestamp: 1722979200000 },
      error: null,
    });

    render(
      <I18nextProvider i18n={i18n}>
        <PriceViewer symbol="BTC" />
      </I18nextProvider>
    );

    expect(screen.getByText('No hay datos disponibles.')).toBeInTheDocument();
  });
});
