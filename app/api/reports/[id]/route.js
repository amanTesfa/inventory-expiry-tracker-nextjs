import { NextResponse } from "next/server";
import { dbConnect } from "../../db";
import Report from "../reports/model";

export async function GET(req, { params }) {
  await dbConnect();
  const { id } = params;
  const report = await Report.findById(id);
  if (!report) return NextResponse.json({ error: "Report not found" }, { status: 404 });
  return NextResponse.json(report);
}

export async function PUT(req, { params }) {
  await dbConnect();
  const { id } = params;
  const body = await req.json();
  const report = await Report.findByIdAndUpdate(id, body, { new: true });
  if (!report) return NextResponse.json({ error: "Report not found" }, { status: 404 });
  return NextResponse.json(report);
}

export async function DELETE(req, { params }) {
  await dbConnect();
  const { id } = params;
  const report = await Report.findByIdAndDelete(id);
  if (!report) return NextResponse.json({ error: "Report not found" }, { status: 404 });
  return NextResponse.json({ message: "Report deleted" });
}
