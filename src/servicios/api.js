const URL_BASE = import.meta.env.VITE_API_URL;
const RECURSO = import.meta.env.VITE_RECURSO_SERVIDORES || "servidores";

function obtenerUrlRecurso() {
  if (!URL_BASE) {
    throw new Error("Falta VITE_API_URL. Crea un .env con la URL de MockAPI.");
  }
  return `${URL_BASE.replace(/\/$/, "")}/${RECURSO}`;
}

async function manejarRespuesta(respuesta) {
  if (!respuesta.ok) {
    const texto = await respuesta.text().catch(() => "");
    throw new Error(
      `Error API (${respuesta.status}): ${texto || "Solicitud fallida"}`
    );
  }
  return respuesta.json();
}

export async function apiObtenerServidores() {
  const url = obtenerUrlRecurso();

  const respuesta = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  });

  const datos = await manejarRespuesta(respuesta);
  return Array.isArray(datos) ? datos : [];
}

export async function apiCrearServidor(payload) {
  const url = obtenerUrlRecurso();

  const respuesta = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  return manejarRespuesta(respuesta);
}

export async function apiEliminarServidor(id) {
  const url = `${obtenerUrlRecurso()}/${id}`;

  const respuesta = await fetch(url, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" }
  });

  return manejarRespuesta(respuesta);
}
