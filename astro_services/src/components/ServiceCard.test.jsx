import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ServiceCard from './ServiceCard';

const mockService = {
  _id: '123',
  imagen: 'https://example.com/image.jpg',
  titulo: 'Netflix Premium',
  precio: 5.99,
  descuento: 20,
  descripcion: 'Pantalla completa en 4K Ultra HD.',
};

const mockServiceNoDiscount = {
  _id: '456',
  imagen: 'https://example.com/image2.jpg',
  titulo: 'Spotify Basic',
  precio: 3.49,
  descuento: 0,
  descripcion: 'Música sin anuncios.',
};

describe('ServiceCard', () => {
  it('renders service title correctly', () => {
    render(<ServiceCard service={mockService} />);
    expect(screen.getByText('Netflix Premium')).toBeInTheDocument();
  });

  it('renders service description', () => {
    render(<ServiceCard service={mockService} />);
    expect(screen.getByText('Pantalla completa en 4K Ultra HD.')).toBeInTheDocument();
  });

  it('renders discounted price correctly', () => {
    render(<ServiceCard service={mockService} />);
    // Precio con descuento: 5.99 * 0.8 = 4.79
    expect(screen.getByText('S/.4.79')).toBeInTheDocument();
  });

  it('renders original price with strikethrough when discount exists', () => {
    render(<ServiceCard service={mockService} />);
    expect(screen.getByText('S/.5.99')).toBeInTheDocument();
  });

  it('shows discount badge when discount > 0', () => {
    render(<ServiceCard service={mockService} />);
    expect(screen.getByText('-20%')).toBeInTheDocument();
  });

  it('does not show discount badge when discount is 0', () => {
    render(<ServiceCard service={mockServiceNoDiscount} />);
    expect(screen.queryByText(/-\d+%/)).not.toBeInTheDocument();
  });

  it('does not show original price when no discount', () => {
    render(<ServiceCard service={mockServiceNoDiscount} />);
    const prices = screen.getAllByText(/S\/\.\d+\.\d+/);
    // Solo debe haber un precio (el final)
    expect(prices).toHaveLength(1);
  });

  it('renders the contract button', () => {
    render(<ServiceCard service={mockService} />);
    expect(screen.getByRole('button', { name: /contratar/i })).toBeInTheDocument();
  });

  it('renders service image with correct alt text', () => {
    render(<ServiceCard service={mockService} />);
    const img = screen.getByAltText('Netflix Premium');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  it('should use eager loading for priority images', () => {
    render(<ServiceCard service={mockService} priority={true} />);
    const img = screen.getByAltText('Netflix Premium');
    expect(img).toHaveAttribute('loading', 'eager');
    expect(img).toHaveAttribute('fetchpriority', 'high');
  });

  it('should use lazy loading for non-priority images', () => {
    render(<ServiceCard service={mockService} priority={false} />);
    const img = screen.getByAltText('Netflix Premium');
    expect(img).toHaveAttribute('loading', 'lazy');
    expect(img).toHaveAttribute('fetchpriority', 'auto');
  });
});
