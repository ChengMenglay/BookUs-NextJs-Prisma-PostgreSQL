import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: Request,
  {
    params,
  }: {
    req: NextRequest;
    params: { operatorId: string };
  }
) {
  try {
    if (!params.operatorId)
      return NextResponse.json("Params id is required", { status: 400 });
    const operator = await prisma.operator.findUnique({
      where: { id: params.operatorId },
    });
    return NextResponse.json(operator);
  } catch (error) {
    console.log("OPERATOR_GET", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    req: NextRequest;
    params: { operatorId: string };
  }
) {
  try {
    const body = await req.json();
    const { name, contact, address } = body;
    if (!params.operatorId)
      return NextResponse.json("Params id is required", { status: 400 });
    if (!name) return NextResponse.json("Name is required", { status: 400 });
    if (!contact)
      return NextResponse.json("Contact is required", { status: 400 });
    if (!address)
      return NextResponse.json("Address is required", { status: 400 });
    const operator = await prisma.operator.update({
      where: { id: params.operatorId },
      data: { name, contact, address },
    });
    return NextResponse.json(operator);
  } catch (error) {
    console.log("OPERATOR_PATCH", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    req: NextRequest;
    params: { operatorId: string };
  }
) {
  try {
    if (!params.operatorId)
      return NextResponse.json("Params id is required", { status: 400 });
    const operator = await prisma.operator.delete({
      where: { id: params.operatorId },
    });
    return NextResponse.json(operator);
  } catch (error) {
    console.log("OPERATOR_DELETE", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
