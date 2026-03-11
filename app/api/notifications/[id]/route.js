import { NextResponse } from "next/server";
import { dbConnect } from "../../db";
import Notification from "../notifications/model";

export async function GET(req, { params }) {
  await dbConnect();
  const { id } = params;
  const notification = await Notification.findById(id);
  if (!notification) return NextResponse.json({ error: "Notification not found" }, { status: 404 });
  return NextResponse.json(notification);
}

export async function PUT(req, { params }) {
  await dbConnect();
  const { id } = params;
  const body = await req.json();
  const notification = await Notification.findByIdAndUpdate(id, body, { new: true });
  if (!notification) return NextResponse.json({ error: "Notification not found" }, { status: 404 });
  return NextResponse.json(notification);
}

export async function DELETE(req, { params }) {
  await dbConnect();
  const { id } = params;
  const notification = await Notification.findByIdAndDelete(id);
  if (!notification) return NextResponse.json({ error: "Notification not found" }, { status: 404 });
  return NextResponse.json({ message: "Notification deleted" });
}
