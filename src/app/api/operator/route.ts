import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, contact, address } = body;
    if (!name) return NextResponse.json("Name is required", { status: 400 });
    if (!contact)
      return NextResponse.json("Contact is required", { status: 400 });
    if (!address)
      return NextResponse.json("Address is required", { status: 400 });

    const operator = await prisma.operator.create({
      data: { name, contact, address },
    });
    return NextResponse.json(operator);
  } catch (error) {
    console.log("[OPERATOR_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
