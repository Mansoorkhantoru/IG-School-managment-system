import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Class from '@/models/Class';

export async function GET(request: Request) {
  try {
    await connectDB();
    // URL se teacher ID le sakte hain ya mock teacher pass kar sakte hain
    const { searchParams } = new URL(request.url);
    const teacherId = searchParams.get('teacherId');

    const classes = await Class.find({ teacher: teacherId }).populate('teacher');
    return NextResponse.json({ success: true, data: classes }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

