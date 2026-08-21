import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// =============================
// WhatsApp Sender
// =============================
async function sendWhatsappMessage(
  to: string,
  body: string
) {
  await fetch(
    `https://graph.facebook.com/v23.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to,
        type: "text",
        text: {
          body,
        },
      }),
    }
  );
}

// =============================
// Email
// =============================
async function sendTicketEmail(ticket: any) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: "arrendamiento.cyma2025@gmail.com",
    subject: `Nuevo Ticket CYMA`,
    html: `
      <h2>Nueva Solicitud</h2>

      <p><strong>Cliente:</strong> ${ticket.name}</p>

      <p><strong>Número Cliente:</strong>
      ${ticket.customerNumber}</p>

      <p><strong>Teléfono:</strong>
      ${ticket.phone}</p>

      <p><strong>Categoría:</strong>
      ${ticket.category}</p>

      <p><strong>Subcategoría:</strong>
      ${ticket.subcategory}</p>
    `,
  });
}

// =============================
// Crear Ticket
// =============================
async function createTicket(
  phone: string,
  name: string,
  customerNumber: string,
  category: string,
  subcategory: string
) {
  await supabase.from("tickets").insert({
    phone,
    customer_name: name,
    customer_number: customerNumber,
    category,
    subcategory,
    status: "OPEN",
  });

  await sendTicketEmail({
    phone,
    name,
    customerNumber,
    category,
    subcategory,
  });
}

// =============================
// META VERIFICATION
// =============================
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (
    mode === "subscribe" &&
    token === process.env.WHATSAPP_VERIFY_TOKEN
  ) {
    return new Response(challenge, {
      status: 200,
    });
  }

  return NextResponse.json(
    {
      error: "Verification failed",
    },
    {
      status: 403,
    }
  );
}

// =============================
// MAIN WEBHOOK
// =============================
export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();

    const message =
      payload?.entry?.[0]?.changes?.[0]?.value?.messages?.[0];

    if (!message) {
      return NextResponse.json({
        success: true,
      });
    }

    const phone = message.from;
    const text = message.text?.body?.trim();

    // Guardar mensaje recibido
    await supabase.from("messages").insert({
      phone,
      body: text,
      direction: "IN",
    });

    const { data: state } = await supabase
      .from("conversation_state")
      .select("*")
      .eq("phone", phone)
      .single();

    // =============================
    // NUEVO CONTACTO
    // =============================
    if (!state) {
      await supabase
        .from("conversation_state")
        .insert({
          phone,
          step: "WAITING_CUSTOMER_NUMBER",
        });

      await sendWhatsappMessage(
        phone,
        "Bienvenido a CYMA Arrendamientos.\n\nPor favor compártenos tu número de cliente."
      );

      return NextResponse.json({
        success: true,
      });
    }

    // =============================
    // ESTADO 1
    // =============================
    if (state.step === "WAITING_CUSTOMER_NUMBER") {
      await supabase
        .from("conversation_state")
        .update({
          customer_number: text,
          step: "WAITING_NAME",
        })
        .eq("phone", phone);

      await sendWhatsappMessage(
        phone,
        "Ahora comparte tu nombre completo."
      );

      return NextResponse.json({
        success: true,
      });
    }

    // =============================
    // ESTADO 2
    // =============================
    if (state.step === "WAITING_NAME") {
      await supabase
        .from("conversation_state")
        .update({
          customer_name: text,
          step: "WAITING_MAIN_MENU",
        })
        .eq("phone", phone);

      await sendWhatsappMessage(
        phone,
`Seleccione una opción:

1️⃣ Facturación

2️⃣ Envío de recibos de pago

3️⃣ Mantenimiento y reparaciones

4️⃣ Contratos

5️⃣ Documentación

6️⃣ Hablar con un asesor`
      );

      return NextResponse.json({
        success: true,
      });
    }

    // =============================
    // MENU PRINCIPAL
    // =============================
    if (state.step === "WAITING_MAIN_MENU") {
      let submenu = "";
      let nextStep = "";

      switch (text) {
        case "1":
          nextStep = "FACTURACION";

          submenu =
`Facturación

1. Reenviar factura
2. Complemento de pago`;

          break;

        case "2":
          nextStep = "RECIBOS";

          submenu =
`Recibos de pago

1. Pago de renta`;

          break;

        case "3":
          nextStep = "MANTENIMIENTO";

          submenu =
`Mantenimiento

1. Filtraciones
2. Estructural
3. Otros`;

          break;

        case "4":
          nextStep = "CONTRATOS";

          submenu =
`Contratos

1. Renovación
2. Terminación
3. Incremento por aniversario`;

          break;

        case "5":
          nextStep = "DOCUMENTACION";

          submenu =
`Documentación

1. Uso de suelo
2. Control de estacionamiento`;

          break;

        case "6":
          await createTicket(
            phone,
            state.customer_name,
            state.customer_number,
            "Asesor",
            "Hablar con asesor"
          );

          await sendWhatsappMessage(
            phone,
            "Tu solicitud ha sido registrada. Un asesor te contactará."
          );

          return NextResponse.json({
            success: true,
          });

        default:
          await sendWhatsappMessage(
            phone,
            "Por favor selecciona una opción válida."
          );

          return NextResponse.json({
            success: true,
          });
      }

      await supabase
        .from("conversation_state")
        .update({
          step: nextStep,
        })
        .eq("phone", phone);

      await sendWhatsappMessage(phone, submenu);

      return NextResponse.json({
        success: true,
      });
    }

    // =============================
    // FACTURACION
    // =============================
    if (state.step === "FACTURACION") {
      const subcategory =
        text === "1"
          ? "Reenviar factura"
          : "Complemento de pago";

      await createTicket(
        phone,
        state.customer_name,
        state.customer_number,
        "Facturación",
        subcategory
      );

      await sendWhatsappMessage(
        phone,
        "✅ Solicitud registrada correctamente."
      );
    }

    // =============================
    // RECIBOS
    // =============================
    if (state.step === "RECIBOS") {
      await createTicket(
        phone,
        state.customer_name,
        state.customer_number,
        "Recibos de pago",
        "Pago de renta"
      );

      await sendWhatsappMessage(
        phone,
        "✅ Solicitud registrada correctamente."
      );
    }

    // =============================
    // MANTENIMIENTO
    // =============================
    if (state.step === "MANTENIMIENTO") {
      let subcategory = "Otros";

      if (text === "1") subcategory = "Filtraciones";
      if (text === "2") subcategory = "Estructural";

      await createTicket(
        phone,
        state.customer_name,
        state.customer_number,
        "Mantenimiento",
        subcategory
      );

      await sendWhatsappMessage(
        phone,
        "✅ Ticket de mantenimiento registrado."
      );
    }

    // =============================
    // CONTRATOS
    // =============================
    if (state.step === "CONTRATOS") {
      const options: Record<string, string> = {
        "1": "Renovación",
        "2": "Terminación",
        "3": "Incremento por aniversario",
      };

      await createTicket(
        phone,
        state.customer_name,
        state.customer_number,
        "Contratos",
        options[text] || "Otro"
      );

      await sendWhatsappMessage(
        phone,
        "✅ Solicitud de contrato registrada."
      );
    }

    // =============================
    // DOCUMENTACION
    // =============================
    if (state.step === "DOCUMENTACION") {
      const options: Record<string, string> = {
        "1": "Uso de suelo",
        "2": "Control de estacionamiento",
      };

      await createTicket(
        phone,
        state.customer_name,
        state.customer_number,
        "Documentación",
        options[text] || "Otro"
      );

      await sendWhatsappMessage(
        phone,
        "✅ Solicitud registrada correctamente."
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}
