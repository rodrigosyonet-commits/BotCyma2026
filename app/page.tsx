export default function Home() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "300px 1fr 350px",
        height: "100vh",
        fontFamily: "Arial"
      }}
    >
      <div
        style={{
          borderRight: "1px solid #ddd",
          padding: "20px"
        }}
      >
        <h2>Clientes</h2>

        <div>Juan Pérez</div>
        <div>Ana López</div>
        <div>Pedro Ruiz</div>
      </div>

      <div
        style={{
          borderRight: "1px solid #ddd",
          padding: "20px"
        }}
      >
        <h2>Conversación</h2>

        <p>Cliente: Hola</p>

        <p>
          Bot: Bienvenido a CYMA
        </p>
      </div>

      <div
        style={{
          padding: "20px"
        }}
      >
        <h2>Ticket</h2>

        <p>
          Categoría:
          Mantenimiento
        </p>

        <p>
          Subcategoría:
          Filtraciones
        </p>
      </div>
    </div>
  );
}
