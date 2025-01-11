import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { parse } from "date-fns";
import { NextResponse } from "next/server";
import Stripe from "stripe";
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: Request) {
  try {
    const {
      scheduleId,
      userId,
      origin,
      destination,
      departure_date,
      phoneNumber,
      email,
      passenger_name,
      nationality,
      gender,
      seatNumber,
    } = await req.json();
    if (!scheduleId) {
      return new NextResponse("Schedule ID is required", { status: 400 });
    }
    if (!userId) {
      return new NextResponse("User ID is required", { status: 400 });
    }
    if (!origin) {
      return new NextResponse("Origin is required", { status: 400 });
    }
    if (!destination) {
      return new NextResponse("Destination is required", { status: 400 });
    }
    if (!departure_date) {
      return new NextResponse("Departure Date is required", { status: 400 });
    }

    const schedule = await prisma.schedule.findUnique({
      where: { id: scheduleId },
      include: { route: true },
    });

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        scheduleId: scheduleId,
        userId,
        phoneNumber,
        email,
        passenger_name,
        nationality,
        gender,
        seatNumber,
        totalPrice: Number(schedule?.price) * seatNumber.length,
        status: "Pending",
        isPaid: false,
      },
      include: { schedule: true },
    });
    const newAvailableSeat = Math.max(
      0,
      booking.schedule.available_seat - booking.seatNumber.length
    );
    await prisma.schedule.update({
      where: { id: booking.schedule.id },
      data: {
        departure_date: parse(departure_date, "dd-MM-yyyy", new Date()),
        available_seat: newAvailableSeat,
      },
    });
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    line_items.push({
      quantity: booking.seatNumber.length,
      price_data: {
        currency: "USD",
        product_data: {
          name: schedule?.route.origin + "-" + schedule?.route.destination,
        },
        unit_amount: Math.round(Number(schedule?.price) * 100),
      },
    });

    // Create Stripe session
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/ticket/${booking.id}?success=1`,
      cancel_url: `${process.env.FRONTEND_URL}/transport/${origin}/${destination}/${departure_date}/${scheduleId}`,
      metadata: { bookingId: booking.id, departureDate: departure_date },
    });
    setTimeout(async () => {
      const currentBooking = await prisma.booking.findUnique({
        where: { id: booking.id },
        include: { schedule: true },
      });

      if (currentBooking && !currentBooking.isPaid) {
        await prisma.schedule.update({
          where: { id: booking.schedule.id },
          data: {
            available_seat: Math.max(
              0,
              currentBooking.schedule.available_seat + booking.seatNumber.length
            ),
          },
        });
        await prisma.booking.delete({ where: { id: booking.id } });
      }
    }, 8 * 60 * 1000);
    return NextResponse.json({ url: session.url }, { headers: corsHeaders });
  } catch (error) {
    console.error("Error in POST request:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
