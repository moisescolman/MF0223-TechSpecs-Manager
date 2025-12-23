# TechSpecs Manager (React + Vite + MockAPI)

SPA para gestionar un catálogo de configuraciones de hardware (servidores) con **GET / POST / DELETE** usando **MockAPI.io**.
Cumple el enfoque de “sin refresh” (SPA) y muestra los servidores en formato de **tarjetas**.

## Funcionalidades
- **GET**: carga inicial de servidores desde MockAPI y renderizado de cards.
- **POST**: alta de servidor desde formulario (sin recargar la página).
- **DELETE**: eliminación de servidor desde cada tarjeta (sin recargar la página).

## Reglas y validaciones
- CPU: **mínimo 2 núcleos**
- RAM: **mínimo 4 GB**
- Almacenamiento: **capacidad mínima 1 TB**
- Presupuesto: suma **CPU + RAM + Almacenamiento** ≤ **700 €**
- El presupuesto se calcula automáticamente a partir de los 3 precios (CPU, RAM, almacenamiento).

## Requisitos
- Node.js (LTS recomendado)
- (Opcional) Docker, para ejecutar en contenedor

## Configuración de MockAPI
1. En MockAPI.io crea un proyecto.
2. Crea un recurso llamado: **`servidores`**
3. Endpoint típico del proyecto:
   - `https://TU_ID.mockapi.io/api/servidores`

Campos que la app envía/lee (recomendado):
- `nombreServidor`
- `cpuNucleos`, `cpuPrecio`
- `ramGB`, `ramPrecio`
- `almacenamientoTipo`, `almacenamientoCapacidadTB`, `almacenamientoPrecio`
- `presupuestoTotal`

## IMPORTANTE (sin .env)
Este proyecto **NO usa `.env`**.  
La URL de MockAPI está definida directamente en el archivo:

- `src/servicios/api.js`

Ahí debes ajustar estas constantes si cambias de proyecto MockAPI:

```js
const URL_BASE = "https://TU_ID.mockapi.io/api";
const RECURSO = "servidores";
