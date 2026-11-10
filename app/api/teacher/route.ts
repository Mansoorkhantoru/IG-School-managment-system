// src/app/api/teachers/route.ts
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Teacher from '@/models/Teacher';

export async function GET() {
  try {
    await connectDB();
    const teachers = await Teacher.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: teachers }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();

    // Validation including password
    if (!body.name || !body.email || !body.password || !body.subjectSpecialization || !body.phone) {
      return NextResponse.json(
        { success: false, error: 'Please provide all required fields including password' },
        { status: 400 }
      );
    }

    const newTeacher = await Teacher.create(body);
    return NextResponse.json({ success: true, data: newTeacher }, { status: 201 });
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json({ success: false, error: 'Email already exists.' }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}