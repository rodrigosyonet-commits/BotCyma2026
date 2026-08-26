export default function Home() {
  return (
    <main
      style={{
        padding: "40px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: "48px",
          fontWeight: "bold",
          marginBottom: "20px",
        }}
      >
        CYMA WhatsApp CRM
      </h1>

      <p
        style={{
          fontSize: "24px",
          marginBottom: "30px",
        }}
      >
        Aplicación funcionando correctamente.
      </p>

      <hr />

      <h2>Estado del Sistema</h2>

      <ul>
        <li>✅ Vercel funcionando</li>
        <li>✅ Next.js funcionando</li>
        <li>✅ Despliegue desde GitHub activo</li>
        <li>⏳ Webhook WhatsApp en configuración</li>
        <li>⏳ Catálogo de clientes</li>
        <li>⏳ Dashboard CRM</li>
      </ul>

      <div
        style={{
          marginTop: "30px",
          padding: "15px",
          background: "#f3f3f3",
          borderRadius: "8px",
        }}
      >
        <strong>Webhook esperado:</strong>

        <pre
          style={{
            marginTop: "10px",
            whiteSpace: "pre-wrap",
          }}
        >
{`/api/webhook`}
        </pre>
      </div>
    </main>
  );
}
