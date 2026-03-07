function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-gray-950 py-6 text-center text-sm text-gray-500">
      <p>&copy; {new Date().getFullYear()} Astro Services. Todos los derechos reservados.</p>
    </footer>
  );
}

export default Footer;
