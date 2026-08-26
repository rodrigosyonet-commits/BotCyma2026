import { NextRequest, NextResponse } from "next/server";

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
      mode,
      token,
    },
    {
      status: 403,
    }
  );
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log(
      "=============================="
    );

    console.log(
      "MENSAJE RECIBIDO DE WHATSAPP"
    );

    console.log(
      JSON.stringify(body, null, 2)
    );

    console.log(
      "=============================="
    );

    return NextResponse.json({
      received: true,
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
