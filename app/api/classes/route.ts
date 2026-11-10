import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Class from '@/models/Class';

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const newClass = await Class.create(body);
    return NextResponse.json({ success: true, data: newClass }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const teacherId = searchParams.get('teacherId');

    const query = teacherId ? { teacher: teacherId } : {};
    const classes = await Class.find(query).populate('teacher', 'name email');
    
    return NextResponse.json({ success: true, data: classes }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}