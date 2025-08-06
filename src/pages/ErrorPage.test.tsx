import React from 'react';
import { render } from '@testing-library/react';
import ErrorPage from './ErrorPage';
import { describe, expect, it } from '@jest/globals';

describe('ErrorPage', () => {
  it('renders error message', () => {
    const { getByText } = render(<ErrorPage />);
    expect(getByText(/error/i)).toBeInTheDocument();
  });
});
