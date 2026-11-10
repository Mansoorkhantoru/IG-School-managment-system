// src/app/api/student/profile/route.ts
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import mongoose from 'mongoose';

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Student ID missing' }, { status: 400 });
    }

    const db = mongoose.connection.db!;
    const student = await db.collection('students').findOne({
      _id: new mongoose.Types.ObjectId(id)
    });

    if (!student) {
      return NextResponse.json({ success: false, error: 'Student not found' }, { status: 404 });
    }

    const attendanceDocs = await db.collection('attendances').find({}).toArray();
    const attendanceHistory: any[] = [];

    attendanceDocs.forEach((att: any) => {
      const record = att.records?.find(
        (r: any) => (r.studentId?._id?.toString() || r.studentId?.toString()) === id
      );
      if (record) {
        attendanceHistory.push({
          date: att.date,
          status: record.status
        });
      }
    });

    return NextResponse.json({
      success: true,
      data: {
        student: {
          id: student._id,
          name: student.name,
          rollNumber: student.rollNumber,
          grade: student.grade,
          email: student.email,
          results: student.results || [
            { subject: 'Mathematics', marksObtained: 85, totalMarks: 100, grade: 'A' },
            { subject: 'English', marksObtained: 78, totalMarks: 100, grade: 'A' },
            { subject: 'Science', marksObtained: 90, totalMarks: 100, grade: 'A+' },
          ]
        },
        attendanceHistory
      }
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}