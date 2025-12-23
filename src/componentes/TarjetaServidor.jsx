export default function TarjetaServidor({ servidor, onEliminar }) {
  const {
    nombreServidor,
    cpuNucleos,
    cpuPrecio,
    ramGB,
    ramPrecio,
    almacenamientoTipo,
    almacenamientoCapacidadTB,
    almacenamientoPrecio,
    presupuestoTotal
  } = servidor;

  return (
    <article className="tarjeta">
      <header className="tarjeta__cabecera">
        <h3 className="tarjeta__titulo">{nombreServidor}</h3>
        <span className="tarjeta__badge">
          {Number(presupuestoTotal || 0).toFixed(2)} €
        </span>
      </header>

      <dl className="tarjeta__detalle">
        <div className="tarjeta__fila">
          <dt className="tarjeta__etiqueta">CPU</dt>
          <dd className="tarjeta__valor">
            {cpuNucleos} núcleos · {Number(cpuPrecio || 0).toFixed(2)} €
          </dd>
        </div>

        <div className="tarjeta__fila">
          <dt className="tarjeta__etiqueta">RAM</dt>
          <dd className="tarjeta__valor">
            {ramGB} GB · {Number(ramPrecio || 0).toFixed(2)} €
          </dd>
        </div>

        <div className="tarjeta__fila">
          <dt className="tarjeta__etiqueta">Almacenamiento</dt>
          <dd className="tarjeta__valor">
            {almacenamientoTipo} · {almacenamientoCapacidadTB} TB ·{" "}
            {Number(almacenamientoPrecio || 0).toFixed(2)} €
          </dd>
        </div>
      </dl>

      <div className="tarjeta__acciones">
        <button className="boton boton--peligro" type="button" onClick={onEliminar}>
          Eliminar
        </button>
      </div>
    </article>
  );
}
