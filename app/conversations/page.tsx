export default function ConversationsPage() {
  const conversations = [
    {
      id: 1,
      name: "Juan Pérez",
      phone: "+52 461 123 4567",
      lastMessage: "Necesito una factura",
      unread: 2,
    },
    {
      id: 2,
      name: "María López",
      phone: "+52 442 111 2233",
      lastMessage: "Tengo una filtración",
      unread: 0,
    },
    {
      id: 3,
      name: "Carlos Ramírez",
      phone: "+52 477 555 6677",
      lastMessage: "Quiero renovar contrato",
      unread: 1,
    },
  ];

  const messages = [
    {
      id: 1,
      direction: "in",
      text: "Hola",
      time: "10:20",
    },
    {
      id: 2,
      direction: "out",
      text: "Bienvenido a CYMA Arrendamiento.",
      time: "10:21",
    },
    {
      id: 3,
      direction: "out",
      text: "Seleccione una opción:",
      time: "10:21",
    },
    {
      id: 4,
      direction: "in",
      text: "1",
      time: "10:22",
    },
    {
      id: 5,
      direction: "out",
      text: "Facturación\n1. Solicitar factura\n2. Complemento de pago",
      time: "10:22",
    },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "320px 1fr 350px",
        height: "100vh",
        background: "#f5f5f5",
        fontFamily: "Segoe UI, Arial, sans-serif",
      }}
    >
      {/* LISTA DE CONVERSACIONES */}
      <aside
        style={{
          background: "#fff",
          borderRight: "1px solid #ddd",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            padding: "20px",
            borderBottom: "1px solid #ddd",
            fontSize: "20px",
            fontWeight: 700,
          }}
        >
          Conversaciones
        </div>

        {conversations.map((chat) => (
          <div
            key={chat.id}
            style={{
              padding: "15px",
              borderBottom: "1px solid #eee",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <strong>{chat.name}</strong>

              {chat.unread > 0 && (
                <span
                  style={{
                    background: "#22c55e",
                    color: "#fff",
                    borderRadius: "999px",
                    padding: "2px 8px",
                    fontSize: "12px",
                  }}
                >
                  {chat.unread}
                </span>
              )}
            </div>

            <div
              style={{
                fontSize: "13px",
                color: "#666",
                marginTop: "4px",
              }}
            >
              {chat.phone}
            </div>

            <div
              style={{
                fontSize: "13px",
                color: "#444",
                marginTop: "6px",
              }}
            >
              {chat.lastMessage}
            </div>
          </div>
        ))}
      </aside>

      {/* CHAT */}
      <main
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            background: "#fff",
            borderBottom: "1px solid #ddd",
            padding: "15px 20px",
          }}
        >
          <strong>Juan Pérez</strong>
          <div
            style={{
              color: "#666",
              fontSize: "13px",
              marginTop: "4px",
            }}
          >
            +52 461 123 4567
          </div>
        </div>

        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "20px",
            background: "#efeae2",
          }}
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                display: "flex",
                justifyContent:
                  msg.direction === "out"
                    ? "flex-end"
                    : "flex-start",
                marginBottom: "10px",
              }}
            >
              <div
                style={{
                  background:
                    msg.direction === "out"
                      ? "#dcf8c6"
                      : "#fff",
                  padding: "10px 14px",
                  borderRadius: "12px",
                  maxWidth: "70%",
                  boxShadow:
                    "0 1px 2px rgba(0,0,0,0.10)",
                }}
              >
                <div
                  style={{
                    whiteSpace: "pre-line",
                  }}
                >
                  {msg.text}
                </div>

                <div
                  style={{
                    textAlign: "right",
                    marginTop: "5px",
                    fontSize: "11px",
                    color: "#666",
                  }}
                >
                  {msg.time}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            background: "#fff",
            padding: "15px",
            borderTop: "1px solid #ddd",
            display: "flex",
            gap: "10px",
          }}
        >
          <input
            type="text"
            placeholder="Escribir mensaje..."
            style={{
              flex: 1,
              padding: "12px",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          />

          <button
            style={{
              background: "#25D366",
              color: "#fff",
              border: "none",
              padding: "12px 20px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Enviar
          </button>
        </div>
      </main>

      {/* PANEL DERECHO */}
      <aside
        style={{
          background: "#fff",
          borderLeft: "1px solid #ddd",
          padding: "20px",
        }}
      >
        <h2>Cliente</h2>

        <div style={{ marginBottom: "15px" }}>
          <strong>Nombre</strong>
          <br />
          Juan Pérez
        </div>

        <div style={{ marginBottom: "15px" }}>
          <strong>Teléfono</strong>
          <br />
          +52 461 123 4567
        </div>

        <div style={{ marginBottom: "15px" }}>
          <strong>Correo</strong>
          <br />
          juan@correo.com
        </div>

        <hr />

        <h3>Ticket Actual</h3>

        <div style={{ marginBottom: "10px" }}>
          <strong>Categoría</strong>
          <br />
          Facturación
        </div>

        <div style={{ marginBottom: "10px" }}>
          <strong>Subcategoría</strong>
          <br />
          Solicitud de factura
        </div>

        <div style={{ marginBottom: "10px" }}>
          <strong>Estatus</strong>
          <br />
          Abierto
        </div>

        <button
          style={{
            width: "100%",
            marginTop: "15px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "12px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Tomar conversación
        </button>
      </aside>
    </div>
  );
}
