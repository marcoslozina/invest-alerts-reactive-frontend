import { render } from '@testing-library/react';
import ErrorPage from './ErrorPage';
import { describe, it, expect } from 'vitest';

describe('ErrorPage', () => {
  it('renders error message', () => {
    const { getByText } = render(<ErrorPage />);
    expect(getByText(/error/i)).toBeInTheDocument();
  });
});
