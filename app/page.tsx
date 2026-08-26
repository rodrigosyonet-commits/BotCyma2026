const customers = [
  {
    name: "Juan Pérez",
    phone: "+52 461 123 4567",
  },
  {
    name: "María López",
    phone: "+52 442 111 2233",
  },
  {
    name: "Carlos Ramírez",
    phone: "+52 477 555 6677",
  },
];

export default function Home() {
  return (
    <main style={styles.container}>
      <CustomersPanel />
      <ChatPanel />
      <TicketPanel />
    </main>
  );
}

function CustomersPanel() {
  return (
    <section style={styles.sidebar}>
      <Header title="Clientes" />

      {customers.map((customer) => (
        <div key={customer.phone} style={styles.customerCard}>
          <strong>{customer.name}</strong>
          <small>{customer.phone}</small>
        </div>
      ))}
    </section>
  );
}

function ChatPanel() {
  return (
    <section style={styles.chatSection}>
      <Header title="Conversación" />

      <div style={styles.messages}>
        <div style={styles.clientMessage}>
          Hola
        </div>

        <div style={styles.botMessage}>
          Bienvenido a CYMA Arrendamiento.
          <br />
          <br />
          Seleccione una opción:
          <br />
          1️⃣ Facturación
          <br />
          2️⃣ Recibos de pago
          <br />
          3️⃣ Mantenimiento
          <br />
          4️⃣ Contratos
          <br />
          5️⃣ Documentación
          <br />
          6️⃣ Hablar con un asesor
        </div>
      </div>

      <div style={styles.inputArea}>
        <input
          type="text"
          placeholder="Escribir mensaje..."
          style={styles.input}
        />
      </div>
    </section>
  );
}

function TicketPanel() {
  return (
    <section style={styles.ticketSection}>
      <Header title="Solicitud" />

      <InfoRow label="Cliente" value="Juan Pérez" />
      <InfoRow label="Teléfono" value="+52 461 123 4567" />
      <InfoRow label="Categoría" value="Mantenimiento" />
      <InfoRow label="Subcategoría" value="Filtraciones" />
      <InfoRow label="Estado" value="Abierto" />

      <button style={styles.button}>
        Tomar conversación
      </button>
    </section>
  );
}

function Header({ title }: { title: string }) {
  return (
    <div style={styles.header}>
      {title}
    </div>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div style={styles.infoRow}>
      <strong>{label}</strong>
      <span>{value}</span>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "grid",
    gridTemplateColumns: "320px 1fr 350px",
    height: "100vh",
    fontFamily: "Segoe UI, sans-serif",
    background: "#f4f6f8",
  },

  sidebar: {
    background: "#fff",
    borderRight: "1px solid #ddd",
    overflowY: "auto",
  },

  chatSection: {
    display: "flex",
    flexDirection: "column",
    background: "#ece5dd",
  },

  ticketSection: {
    background: "#fff",
    borderLeft: "1px solid #ddd",
    padding: 20,
  },

  header: {
    padding: 16,
    fontWeight: 700,
    borderBottom: "1px solid #ddd",
    background: "#fff",
  },

  customerCard: {
    display: "flex",
    flexDirection: "column",
    padding: 16,
    borderBottom: "1px solid #eee",
    cursor: "pointer",
  },

  messages: {
    flex: 1,
    padding: 20,
    overflowY: "auto",
  },

  clientMessage: {
    background: "#fff",
