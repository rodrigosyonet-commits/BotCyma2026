import { NextRequest, NextResponse } from "next/server";

const VERIFY_TOKEN =
  process.env.WHATSAPP_VERIFY_TOKEN || "";

//
// META VERIFICATION
//
export async function GET(req: NextRequest) {
  try {
    const mode =
      req.nextUrl.searchParams.get("hub.mode");

    const token =
      req.nextUrl.searchParams.get(
        "hub.verify_token"
      );

    const challenge =
      req.nextUrl.searchParams.get(
        "hub.challenge"
      );

    console.log("Meta Verification Request");

    console.log({
      mode,
      token,
      challenge
    });

    if (
      mode === "subscribe" &&
      token === VERIFY_TOKEN
    ) {
      console.log("Webhook Verified");

      return new Response(challenge || "", {
        status: 200
      });
    }

    console.log("Verification Failed");

    return new Response(
      "Verification failed",
      {
        status: 403
      }
    );
  } catch (error) {
    console.error(error);

    return new Response(
      "Server Error",
      {
        status: 500
      }
    );
  }
}

//
// WHATSAPP EVENTS
//
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log(
      "===== WHATSAPP EVENT ====="
    );

    console.log(
      JSON.stringify(
        body,
        null,
        2
      )
    );

    if (
      body.object !==
      "whatsapp_business_account"
    ) {
      return NextResponse.json({
        success: true
      });
    }

    for (
      const entry of body.entry || []
    ) {
      for (
        const change of
        entry.changes || []
      ) {
        const value =
          change.value;

        //
        // CONTACT
        //
        const contactName =
          value.contacts?.[0]
            ?.profile?.name ||
          "Cliente";

        const waId =
          value.contacts?.[0]
            ?.wa_id || "";

        //
        // MESSAGES
        //
        const messages =
          value.messages || [];

        for (
          const msg of messages
        ) {
          const messageId =
            msg.id;

          const from =
            msg.from;

          const timestamp =
            msg.timestamp;

          const type =
            msg.type;

          let messageText =
            "";

          if (
            type === "text"
          ) {
            messageText =
              msg.text?.body || "";
          }

          console.log(
            "New Message"
          );

          console.log({
            customer:
              contactName,
            phone:
              from,
            waId,
            messageId,
            timestamp,
            type,
            messageText
          });

          //
          // AQUI DESPUÉS:
          //
          // 1. Buscar cliente
          // 2. Crear conversación
          // 3. Guardar mensaje
          // 4. Generar ticket
          // 5. Responder automático
          //
        }
      }
    }

    return NextResponse.json({
      success: true
    });
  } catch (error) {
    console.error(
      "Webhook Error:",
      error
    );

    return NextResponse.json(
      {
        success: false
      },
      {
        status: 500
      }
    );
  }
}
