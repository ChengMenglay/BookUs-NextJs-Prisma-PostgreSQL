import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    return new NextResponse(`Webhook Error: ${error}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  // const address = session?.customer_details?.address;

  // const addressComponents = [
  //   address?.line1,
  //   address?.line2,
  //   address?.city,
  //   address?.state,
  //   address?.postal_code,
  //   address?.country,
  // ];

  // const addressString = addressComponents.filter((c) => c !== null).join(", ");
  if (event.type === "checkout.session.completed") {
    await prisma.booking.update({
      where: { id: session?.metadata?.bookingId },
      data: { isPaid: true, status: "Completed" },
      include: { schedule: true },
    });
  }
  return new NextResponse(null, { status: 200 });
}
