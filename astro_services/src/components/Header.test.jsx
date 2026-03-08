import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from './Header';

describe('Header', () => {
  it('renders the logo text', () => {
    render(<Header searchTerm="" onSearchChange={() => {}} />);
    expect(screen.getByText('Astro')).toBeInTheDocument();
    expect(screen.getByText('Services')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Header searchTerm="" onSearchChange={() => {}} />);
    expect(screen.getAllByText('Servicios')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Contacto')[0]).toBeInTheDocument();
  });

  it('renders search input on desktop', () => {
    render(<Header searchTerm="" onSearchChange={() => {}} />);
    const searchInputs = screen.getAllByPlaceholderText('Buscar servicios...');
    expect(searchInputs.length).toBeGreaterThan(0);
  });

  it('calls onSearchChange when typing in search input', async () => {
    const mockOnSearchChange = vi.fn();
    render(<Header searchTerm="" onSearchChange={mockOnSearchChange} />);
    
    const searchInputs = screen.getAllByPlaceholderText('Buscar servicios...');
    await userEvent.type(searchInputs[0], 'Netflix');
    
    expect(mockOnSearchChange).toHaveBeenCalled();
  });

  it('displays the current search term in input', () => {
    render(<Header searchTerm="Disney" onSearchChange={() => {}} />);
    const searchInputs = screen.getAllByPlaceholderText('Buscar servicios...');
    expect(searchInputs[0]).toHaveValue('Disney');
  });

  it('renders hamburger menu button on mobile', () => {
    render(<Header searchTerm="" onSearchChange={() => {}} />);
    expect(screen.getByLabelText('Abrir menú')).toBeInTheDocument();
  });

  it('toggles mobile menu when hamburger is clicked', async () => {
    render(<Header searchTerm="" onSearchChange={() => {}} />);
    const hamburger = screen.getByLabelText('Abrir menú');
    
    // Inicialmente el menú móvil está colapsado (max-h-0)
    const mobileMenu = hamburger.closest('header').querySelector('.md\\:hidden.overflow-hidden');
    expect(mobileMenu).toHaveClass('max-h-0');
    
    // Click para abrir
    await userEvent.click(hamburger);
    expect(mobileMenu).toHaveClass('max-h-40');
    
    // Click para cerrar
    await userEvent.click(hamburger);
    expect(mobileMenu).toHaveClass('max-h-0');
  });

  it('contact link opens WhatsApp', () => {
    render(<Header searchTerm="" onSearchChange={() => {}} />);
    const contactLinks = screen.getAllByText('Contacto');
    expect(contactLinks[0].closest('a')).toHaveAttribute('href', 'https://wa.me/51933863899');
  });
});
