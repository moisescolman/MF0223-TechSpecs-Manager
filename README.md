# TechSpecs Manager (React + Vite)

SPA para gestionar un catálogo de configuraciones de hardware (servidores) con **GET/POST/DELETE** usando **MockAPI.io**.

## Requisitos
- Node.js (LTS recomendado)

## Configuración
1. Instala dependencias:
   ```bash
   npm install
   ```

2. Crea un archivo `.env` en la raíz (puedes copiar `.env.example`) y configura tu MockAPI:
   ```bash
   VITE_API_URL=https://TU_MOCKAPI.mockapi.io/api/v1
   VITE_RECURSO_SERVIDORES=servidores
   ```

3. Arranca en local:
   ```bash
   npm run dev
   ```

## MockAPI.io
Crea un recurso llamado `servidores`. La app enviará/leerá campos como:
- `nombreServidor`
- `cpuNucleos`, `cpuPrecio`
- `ramGB`, `ramPrecio`
- `almacenamientoTipo`, `almacenamientoCapacidadTB`, `almacenamientoPrecio`
- `presupuestoTotal`

## Docker (producción)
Construir y ejecutar:
```bash
docker build -t techspecs-manager .
docker run -p 8080:80 techspecs-manager
```
Abrir: http://localhost:8080
