import { NextResponse } from "next/server";
import { dbConnect } from "../../db";
import Product from "../products/model";

export async function GET(req, { params }) {
  await dbConnect();
  const { id } = params;
  const product = await Product.findById(id);
  if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });
  return NextResponse.json(product);
}

export async function PUT(req, { params }) {
  await dbConnect();
  const { id } = params;
  const body = await req.json();
  const product = await Product.findByIdAndUpdate(id, body, { new: true });
  if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });
  return NextResponse.json(product);
}

export async function DELETE(req, { params }) {
  await dbConnect();
  const { id } = params;
  const product = await Product.findByIdAndDelete(id);
  if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });
  return NextResponse.json({ message: "Product deleted" });
}
