import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../page';

describe('Home Component', () => {
  it('renders Home text', () => {
    render(<Home />);
    const text = screen.getByText('Home');
    expect(text).toBeInTheDocument();
  });

  it('has div with correct class name', () => {
    const { container } = render(<Home />);
    expect(container.querySelector('div')?.className).toMatch(/page/);
  });
});
