// src/models/Grade.ts
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IGrade extends Document {
  studentId: mongoose.Types.ObjectId;
  subjectId: mongoose.Types.ObjectId;
  examName: string;    // e.g., "Midterm Exam"
  marksObtained: number;
  totalMarks: number;
}

const GradeSchema: Schema<IGrade> = new Schema({
  studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  subjectId: { type: Schema.Types.ObjectId, ref: 'Subject', required: true },
  examName: { type: String, required: true },
  marksObtained: { type: Number, required: true },
  totalMarks: { type: Number, required: true },
});

const Grade: Model<IGrade> = mongoose.models.Grade || mongoose.model<IGrade>('Grade', GradeSchema);
export default Grade;