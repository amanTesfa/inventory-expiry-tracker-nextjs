import { NextResponse } from "next/server";
import { dbConnect } from "../db";
import Batch from "./model";

export async function GET() {
  await dbConnect();
  const batches = await Batch.find();
  return NextResponse.json(batches);
}

export async function POST(req) {
  await dbConnect();
  const body = await req.json();
  const batch = await Batch.create(body);
  return NextResponse.json(batch, { status: 201 });
}
