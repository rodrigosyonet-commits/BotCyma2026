import { NextRequest, NextResponse } from "next/server";

const VERIFY_TOKEN =
  process.env.WHATSAPP_VERIFY_TOKEN || "";

const WHATSAPP_TOKEN =
  process.env.WHATSAPP_TOKEN || "";

const PHONE_NUMBER_ID =
  process.env.WHATSAPP_PHONE_NUMBER_ID || "";

/**
 * Estado temporal
 * Después lo moveremos a Neon
 */
const sessions = new Map();

/**
 * Enviar mensaje WhatsApp
 */
async function sendMessage(
  phone: string,
  text: string
) {
  try {
    await fetch(
      `https://graph.facebook.com/v26.0/${PHONE_NUMBER_ID}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${WHATSAPP_TOKEN}`,
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          messaging_product:
            "whatsapp",
          to: phone,
          type: "text",
          text: {
            body: text,
          },
        }),
      }
    );
  } catch (error) {
    console.error(
      "Error enviando mensaje:",
      error
    );
  }
}

/**
 * MENÚ PRINCIPAL
 */
const MAIN_MENU = `🏢 CYMA Arrendamiento

Seleccione una opción:

1️⃣ Facturación

2️⃣ Recibos de pago

3️⃣ Mantenimiento y reparaciones

4️⃣ Contratos

5️⃣ Documentación

6️⃣ Hablar con un asesor`;

//
// VERIFICACIÓN META
//
export async function GET(
  req: NextRequest
) {
  const mode =
    req.nextUrl.searchParams.get(
      "hub.mode"
    );

  const token =
    req.nextUrl.searchParams.get(
      "hub.verify_token"
    );

  const challenge =
    req.nextUrl.searchParams.get(
      "hub.challenge"
    );

  if (
    mode === "subscribe" &&
    token === VERIFY_TOKEN
  ) {
    return new Response(
      challenge || "",
      {
        status: 200,
      }
    );
  }

  return new Response(
    "Verification failed",
    {
      status: 403,
    }
  );
}

//
// MENSAJES ENTRANTES
//
export async function POST(
  req: NextRequest
) {
  try {
    const body =
      await req.json();

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
        success: true,
      });
    }

    for (const entry of body.entry || []) {
      for (const change of entry.changes ||
        []) {
        const value =
          change.value;

        const contactName =
          value.contacts?.[0]
            ?.profile?.name ||
          "Cliente";

        const messages =
          value.messages || [];

        for (const msg of messages) {
          const phone =
            msg.from;

          const text =
            msg.text?.body?.trim() ??
            "";

          console.log({
            customer:
              contactName,
            phone,
            text,
          });

          //
          // SESIÓN
          //
          let session =
            sessions.get(phone);

          /**
           * CLIENTE NUEVO
           */
          if (!session) {
            sessions.set(phone, {
              state:
                "MAIN_MENU",
            });

            await sendMessage(
              phone,
              `Hola ${contactName} 👋

Bienvenido a CYMA Arrendamiento.

${MAIN_MENU}`
            );

            continue;
          }

          //
          // MENÚ PRINCIPAL
          //
          if (
            session.state ===
            "MAIN_MENU"
          ) {
            switch (text) {
              case "1":
                session.state =
                  "FACTURACION";

                await sendMessage(
                  phone,
                  `Facturación

1. Reenviar factura

2. Complemento de pago`
                );

                break;

              case "2":
                session.state =
                  "RECIBOS";

                await sendMessage(
                  phone,
                  `Recibos de pago

1. Pago de renta`
                );

                break;

              case "3":
                session.state =
                  "MANTENIMIENTO";

                await sendMessage(
                  phone,
                  `Mantenimiento

1. Filtraciones

2. Estructural

3. Otros`
                );

                break;

              case "4":
                session.state =
                  "CONTRATOS";

                await sendMessage(
                  phone,
                  `Contratos

1. Renovación

2. Terminación

3. Incremento por aniversario`
                );

                break;

              case "5":
                session.state =
                  "DOCUMENTACION";

                await sendMessage(
                  phone,
                  `Documentación

1. Uso de suelo

2. Control de estacionamiento`
                );

                break;

              case "6":
                await sendMessage(
                  phone,
                  `✅ Tu solicitud fue registrada.

Un asesor te contactará en breve.`
                );

                break;

              default:
                await sendMessage(
                  phone,
                  MAIN_MENU
                );
            }
          }

          //
          // FACTURACIÓN
          //
          else if (
            session.state ===
            "FACTURACION"
          ) {
            await sendMessage(
              phone,
              `✅ Solicitud registrada.

Facturación:
${
  text === "1"
    ? "Reenviar factura"
    : "Complemento de pago"
}`
            );

            session.state =
              "MAIN_MENU";
          }

          //
          // RECIBOS
          //
          else if (
            session.state ===
            "RECIBOS"
          ) {
            await sendMessage(
              phone,
              `✅ Recibo recibido correctamente.`
            );

            session.state =
              "MAIN_MENU";
          }

          //
          // MANTENIMIENTO
          //
          else if (
            session.state ===
            "MANTENIMIENTO"
          ) {
            let categoria =
              "Otros";

            if (text === "1")
              categoria =
                "Filtraciones";

            if (text === "2")
              categoria =
                "Estructural";

            await sendMessage(
              phone,
              `✅ Ticket creado

Categoría:
${categoria}`
            );

            session.state =
              "MAIN_MENU";
          }

          //
          // CONTRATOS
          //
          else if (
            session.state ===
            "CONTRATOS"
          ) {
            await sendMessage(
              phone,
              `✅ Solicitud de contrato registrada.`
            );

            session.state =
              "MAIN_MENU";
          }

          //
          // DOCUMENTACIÓN
          //
          else if (
            session.state ===
            "DOCUMENTACION"
          ) {
            await sendMessage(
              phone,
              `✅ Solicitud de documentación registrada.`
            );

            session.state =
              "MAIN_MENU";
          }

          sessions.set(
            phone,
            session
          );
        }
      }
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
