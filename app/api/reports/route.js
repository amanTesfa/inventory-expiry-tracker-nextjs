import { NextResponse } from "next/server";
import { dbConnect } from "../db";
import Report from "./model";

export async function GET() {
  await dbConnect();
  const reports = await Report.find();
  return NextResponse.json(reports);
}

export async function POST(req) {
  await dbConnect();
  const body = await req.json();
  const report = await Report.create(body);
  return NextResponse.json(report, { status: 201 });
}
