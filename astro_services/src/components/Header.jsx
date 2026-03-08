import { useState } from 'react';

const navLinks = [
  { label: 'Servicios', href: '#servicios', external: false },
  { label: 'Contacto', href: 'https://wa.me/51933863899', external: true },
];

function Header({ searchTerm, onSearchChange }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b border-gray-800 bg-gray-950">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold tracking-tight text-white">
            Astro <span className="text-indigo-400">Services</span>
          </h1>
        </div>

        {/* Buscador (escritorio) */}
        <div className="hidden flex-1 max-w-md md:block">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar servicios..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-2 pr-10 text-sm text-white placeholder-gray-500 transition-colors focus:border-indigo-500 focus:outline-none"
            />
            <svg
              className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Nav escritorio */}
        <nav className="hidden gap-6 text-sm text-gray-400 md:flex">
          {navLinks.map(({ label, href, external }) => (
            <a
              key={label}
              href={href}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="transition-colors hover:text-white"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Botón hamburguesa (solo móvil) */}
        <button
          className="flex flex-col justify-center gap-1.5 md:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Abrir menú"
        >
          <span className={`block h-0.5 w-6 bg-gray-400 transition-all duration-300 ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`block h-0.5 w-6 bg-gray-400 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-6 bg-gray-400 transition-all duration-300 ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      {/* Buscador móvil */}
      <div className="border-t border-gray-800 px-6 py-3 md:hidden">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar servicios..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-2 pr-10 text-sm text-white placeholder-gray-500 transition-colors focus:border-indigo-500 focus:outline-none"
          />
          <svg
            className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Menú móvil desplegable */}
      <div className={`overflow-hidden transition-all duration-300 md:hidden ${menuOpen ? 'max-h-40' : 'max-h-0'}`}>
        <nav className="flex flex-col gap-1 border-t border-gray-800 px-6 py-4">
          {navLinks.map(({ label, href, external }) => (
            <a
              key={label}
              href={href}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="py-2 text-sm text-gray-400 transition-colors hover:text-white"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Header;
