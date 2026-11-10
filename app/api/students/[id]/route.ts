// src/app/api/students/[id]/route.ts
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Student from '@/models/Student';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET: Fetch a single student by ID
export async function GET(request: Request, { params }: RouteParams) {
  try {
    await connectDB();
    const { id } = await params;
    
    const student = await Student.findById(id);
    if (!student) {
      return NextResponse.json({ success: false, error: 'Student not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: student }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: 'Invalid ID format' }, { status: 400 });
  }
}

// PUT: Update a student by ID
export async function PUT(request: Request, { params }: RouteParams) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();

    const updatedStudent = await Student.findByIdAndUpdate(id, body, {
      new: true,         // Return the updated document
      runValidators: true // Run Mongoose schema validators on update
    });

    if (!updatedStudent) {
      return NextResponse.json({ success: false, error: 'Student not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedStudent }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || 'Update failed' }, { status: 400 });
  }
}

// DELETE: Delete a student by ID
export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    await connectDB();
    const { id } = await params;

    const deletedStudent = await Student.findByIdAndDelete(id);
    if (!deletedStudent) {
      return NextResponse.json({ success: false, error: 'Student not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: {} }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: 'Deletion failed' }, { status: 400 });
  }
}