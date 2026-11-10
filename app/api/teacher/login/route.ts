// src/app/api/teacher/login/route.ts
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Teacher from '@/models/Teacher';

export async function POST(request: Request) {
  try {
    await connectDB();
    const { email, password } = await request.json();

    const teacher = await Teacher.findOne({ email });
    if (!teacher || teacher.password !== password) {
      return NextResponse.json({ success: false, error: 'Invalid email or password' }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      teacher: { id: teacher._id, name: teacher.name, email: teacher.email }
    }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}