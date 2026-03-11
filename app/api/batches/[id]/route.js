import { NextResponse } from "next/server";
import { dbConnect } from "../../db";
import Batch from "../batches/model";

export async function GET(req, { params }) {
  await dbConnect();
  const { id } = params;
  const batch = await Batch.findById(id);
  if (!batch) return NextResponse.json({ error: "Batch not found" }, { status: 404 });
  return NextResponse.json(batch);
}

export async function PUT(req, { params }) {
  await dbConnect();
  const { id } = params;
  const body = await req.json();
  const batch = await Batch.findByIdAndUpdate(id, body, { new: true });
  if (!batch) return NextResponse.json({ error: "Batch not found" }, { status: 404 });
  return NextResponse.json(batch);
}

export async function DELETE(req, { params }) {
  await dbConnect();
  const { id } = params;
  const batch = await Batch.findByIdAndDelete(id);
  if (!batch) return NextResponse.json({ error: "Batch not found" }, { status: 404 });
  return NextResponse.json({ message: "Batch deleted" });
}
