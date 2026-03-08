import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../app.js';

describe('API Routes - Health Check', () => {
  describe('GET /api/health', () => {
    it('should return health status', async () => {
      const res = await request(app).get('/api/health');
      
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('ok');
      expect(res.body.timestamp).toBeDefined();
    });

    it('should return valid ISO timestamp', async () => {
      const res = await request(app).get('/api/health');
      
      const timestamp = new Date(res.body.timestamp);
      expect(timestamp).toBeInstanceOf(Date);
      expect(isNaN(timestamp.getTime())).toBe(false);
    });
  });

  describe('API Structure', () => {
    it('should have CORS headers enabled', async () => {
      const res = await request(app).get('/api/health');
      
      expect(res.headers['access-control-allow-origin']).toBeDefined();
    });

    it('should return JSON content type', async () => {
      const res = await request(app).get('/api/health');
      
      expect(res.headers['content-type']).toMatch(/application\/json/);
    });
  });
});
