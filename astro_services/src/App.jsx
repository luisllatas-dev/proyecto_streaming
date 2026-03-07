import Header from './components/Header';
import Footer from './components/Footer';
import ServiceGrid from './components/ServiceGrid';
import useServices from './hooks/useServices';

function App() {
  const { services, loading, error } = useServices();

  return (
    <div className="flex min-h-screen flex-col bg-gray-950 text-white">
      <Header />

      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-12">
        {/* Hero */}
        <section className="mb-12 text-center">
          <h2 className="mb-3 text-4xl font-extrabold tracking-tight">
            Streaming e IPTV al mejor precio
          </h2>
          <p className="mx-auto max-w-2xl text-gray-400">
            Disfruta de tus plataformas favoritas con los planes más accesibles del mercado.
            Calidad garantizada y soporte 24/7.
          </p>
        </section>

        {/* Servicios */}
        <section id="servicios">
          {loading && (
            <div className="flex justify-center py-20">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />
            </div>
          )}

          {error && (
            <div className="rounded-xl border border-red-800 bg-red-950/50 p-6 text-center text-red-400">
              <p className="font-semibold">Error al cargar los servicios</p>
              <p className="mt-1 text-sm">{error}</p>
            </div>
          )}

          {!loading && !error && <ServiceGrid services={services} />}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App