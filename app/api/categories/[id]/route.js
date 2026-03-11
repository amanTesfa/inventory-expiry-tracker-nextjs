import { NextResponse } from "next/server";
import { dbConnect } from "../../db";
import Category from "../categories/model";

export async function GET(req, { params }) {
  await dbConnect();
  const { id } = params;
  const category = await Category.findById(id);
  if (!category) return NextResponse.json({ error: "Category not found" }, { status: 404 });
  return NextResponse.json(category);
}

export async function PUT(req, { params }) {
  await dbConnect();
  const { id } = params;
  const body = await req.json();
  const category = await Category.findByIdAndUpdate(id, body, { new: true });
  if (!category) return NextResponse.json({ error: "Category not found" }, { status: 404 });
  return NextResponse.json(category);
}

export async function DELETE(req, { params }) {
  await dbConnect();
  const { id } = params;
  const category = await Category.findByIdAndDelete(id);
  if (!category) return NextResponse.json({ error: "Category not found" }, { status: 404 });
  return NextResponse.json({ message: "Category deleted" });
}
