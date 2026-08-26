export default function Home() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "320px 1fr 380px",
        height: "100vh",
        fontFamily: "Segoe UI, Arial, sans-serif",
        backgroundColor: "#f5f7fa"
      }}
    >
      {/* CLIENTES */}
      <div
        style={{
          backgroundColor: "#fff",
          borderRight: "1px solid #ddd",
          overflowY: "auto"
        }}
      >
        <div
          style={{
            padding: "20px",
            borderBottom: "1px solid #ddd",
            fontWeight: "bold"
          }}
        >
          Clientes
        </div>

        <div style={{ padding: "15px", borderBottom: "1px solid #eee" }}>
          Juan Pérez
          <br />
          <small>+52 461 123 4567</small>
        </div>

        <div style={{ padding: "15px", borderBottom: "1px solid #eee" }}>
          María López
          <br />
          <small>+52 442 111 2233</small>
        </div>

        <div style={{ padding: "15px", borderBottom: "1px solid #eee" }}>
          Carlos Ramírez
          <br />
          <small>+52 477 555 6677</small>
        </div>
      </div>

      {/* CHAT */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#e5ddd5"
        }}
      >
        <div
          style={{
            backgroundColor: "#fff",
            padding: "15px",
            borderBottom: "1px solid #ddd",
            fontWeight: "bold"
          }}
        >
          Conversación
        </div>

        <div
          style={{
            flex: 1,
            padding: "20px",
            overflowY: "auto"
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "10px",
              borderRadius: "10px",
              maxWidth: "300px",
              marginBottom: "10px"
            }}
          >
            Hola
          </div>

          <div
            style={{
              backgroundColor: "#dcf8c6",
              padding: "10px",
              borderRadius: "10px",
              maxWidth: "400px",
              marginLeft: "auto"
            }}
          >
            Bienvenido a CYMA Arrendamiento.
            <br />
            Seleccione una opción:
            <br />
            1 Facturación
            <br />
            2 Recibos de pago
            <br />
            3 Mantenimiento
            <br />
            4 Contratos
            <br />
            5 Documentación
            <br />
            6 Asesor
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#fff",
            padding: "10px",
            borderTop: "1px solid #ddd"
          }}
        >
          <input
            placeholder="Escribir mensaje..."
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc"
            }}
          />
        </div>
      </div>

      {/* TICKET */}
      <div
        style={{
          backgroundColor: "#fff",
          borderLeft: "1px solid #ddd",
          padding: "20px"
        }}
      >
        <h2>Ticket</h2>

        <p>
          <strong>Cliente:</strong>
          <br />
          Juan Pérez
        </p>

        <p>
          <strong>Teléfono:</strong>
          <br />
          +52 461 123 4567
        </p>

        <p>
          <strong>Categoría:</strong>
          <br />
          Mantenimiento
        </p>

        <p>
          <strong>Subcategoría:</strong>
          <br />
          Filtraciones
        </p>

        <p>
          <strong>Estado:</strong>
          <br />
          Abierto
        </p>

        <button
          style={{
            padding: "12px",
            backgroundColor: "#25D366",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Tomar conversación
        </button>
      </div>
    </div>
  );
}
``
