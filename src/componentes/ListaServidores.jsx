import TarjetaServidor from "./TarjetaServidor.jsx";

export default function ListaServidores({
  servidores,
  cargando,
  onEliminarServidor,
  onReintentar
}) {
  return (
    <section className="lista">
      <div className="lista__encabezado">
        <h2 className="lista__titulo">Servidores registrados</h2>
        <button className="boton boton--secundario" type="button" onClick={onReintentar}>
          Recargar
        </button>
      </div>

      {cargando ? <p className="lista__estado">Cargando...</p> : null}

      {!cargando && servidores.length === 0 ? (
        <p className="lista__estado">
          No hay servidores todavía. Añade el primero desde el formulario.
        </p>
      ) : null}

      <div className="lista__grid">
        {servidores.map((servidor) => (
          <TarjetaServidor
            key={servidor.id}
            servidor={servidor}
            onEliminar={() => onEliminarServidor(servidor.id)}
          />
        ))}
      </div>
    </section>
  );
}
