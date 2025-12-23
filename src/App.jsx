import { useEffect, useMemo, useState } from "react";
import Encabezado from "./componentes/Encabezado.jsx";
import FormularioServidor from "./componentes/FormularioServidor.jsx";
import ListaServidores from "./componentes/ListaServidores.jsx";
import { apiCrearServidor, apiEliminarServidor, apiObtenerServidores } from "./servicios/api.js";

export default function App() {
  const [servidores, setServidores] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [errorGeneral, setErrorGeneral] = useState("");

  const totalServidores = useMemo(() => servidores.length, [servidores]);

  async function cargarServidores() {
    setCargando(true);
    setErrorGeneral("");
    try {
      const datos = await apiObtenerServidores();
      setServidores(datos);
    } catch (error) {
      setErrorGeneral(error?.message || "No se pudieron cargar los servidores.");
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    cargarServidores();
  }, []);

  async function manejarCrearServidor(payloadServidor) {
    setErrorGeneral("");
    const creado = await apiCrearServidor(payloadServidor);
    setServidores((prev) => [creado, ...prev]);
  }

  async function manejarEliminarServidor(id) {
    setErrorGeneral("");
    const copiaAnterior = servidores;
    setServidores((prev) => prev.filter((s) => String(s.id) !== String(id)));

    try {
      await apiEliminarServidor(id);
    } catch (error) {
      setServidores(copiaAnterior);
      setErrorGeneral(error?.message || "No se pudo eliminar el servidor.");
    }
  }

  return (
    <div className="app">
      <Encabezado totalServidores={totalServidores} />

      <main className="app__contenido">
        <section className="app__grid">
          <div className="app__columna app__columna--formulario">
            <FormularioServidor onCrearServidor={manejarCrearServidor} />
          </div>

          <div className="app__columna app__columna--lista">
            {errorGeneral ? (
              <div className="alerta alerta--error" role="alert">
                {errorGeneral}
              </div>
            ) : null}

            <ListaServidores
              servidores={servidores}
              cargando={cargando}
              onEliminarServidor={manejarEliminarServidor}
              onReintentar={cargarServidores}
            />
          </div>
        </section>
      </main>

      <footer className="app__pie">
        <span className="app__pie-texto">TechSpecs Manager · SPA (React + Fetch)</span>
      </footer>
    </div>
  );
}
