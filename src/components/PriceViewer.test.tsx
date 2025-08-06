import { render, screen } from '@testing-library/react';
import PriceViewer from './PriceViewer';
import { describe, it, expect } from 'vitest';
import '../test/i18nForTests'; // ✅ CORRECTO si tu estructura es src/components y src/test

describe('PriceViewer', () => {
  it('renders without crashing', () => {
    render(<PriceViewer />);
    const status = screen.getByText('Cargando...');
    expect(status).toBeInTheDocument();
  });
});
