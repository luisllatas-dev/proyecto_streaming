import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import useServices from './useServices';

// Mock del módulo api
vi.mock('../services/api', () => ({
  fetchServices: vi.fn(),
}));

import { fetchServices } from '../services/api';

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

describe('useServices', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should start with loading state', () => {
    fetchServices.mockImplementation(() => new Promise(() => {}));
    
    const { result } = renderHook(() => useServices());
    
    expect(result.current.loading).toBe(true);
    expect(result.current.services).toEqual([]);
    expect(result.current.error).toBe(null);
  });

  it('should fetch services successfully', async () => {
    fetchServices.mockResolvedValue(mockServices);
    
    const { result } = renderHook(() => useServices());
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.services).toEqual(mockServices);
    expect(result.current.error).toBe(null);
  });

  it('should handle fetch error', async () => {
    const errorMessage = 'Error al obtener los servicios';
    fetchServices.mockRejectedValue(new Error(errorMessage));
    
    const { result } = renderHook(() => useServices());
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.services).toEqual([]);
    expect(result.current.error).toBe(errorMessage);
  });

  it('should call fetchServices on mount', async () => {
    fetchServices.mockResolvedValue(mockServices);
    
    renderHook(() => useServices());
    
    await waitFor(() => {
      expect(fetchServices).toHaveBeenCalledTimes(1);
    });
  });
});
