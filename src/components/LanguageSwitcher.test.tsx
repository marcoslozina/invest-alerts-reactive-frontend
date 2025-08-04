import { render } from '@testing-library/react';
import LanguageSwitcher from './LanguageSwitcher';
import { describe, it, expect } from 'vitest';

describe('LanguageSwitcher', () => {
  it('renders language switcher button', () => {
    const { getByRole } = render(<LanguageSwitcher />);
    expect(getByRole('button')).toBeInTheDocument();
  });
});
