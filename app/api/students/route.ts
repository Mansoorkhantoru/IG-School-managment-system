// src/app/api/students/route.ts
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Student from '@/models/Student';

// GET: Fetch all students
export async function GET() {
  try {
    await connectDB();
    const students = await Student.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: students }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch students' },
      { status: 500 }
    );
  }
}

// POST: Create a new student
export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();

    // Basic validation
    if (!body.name || !body.email || !body.rollNumber || !body.grade) {
      return NextResponse.json(
        { success: false, error: 'Please provide all required fields' },
        { status: 400 }
      );
    }

    const newStudent = await Student.create(body);
    return NextResponse.json({ success: true, data: newStudent }, { status: 201 });
  } catch (error: any) {
    // Handle duplicate key errors (e.g., unique email or roll number)
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'Email or Roll Number already exists.' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create student' },
      { status: 400 }
    );
  }
}