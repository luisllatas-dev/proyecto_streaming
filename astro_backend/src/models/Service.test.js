import { describe, it, expect } from 'vitest';
import Service from './Service.js';

describe('Service Model - Schema Validation', () => {
  it('should fail validation without required fields', async () => {
    const service = new Service({});

    let error;
    try {
      await service.validate();
    } catch (e) {
      error = e;
    }

    expect(error).toBeDefined();
    expect(error.errors.imagen).toBeDefined();
    expect(error.errors.titulo).toBeDefined();
    expect(error.errors.precio).toBeDefined();
    expect(error.errors.descripcion).toBeDefined();
  });

  it('should pass validation with all required fields', async () => {
    const service = new Service({
      imagen: 'https://example.com/image.jpg',
      titulo: 'Netflix Premium',
      precio: 5.99,
      descripcion: 'Servicio de streaming en 4K.',
    });

    let error;
    try {
      await service.validate();
    } catch (e) {
      error = e;
    }

    expect(error).toBeUndefined();
  });

  it('should default descuento to 0', () => {
    const service = new Service({
      imagen: 'https://example.com/image.jpg',
      titulo: 'Spotify',
      precio: 3.49,
      descripcion: 'Música sin anuncios.',
    });

    expect(service.descuento).toBe(0);
  });

  it('should reject negative precio', async () => {
    const service = new Service({
      imagen: 'https://example.com/image.jpg',
      titulo: 'Test',
      precio: -5,
      descripcion: 'Test description',
    });

    let error;
    try {
      await service.validate();
    } catch (e) {
      error = e;
    }

    expect(error).toBeDefined();
    expect(error.errors.precio).toBeDefined();
  });

  it('should reject descuento > 100', async () => {
    const service = new Service({
      imagen: 'https://example.com/image.jpg',
      titulo: 'Test',
      precio: 5,
      descuento: 150,
      descripcion: 'Test description',
    });

    let error;
    try {
      await service.validate();
    } catch (e) {
      error = e;
    }

    expect(error).toBeDefined();
    expect(error.errors.descuento).toBeDefined();
  });

  it('should reject negative descuento', async () => {
    const service = new Service({
      imagen: 'https://example.com/image.jpg',
      titulo: 'Test',
      precio: 5,
      descuento: -10,
      descripcion: 'Test description',
    });

    let error;
    try {
      await service.validate();
    } catch (e) {
      error = e;
    }

    expect(error).toBeDefined();
    expect(error.errors.descuento).toBeDefined();
  });

  it('should reject titulo exceeding 120 characters', async () => {
    const service = new Service({
      imagen: 'https://example.com/image.jpg',
      titulo: 'A'.repeat(121),
      precio: 5,
      descripcion: 'Test description',
    });

    let error;
    try {
      await service.validate();
    } catch (e) {
      error = e;
    }

    expect(error).toBeDefined();
    expect(error.errors.titulo).toBeDefined();
  });

  it('should reject descripcion exceeding 500 characters', async () => {
    const service = new Service({
      imagen: 'https://example.com/image.jpg',
      titulo: 'Test',
      precio: 5,
      descripcion: 'A'.repeat(501),
    });

    let error;
    try {
      await service.validate();
    } catch (e) {
      error = e;
    }

    expect(error).toBeDefined();
    expect(error.errors.descripcion).toBeDefined();
  });

  it('should trim whitespace from string fields', () => {
    const service = new Service({
      imagen: '  https://example.com/image.jpg  ',
      titulo: '  Netflix Premium  ',
      precio: 5.99,
      descripcion: '  Servicio de streaming.  ',
    });

    expect(service.imagen).toBe('https://example.com/image.jpg');
    expect(service.titulo).toBe('Netflix Premium');
    expect(service.descripcion).toBe('Servicio de streaming.');
  });
});
