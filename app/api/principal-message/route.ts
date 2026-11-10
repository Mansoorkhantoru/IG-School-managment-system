// src/app/api/principal-message/route.ts
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import mongoose from 'mongoose';

// Schema for Principal Message
const PrincipalMessageSchema = new mongoose.Schema({
  message: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now },
});

const PrincipalMessage = mongoose.models.PrincipalMessage || mongoose.model('PrincipalMessage', PrincipalMessageSchema);

export async function GET() {
  try {
    await connectDB();
    const latestMessage = await PrincipalMessage.findOne().sort({ updatedAt: -1 });
    return NextResponse.json({ success: true, data: latestMessage });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const { message } = await req.json();

    await PrincipalMessage.deleteMany({});
    const newMessage = await PrincipalMessage.create({ message });

    return NextResponse.json({ success: true, data: newMessage });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}