import { useMemo, useState } from "react";
import { calcularPresupuestoTotal } from "../utilidades/calculos.js";
import { validarServidor } from "../utilidades/validaciones.js";

const ESTADO_INICIAL = {
  nombreServidor: "",
  cpuNucleos: 2,
  cpuPrecio: 0,
  ramGB: 4,
  ramPrecio: 0,
  almacenamientoTipo: "SSD",
  almacenamientoCapacidadTB: 1,
  almacenamientoPrecio: 0
};

export default function FormularioServidor({ onCrearServidor }) {
  const [formulario, setFormulario] = useState(ESTADO_INICIAL);
  const [errores, setErrores] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [errorEnvio, setErrorEnvio] = useState("");

  const presupuestoTotal = useMemo(
    () => calcularPresupuestoTotal(formulario),
    [formulario]
  );

  function actualizarCampo(campo, valor) {
    setFormulario((prev) => ({ ...prev, [campo]: valor }));
  }

  async function manejarSubmit(e) {
    e.preventDefault();
    setErrorEnvio("");

    const resultado = validarServidor(formulario);
    setErrores(resultado.errores);

    if (!resultado.esValido) return;

    const payload = {
      ...formulario,
      presupuestoTotal
    };

    setEnviando(true);
    try {
      await onCrearServidor(payload);
      setFormulario(ESTADO_INICIAL);
      setErrores({});
    } catch {
      setErrorEnvio("No se pudo guardar el servidor. Revisa la API/URL.");
    } finally {
      setEnviando(false);
    }
  }

  const presupuestoExcedido = presupuestoTotal > 700;

  return (
    <section className="formulario">
      <h2 className="formulario__titulo">Añadir servidor</h2>

      {errorEnvio ? (
        <div className="alerta alerta--error" role="alert">
          {errorEnvio}
        </div>
      ) : null}

      <form className="formulario__form" onSubmit={manejarSubmit}>
        <div className="formulario__grupo">
          <label className="formulario__etiqueta" htmlFor="nombreServidor">
            Nombre del servidor
          </label>
          <input
            id="nombreServidor"
            className={`formulario__control ${
              errores.nombreServidor ? "formulario__control--invalido" : ""
            }`}
            type="text"
            value={formulario.nombreServidor}
            onChange={(e) => actualizarCampo("nombreServidor", e.target.value)}
            placeholder="Ej: DB-Server-01"
            autoComplete="off"
          />
          {errores.nombreServidor ? (
            <p className="formulario__error">{errores.nombreServidor}</p>
          ) : null}
        </div>

        <fieldset className="formulario__fieldset">
          <legend className="formulario__legend">CPU</legend>

          <div className="formulario__fila">
            <div className="formulario__grupo">
              <label className="formulario__etiqueta" htmlFor="cpuNucleos">
                Núcleos (mín. 2)
              </label>
              <input
                id="cpuNucleos"
                className={`formulario__control ${
                  errores.cpuNucleos ? "formulario__control--invalido" : ""
                }`}
                type="number"
                min={2}
                step={1}
                value={formulario.cpuNucleos}
                onChange={(e) =>
                  actualizarCampo("cpuNucleos", Number(e.target.value))
                }
              />
              {errores.cpuNucleos ? (
                <p className="formulario__error">{errores.cpuNucleos}</p>
              ) : null}
            </div>

            <div className="formulario__grupo">
              <label className="formulario__etiqueta" htmlFor="cpuPrecio">
                Precio CPU (€)
              </label>
              <input
                id="cpuPrecio"
                className={`formulario__control ${
                  errores.cpuPrecio ? "formulario__control--invalido" : ""
                }`}
                type="number"
                min={0}
                step="0.01"
                value={formulario.cpuPrecio}
                onChange={(e) =>
                  actualizarCampo("cpuPrecio", Number(e.target.value))
                }
              />
              {errores.cpuPrecio ? (
                <p className="formulario__error">{errores.cpuPrecio}</p>
              ) : null}
            </div>
          </div>
        </fieldset>

        <fieldset className="formulario__fieldset">
          <legend className="formulario__legend">RAM</legend>

          <div className="formulario__fila">
            <div className="formulario__grupo">
              <label className="formulario__etiqueta" htmlFor="ramGB">
                Capacidad (GB, mín. 4)
              </label>
              <input
                id="ramGB"
                className={`formulario__control ${
                  errores.ramGB ? "formulario__control--invalido" : ""
                }`}
                type="number"
                min={4}
                step={1}
                value={formulario.ramGB}
                onChange={(e) => actualizarCampo("ramGB", Number(e.target.value))}
              />
              {errores.ramGB ? (
                <p className="formulario__error">{errores.ramGB}</p>
              ) : null}
            </div>

            <div className="formulario__grupo">
              <label className="formulario__etiqueta" htmlFor="ramPrecio">
                Precio RAM (€)
              </label>
              <input
                id="ramPrecio"
                className={`formulario__control ${
                  errores.ramPrecio ? "formulario__control--invalido" : ""
                }`}
                type="number"
                min={0}
                step="0.01"
                value={formulario.ramPrecio}
                onChange={(e) =>
                  actualizarCampo("ramPrecio", Number(e.target.value))
                }
              />
              {errores.ramPrecio ? (
                <p className="formulario__error">{errores.ramPrecio}</p>
              ) : null}
            </div>
          </div>
        </fieldset>

        <fieldset className="formulario__fieldset">
          <legend className="formulario__legend">Almacenamiento</legend>

          <div className="formulario__fila">
            <div className="formulario__grupo">
              <label className="formulario__etiqueta" htmlFor="almacenamientoTipo">
                Tipo
              </label>
              <select
                id="almacenamientoTipo"
                className="formulario__control"
                value={formulario.almacenamientoTipo}
                onChange={(e) =>
                  actualizarCampo("almacenamientoTipo", e.target.value)
                }
              >
                <option value="SSD">SSD</option>
                <option value="HDD">HDD</option>
              </select>
            </div>

            <div className="formulario__grupo">
              <label
                className="formulario__etiqueta"
                htmlFor="almacenamientoCapacidadTB"
              >
                Capacidad (TB, mín. 1)
              </label>
              <input
                id="almacenamientoCapacidadTB"
                className={`formulario__control ${
                  errores.almacenamientoCapacidadTB
                    ? "formulario__control--invalido"
                    : ""
                }`}
                type="number"
                min={1}
                step="0.5"
                value={formulario.almacenamientoCapacidadTB}
                onChange={(e) =>
                  actualizarCampo(
                    "almacenamientoCapacidadTB",
                    Number(e.target.value)
                  )
                }
              />
              {errores.almacenamientoCapacidadTB ? (
                <p className="formulario__error">
                  {errores.almacenamientoCapacidadTB}
                </p>
              ) : null}
            </div>

            <div className="formulario__grupo">
              <label
                className="formulario__etiqueta"
                htmlFor="almacenamientoPrecio"
              >
                Precio Almacenamiento (€)
              </label>
              <input
                id="almacenamientoPrecio"
                className={`formulario__control ${
                  errores.almacenamientoPrecio
                    ? "formulario__control--invalido"
                    : ""
                }`}
                type="number"
                min={0}
                step="0.01"
                value={formulario.almacenamientoPrecio}
                onChange={(e) =>
                  actualizarCampo("almacenamientoPrecio", Number(e.target.value))
                }
              />
              {errores.almacenamientoPrecio ? (
                <p className="formulario__error">
                  {errores.almacenamientoPrecio}
                </p>
              ) : null}
            </div>
          </div>
        </fieldset>

        <div className={`resumen ${presupuestoExcedido ? "resumen--peligro" : ""}`}>
          <div className="resumen__fila">
            <span className="resumen__texto">Total CPU + RAM + Almacenamiento:</span>
            <strong className="resumen__valor">{presupuestoTotal.toFixed(2)} €</strong>
          </div>
          <div className="resumen__fila resumen__fila--pequena">
            <span className="resumen__ayuda">Límite: 700 €</span>
            {presupuestoExcedido ? (
              <span className="resumen__aviso">Excede el límite</span>
            ) : (
              <span className="resumen__ok">OK</span>
            )}
          </div>
        </div>

        {errores.presupuestoTotal ? (
          <p className="formulario__error">{errores.presupuestoTotal}</p>
        ) : null}

        <button className="boton boton--primario" type="submit" disabled={enviando}>
          {enviando ? "Guardando..." : "Guardar servidor"}
        </button>
      </form>
    </section>
  );
}
