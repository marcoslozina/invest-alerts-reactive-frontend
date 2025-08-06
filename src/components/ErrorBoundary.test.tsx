import React from 'react';
import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary';

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});


describe('ErrorBoundary', () => {
  it('renders fallback UI on error', () => {
    const ThrowError = () => {
      throw new Error('Test error');
    };

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText(/oops/i)).toBeInTheDocument();
  });
});
