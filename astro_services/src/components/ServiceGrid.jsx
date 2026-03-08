import ServiceCard from './ServiceCard';

function ServiceGrid({ services }) {
  if (services.length === 0) {
    return (
      <p className="text-center text-gray-500">Servicio no encontrado.</p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <ServiceCard key={service._id} service={service} />
      ))}
    </div>
  );
}

export default ServiceGrid;
