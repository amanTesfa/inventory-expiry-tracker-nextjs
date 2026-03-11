import { NextResponse } from "next/server";
import { dbConnect } from "../db";
import Notification from "./model";

export async function GET() {
  await dbConnect();
  const notifications = await Notification.find();
  return NextResponse.json(notifications);
}

export async function POST(req) {
  await dbConnect();
  const body = await req.json();
  const notification = await Notification.create(body);
  return NextResponse.json(notification, { status: 201 });
}
