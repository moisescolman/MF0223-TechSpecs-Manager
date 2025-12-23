export default function Encabezado({ totalServidores }) {
  return (
    <header className="encabezado">
      <div className="encabezado__contenedor">
        <h1 className="encabezado__titulo">TechSpecs Manager</h1>
        <div className="encabezado__badge" aria-label="Total de servidores">
          {totalServidores} servidor{totalServidores === 1 ? "" : "es"}
        </div>
      </div>
    </header>
  );
}
