function Header() {
  return (
    <header className="border-b border-gray-800 bg-gray-950">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🚀</span>
          <h1 className="text-xl font-bold tracking-tight text-white">
            Astro <span className="text-indigo-400">Services</span>
          </h1>
        </div>
        <nav className="hidden gap-6 text-sm text-gray-400 md:flex">
          <a href="#servicios" className="transition-colors hover:text-white">Servicios</a>
          <a href="#contacto" className="transition-colors hover:text-white">Contacto</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
