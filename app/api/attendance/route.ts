// src/app/api/attendance/route.ts
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Attendance from '@/models/Attendance';
import '@/models/Student'; // Student model register karne ke liye zaroori hai

export async function GET() {
  try {
    await connectDB();
    const attendanceList = await Attendance.find({})
      .populate('records.studentId', 'name rollNumber grade') // Name aur Roll Number fetch karne ke liye
      .sort({ createdAt: -1 });
      
    return NextResponse.json({ success: true, data: attendanceList }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// (POST method waise hi rahega)

// POST: Save or Update Attendance
export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const { classId, teacherId, date, records } = body;

    if (!classId || !teacherId || !date || !records) {
      return NextResponse.json({ success: false, error: 'All fields are required' }, { status: 400 });
    }

    const existing = await Attendance.findOne({ classId, date });
    if (existing) {
      existing.records = records;
      await existing.save();
      return NextResponse.json({ success: true, message: 'Attendance updated successfully', data: existing }, { status: 200 });
    }

    const newAttendance = await Attendance.create({ classId, teacherId, date, records });
    return NextResponse.json({ success: true, message: 'Attendance saved successfully', data: newAttendance }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}