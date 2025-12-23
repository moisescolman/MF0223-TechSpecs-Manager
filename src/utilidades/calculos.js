export function calcularPresupuestoTotal(formulario) {
  const cpuPrecio = Number(formulario.cpuPrecio || 0);
  const ramPrecio = Number(formulario.ramPrecio || 0);
  const almacenamientoPrecio = Number(formulario.almacenamientoPrecio || 0);

  return cpuPrecio + ramPrecio + almacenamientoPrecio;
}
