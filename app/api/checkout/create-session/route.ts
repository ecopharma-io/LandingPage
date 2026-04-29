import { NextRequest, NextResponse } from "next/server";
import { dodoClient } from "@/lib/dodo";

export async function POST(request: NextRequest) {
  try {
    const { email, name } = (await request.json()) as {
      email: string;
      name: string;
    };

    if (!email || !name) {
      return NextResponse.json(
        { error: "Email and name are required." },
        { status: 400 }
      );
    }

    const productId = process.env.DODO_PAYMENTS_PRODUCT_ID;
    if (!productId) {
      console.error("[DODO] DODO_PAYMENTS_PRODUCT_ID not configured");
      return NextResponse.json(
        { error: "Payment system is not configured." },
        { status: 500 }
      );
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.ecopharma.io";

    const session = await dodoClient.checkoutSessions.create({
      product_cart: [{ product_id: productId, quantity: 1 }],
      customer: { email, name },
      return_url: `${siteUrl}/thank-you`,
    });

    console.log("[DODO] Checkout session created:", session.checkout_url);

    return NextResponse.json({ checkout_url: session.checkout_url });
  } catch (err) {
    console.error("[DODO] Session creation failed:", err);
    return NextResponse.json(
      { error: "Failed to create payment session." },
      { status: 500 }
    );
  }
}
