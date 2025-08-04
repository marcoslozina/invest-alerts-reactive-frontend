import { render, screen } from '@testing-library/react';
import PriceViewer from './PriceViewer';
import { describe, it, expect } from 'vitest';

describe('PriceViewer', () => {
  it('renders without crashing', () => {
    render(<PriceViewer />);
    const status = screen.getByText(/cargando/i); // si tiene algún texto visible como "Cargando..."
    expect(status).toBeInTheDocument();
  });
});
