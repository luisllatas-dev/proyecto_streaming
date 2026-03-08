import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ServiceGrid from './ServiceGrid';

const mockServices = [
  {
    _id: '1',
    imagen: 'https://example.com/img1.jpg',
    titulo: 'Netflix Premium',
    precio: 5.99,
    descuento: 20,
    descripcion: 'Descripción Netflix',
  },
  {
    _id: '2',
    imagen: 'https://example.com/img2.jpg',
    titulo: 'Disney+ Premium',
    precio: 4.99,
    descuento: 15,
    descripcion: 'Descripción Disney',
  },
];

describe('ServiceGrid', () => {
  it('renders all services', () => {
    render(<ServiceGrid services={mockServices} />);
    expect(screen.getByText('Netflix Premium')).toBeInTheDocument();
    expect(screen.getByText('Disney+ Premium')).toBeInTheDocument();
  });

  it('renders correct number of service cards', () => {
    render(<ServiceGrid services={mockServices} />);
    const buttons = screen.getAllByRole('button', { name: /contratar/i });
    expect(buttons).toHaveLength(2);
  });

  it('shows empty message when no services', () => {
    render(<ServiceGrid services={[]} />);
    expect(screen.getByText('Servicio no encontrado.')).toBeInTheDocument();
  });

  it('renders grid container with correct classes', () => {
    const { container } = render(<ServiceGrid services={mockServices} />);
    const grid = container.querySelector('.grid');
    expect(grid).toHaveClass('grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-3');
  });
});
