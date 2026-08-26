const conversations = [
  {
    id: 1,
    name: "Juan Pérez",
    phone: "524611234567",
    lastMessage: "Tengo una filtración",
    time: "11:25"
  },
  {
    id: 2,
    name: "María López",
    phone: "524421112233",
    lastMessage: "Necesito una factura",
    time: "10:40"
  },
  {
    id: 3,
    name: "Carlos Ramírez",
    phone: "524771234567",
    lastMessage: "Renovación de contrato",
    time: "09:15"
  }
];

export default function ConversationsPage() {
  return (
    <main
      style={{
        display: "grid",
        gridTemplateColumns: "350px 1fr 320px",
        height: "100vh",
        fontFamily: "Segoe UI, sans-serif",
        background: "#f0f2f5"
      }}
    >
      {/* LISTA DE CONVERSACIONES */}
      <aside
        style={{
          background: "#fff",
          borderRight: "1px solid #ddd",
          overflowY: "auto"
        }}
      >
        <div
          style={{
            padding: "16px",
            fontWeight: 700,
            fontSize: "18px",
            borderBottom: "1px solid #ddd"
          }}
        >
          Conversaciones
        </div>

        {conversations.map((chat) => (
          <div
            key={chat.id}
            style={{
              padding: "16px",
              borderBottom: "1px solid #eee",
              cursor: "pointer"
            }}
          >
            <strong>{chat.name}</strong>

            <div
              style={{
                fontSize: "13px",
                color: "#666",
                marginTop: "4px"
              }}
            >
              {chat.lastMessage}
            </div>

            <small
              style={{
                color: "#999"
              }}
            >
              {chat.time}
            </small>
          </div>
        ))}
      </aside>

      {/* CHAT */}
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          background: "#e5ddd5"
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: "16px",
            borderBottom: "1px solid #ddd"
          }}
        >
          <strong>Juan Pérez</strong>
          <br />
          <small>524611234567</small>
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
              background: "#fff",
              padding: "12px",
              borderRadius: "10px",
              width: "fit-content",
              marginBottom: "15px"
            }}
          >
            Hola
          </div>

          <div
            style={{
              background: "#dcf8c6",
              padding: "12px",
              borderRadius: "10px",
              width: "fit-content",
              maxWidth: "500px",
              marginLeft: "auto",
              marginBottom: "15px"
            }}
          >
            Bienvenido a CYMA Arrendamiento.
            <br />
            <br />
            Seleccione una opción:
            <br />
            1️⃣ Facturación
            <br />
            2️⃣ Recibos
            <br />
            3️⃣ Mantenimiento
            <br />
            4️⃣ Contratos
            <br />
            5️⃣ Documentación
            <br />
            6️⃣ Asesor
          </div>

          <div
            style={{
              background: "#fff",
              padding: "12px",
              borderRadius: "10px",
              width: "fit-content"
            }}
          >
            3
          </div>

          <div
            style={{
              background: "#dcf8c6",
              padding: "12px",
              borderRadius: "10px",
              width: "fit-content",
              marginLeft: "auto"
            }}
          >
            Mantenimiento
            <br />
            1️⃣ Filtraciones
            <br />
            2️⃣ Estructural
            <br />
            3️⃣ Eléctrico
          </div>
        </div>

        <div
          style={{
            background: "#fff",
            borderTop: "1px solid #ddd",
            padding: "10px",
            display: "flex",
            gap: "10px"
          }}
        >
          <input
            placeholder="Escribir mensaje..."
            style={{
              flex: 1,
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc"
            }}
          />

          <button
            style={{
              background: "#25D366",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "12px 20px",
              cursor: "pointer"
            }}
          >
            Enviar
          </button>
        </div>
      </section>

      {/* PANEL DE DETALLE */}
      <aside
        style={{
          background: "#fff",
          borderLeft: "1px solid #ddd",
          padding: "20px"
        }}
      >
        <h2>Cliente</h2>

        <p>
          <strong>Nombre</strong>
          <br />
          Juan Pérez
        </p>

        <p>
          <strong>Teléfono</strong>
          <br />
          524611234567
        </p>

        <p>
          <strong>Correo</strong>
          <br />
          juan@correo.com
        </p>

        <hr />

        <h3>Solicitud</h3>

        <p>
          <strong>Categoría</strong>
          <br />
          Mantenimiento
        </p>

        <p>
          <strong>Subcategoría</strong>
          <br />
          Filtraciones
        </p>

        <p>
          <strong>Estado</strong>
          <br />
          Abierto
        </p>

        <button
          style={{
            width: "100%",
            padding: "12px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            marginTop: "15px",
            cursor: "pointer"
          }}
        >
          Tomar conversación
        </button>
      </aside>
    </main>
  );
}
