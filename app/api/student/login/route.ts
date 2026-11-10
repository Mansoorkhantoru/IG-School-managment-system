// src/app/api/student/login/route.ts
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import mongoose from 'mongoose';

export async function POST(req: Request) {
  try {
    await connectDB();
    const { grade, rollNumber, password } = await req.json();

    if (!grade || !rollNumber || !password) {
      return NextResponse.json(
        { success: false, error: 'Grade, Roll Number, and Password are required' }, 
        { status: 400 }
      );
    }

    const db = mongoose.connection.db!;
    const cleanGrade = grade.trim();
    const cleanRoll = rollNumber.trim();
    const cleanPassword = password.trim();

    const student = await db.collection('students').findOne({
      grade: { $regex: new RegExp(`^${cleanGrade}$`, 'i') },
      rollNumber: { $regex: new RegExp(`^${cleanRoll}$`, 'i') }
    });

    if (!student) {
      return NextResponse.json(
        { success: false, error: 'Student not found in this Grade with provided Roll Number' }, 
        { status: 401 }
      );
    }

    const isPasswordValid = student.password 
      ? student.password === cleanPassword 
      : cleanPassword.toLowerCase() === cleanRoll.toLowerCase();

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, error: 'Invalid Password' }, 
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
      student: { id: student._id, name: student.name, rollNumber: student.rollNumber, grade: student.grade }
    });

    response.cookies.set('studentId', student._id.toString(), {
      httpOnly: false,
      path: '/',
      maxAge: 86400
    });

    return response;
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}