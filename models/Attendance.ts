// src/models/Attendance.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IAttendance extends Document {
  classId: mongoose.Types.ObjectId;
  teacherId: mongoose.Types.ObjectId;
  date: string;
  records: {
    studentId: mongoose.Types.ObjectId;
    status: 'Present' | 'Absent';
  }[];
}

const AttendanceSchema: Schema = new Schema({
  classId: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
  teacherId: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
  date: { type: String, required: true }, // e.g., '2026-11-07'
  records: [{
    studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    status: { type: String, enum: ['Present', 'Absent'], required: true }
  }]
}, { timestamps: true });

export default mongoose.models.Attendance || mongoose.model<IAttendance>('Attendance', AttendanceSchema);