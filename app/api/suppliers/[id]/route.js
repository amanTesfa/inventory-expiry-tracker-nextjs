import { NextResponse } from "next/server";
import { dbConnect } from "../../db";
import Supplier from "../suppliers/model";

export async function GET(req, { params }) {
  await dbConnect();
  const { id } = params;
  const supplier = await Supplier.findById(id);
  if (!supplier) return NextResponse.json({ error: "Supplier not found" }, { status: 404 });
  return NextResponse.json(supplier);
}

export async function PUT(req, { params }) {
  await dbConnect();
  const { id } = params;
  const body = await req.json();
  const supplier = await Supplier.findByIdAndUpdate(id, body, { new: true });
  if (!supplier) return NextResponse.json({ error: "Supplier not found" }, { status: 404 });
  return NextResponse.json(supplier);
}

export async function DELETE(req, { params }) {
  await dbConnect();
  const { id } = params;
  const supplier = await Supplier.findByIdAndDelete(id);
  if (!supplier) return NextResponse.json({ error: "Supplier not found" }, { status: 404 });
  return NextResponse.json({ message: "Supplier deleted" });
}
