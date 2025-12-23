import { calcularPresupuestoTotal } from "./calculos.js";

function esNumeroValido(valor) {
  return Number.isFinite(Number(valor));
}

export function validarServidor(formulario) {
  const errores = {};

  const nombreServidor = String(formulario.nombreServidor || "").trim();
  const cpuNucleos = Number(formulario.cpuNucleos);
  const ramGB = Number(formulario.ramGB);
  const almacenamientoCapacidadTB = Number(formulario.almacenamientoCapacidadTB);

  const cpuPrecio = Number(formulario.cpuPrecio);
  const ramPrecio = Number(formulario.ramPrecio);
  const almacenamientoPrecio = Number(formulario.almacenamientoPrecio);

  const presupuestoTotal = calcularPresupuestoTotal(formulario);

  if (!nombreServidor) {
    errores.nombreServidor = "El nombre del servidor es obligatorio.";
  }

  if (!esNumeroValido(cpuNucleos) || cpuNucleos < 2) {
    errores.cpuNucleos = "CPU: mínimo 2 núcleos.";
  }
  if (!esNumeroValido(cpuPrecio) || cpuPrecio < 0) {
    errores.cpuPrecio = "CPU: el precio debe ser 0 o mayor.";
  }

  if (!esNumeroValido(ramGB) || ramGB < 4) {
    errores.ramGB = "RAM: mínimo 4 GB.";
  }
  if (!esNumeroValido(ramPrecio) || ramPrecio < 0) {
    errores.ramPrecio = "RAM: el precio debe ser 0 o mayor.";
  }

  if (!esNumeroValido(almacenamientoCapacidadTB) || almacenamientoCapacidadTB < 1) {
    errores.almacenamientoCapacidadTB = "Almacenamiento: capacidad mínima 1 TB.";
  }
  if (!esNumeroValido(almacenamientoPrecio) || almacenamientoPrecio < 0) {
    errores.almacenamientoPrecio = "Almacenamiento: el precio debe ser 0 o mayor.";
  }

  if (!esNumeroValido(presupuestoTotal)) {
    errores.presupuestoTotal = "El presupuesto total no es válido.";
  } else if (presupuestoTotal > 700) {
    errores.presupuestoTotal = "El presupuesto total no puede superar 700 €.";
  }

  return {
    esValido: Object.keys(errores).length === 0,
    errores
  };
}
