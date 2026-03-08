import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fetchServices, fetchServiceById } from './api';

// Mock global fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

const mockServices = [
  { _id: '1', titulo: 'Netflix', precio: 5.99 },
  { _id: '2', titulo: 'Disney+', precio: 4.99 },
];

describe('API Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('fetchServices', () => {
    it('should fetch all services successfully', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockServices),
      });

      const result = await fetchServices();

      expect(result).toEqual(mockServices);
      expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('/services'));
    });

    it('should throw error when response is not ok', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 500,
      });

      await expect(fetchServices()).rejects.toThrow('Error 500');
    });
  });

  describe('fetchServiceById', () => {
    it('should fetch a single service by ID', async () => {
      const mockService = mockServices[0];
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockService),
      });

      const result = await fetchServiceById('1');

      expect(result).toEqual(mockService);
      expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('/services/1'));
    });

    it('should throw error when service not found', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 404,
      });

      await expect(fetchServiceById('999')).rejects.toThrow('Error 404');
    });
  });
});
