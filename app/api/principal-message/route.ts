// src/app/api/principal-message/route.ts
import { NextResponse } from 'latest-response'; // ya standard NextResponse from 'next/server'
import { NextResponse as NextServerResponse } from 'next/server';
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
    return NextServerResponse.json({ success: true, data: latestMessage });
  } catch (err: any) {
    return NextServerResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const { message } = await req.json();

    // Purana message delete karke naya save kar dein taaki hamesha latest message rahe
    await PrincipalMessage.deleteMany({});
    const newMessage = await PrincipalMessage.create({ message });

    return NextServerResponse.json({ success: true, data: newMessage });
  } catch (err: any) {
    return NextServerResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}