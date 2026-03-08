function ServiceCard({ service, priority = false }) {
  const { imagen, titulo, precio, descuento, descripcion } = service;
  const precioFinal = descuento > 0 ? (precio * (1 - descuento / 100)).toFixed(2) : precio.toFixed(2);

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-gray-900 shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/20 hover:-translate-y-1">
      {/* Imagen */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={imagen}
          alt={titulo}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding={priority ? 'sync' : 'async'}
        />
        {descuento > 0 && (
          <span className="absolute top-3 right-3 rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold text-white shadow-md">
            -{descuento}%
          </span>
        )}
      </div>

      {/* Contenido */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-lg font-bold text-white">{titulo}</h3>
        <p className="flex-1 text-sm leading-relaxed text-gray-400">{descripcion}</p>

        {/* Precio */}
        <div className="flex items-end gap-2 pt-2">
          <span className="text-2xl font-extrabold text-indigo-400">S/.{precioFinal}</span>
          {descuento > 0 && (
            <span className="mb-0.5 text-sm text-gray-500 line-through">S/.{precio.toFixed(2)}</span>
          )}
          <span className="mb-0.5 text-xs text-gray-500">/mes</span>
        </div>

        {/* Botón */}
        <a href="https://wa.me/51933863899" target="_blank" rel="noopener noreferrer"><button className="mt-2 w-full cursor-pointer rounded-xl bg-indigo-600 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-indigo-500 active:bg-indigo-700">
          Contratar
        </button></a>
      </div>
    </div>
  );
}

export default ServiceCard;
