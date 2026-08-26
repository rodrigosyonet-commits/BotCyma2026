import { NextRequest, NextResponse } from "next/server";

// ======================================
// VERIFICACIÓN META
// ======================================
export async function GET(req: NextRequest) {
  const mode = req.nextUrl.searchParams.get("hub.mode");
  const token = req.nextUrl.searchParams.get("hub.verify_token");
  const challenge = req.nextUrl.searchParams.get("hub.challenge");

  if (
    mode === "subscribe" &&
    token === process.env.WHATSAPP_VERIFY_TOKEN
  ) {
    return new Response(challenge ?? "", {
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

// ======================================
// ENVÍO WHATSAPP
// ======================================
async function sendWhatsAppMessage(
  phone: string,
  message: string
) {
  const response = await fetch(
    `https://graph.facebook.com/v26.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: phone,
        type: "text",
        text: {
          preview_url: false,
          body: message,
        },
      }),
    }
  );

  const data = await response.json();

  console.log(
    "RESPUESTA META:",
    JSON.stringify(data, null, 2)
  );

  return data;
}

// ======================================
// RECEPCIÓN MENSAJES
// ======================================
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log(
      "===================================="
    );

    console.log(
      JSON.stringify(body, null, 2)
    );

    console.log(
      "===================================="
    );

    const message =
      body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0];

    if (!message) {
      return NextResponse.json({
        received: true,
      });
    }

    const phone = message.from;

    const text =
      message.text?.body ?? "";

    console.log("PHONE:", phone);
    console.log("TEXT:", text);

    // ========================
    // RESPUESTA AUTOMÁTICA
    // ========================

    let responseText =
      `Hola 👋\n\nRecibí tu mensaje:\n"${text}"\n\nBot CYMA funcionando correctamente ✅`;

    await sendWhatsAppMessage(
      phone,
      responseText
    );

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
