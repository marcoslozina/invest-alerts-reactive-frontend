// src/components/Button.test.tsx
import React from 'react';
import { describe, expect, it } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';
import '@testing-library/jest-dom';

describe('Button', () => {
  it('renders with the correct label', () => {
    render(<Button label="Click me" />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn(); // ✅ reemplazás vi.fn() por jest.fn()
    render(<Button label="Click me" onClick={handleClick} />);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalled();
  });
});
