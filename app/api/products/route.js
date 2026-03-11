import { NextResponse } from "next/server";
import { dbConnect } from "../db";
import Product from "./model";

export async function GET() {
  await dbConnect();
  const products = await Product.find();
  return NextResponse.json(products);
}

export async function POST(req) {
  await dbConnect();
  const body = await req.json();
  const product = await Product.create(body);
  return NextResponse.json(product, { status: 201 });
}
