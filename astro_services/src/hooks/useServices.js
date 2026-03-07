import { useState, useEffect } from 'react';
import { fetchServices } from '../services/api';

/**
 * Hook personalizado para obtener los servicios.
 * Maneja los estados de carga, error y datos.
 */
const useServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadServices = async () => {
      try {
        setLoading(true);
        const data = await fetchServices();
        setServices(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  return { services, loading, error };
};

export default useServices;
