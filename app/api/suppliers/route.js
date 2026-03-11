import { NextResponse } from "next/server";
import { dbConnect } from "../db";
import Supplier from "./model";

export async function GET() {
  await dbConnect();
  const suppliers = await Supplier.find();
  return NextResponse.json(suppliers);
}

export async function POST(req) {
  await dbConnect();
  const body = await req.json();
  const supplier = await Supplier.create(body);
  return NextResponse.json(supplier, { status: 201 });
}
