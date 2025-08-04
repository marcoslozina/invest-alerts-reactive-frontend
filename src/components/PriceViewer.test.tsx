import { render } from '@testing-library/react';
import PriceViewer from './PriceViewer';
import { describe, it, expect } from 'vitest';

describe('PriceViewer', () => {
  it('renders without crashing', () => {
    render(<PriceViewer />);
  });
});
