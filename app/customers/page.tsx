export default function CustomersPage() {
  const customers = [
    {
      id: 1,
      name: "Juan Pérez",
      phone: "+52 461 123 4567",
      email: "juan@correo.com",
    },
    {
      id: 2,
      name: "María López",
      phone: "+52 442 111 2233",
      email: "maria@correo.com",
    },
    {
      id: 3,
      name: "Carlos Ramírez",
      phone: "+52 477 555 6677",
      email: "carlos@correo.com",
    },
  ];

  return (
    <div
      style={{
        padding: "30px",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      <h1>Clientes</h1>

      <div
        style={{
          marginTop: "20px",
          background: "#fff",
          borderRadius: "8px",
          overflow: "hidden",
          border: "1px solid #ddd",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: "#f3f4f6",
              }}
            >
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Nombre</th>
              <th style={thStyle}>Teléfono</th>
              <th style={thStyle}>Correo</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td style={tdStyle}>{customer.id}</td>
                <td style={tdStyle}>{customer.name}</td>
                <td style={tdStyle}>{customer.phone}</td>
                <td style={tdStyle}>{customer.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const thStyle = {
  padding: "12px",
  textAlign: "left" as const,
  borderBottom: "1px solid #ddd",
};

const tdStyle = {
  padding: "12px",
  borderBottom: "1px solid #eee",
};
