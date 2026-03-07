const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Obtiene todos los servicios desde la API.
 * @returns {Promise<Array>} Lista de servicios.
 */
export const fetchServices = async () => {
  const response = await fetch(`${API_BASE_URL}/services`);
  if (!response.ok) {
    throw new Error(`Error ${response.status}: No se pudieron obtener los servicios`);
  }
  return response.json();
};

/**
 * Obtiene un servicio por su ID.
 * @param {string} id - ID del servicio.
 * @returns {Promise<Object>} Datos del servicio.
 */
export const fetchServiceById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/services/${id}`);
  if (!response.ok) {
    throw new Error(`Error ${response.status}: Servicio no encontrado`);
  }
  return response.json();
};
