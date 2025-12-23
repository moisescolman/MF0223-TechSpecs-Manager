const URL_BASE = "https://694a58341282f890d2d861c2.mockapi.io/api";
const RECURSO = "servidores";

function obtenerUrlRecurso() {
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
  const respuesta = await fetch(obtenerUrlRecurso(), { method: "GET" });
  const datos = await manejarRespuesta(respuesta);

  const normalizados = (Array.isArray(datos) ? datos : []).map((s) => {
    const tipo = String(s.almacenamientoTipo || "").toUpperCase();
    const tipoNormalizado =
      tipo.includes("HDD") ? "HDD" :
      tipo.includes("SSD") ? "SSD" :
      "SSD"; // valor por defecto

    return { ...s, almacenamientoTipo: tipoNormalizado };
  });

  return normalizados;
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
