// src/models/Subject.ts
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISubject extends Document {
  name: string;         // e.g., "Mathematics"
  code: string;         // e.g., "MATH101"
  teacherId: mongoose.Types.ObjectId; // Ref to Teacher
}

const SubjectSchema: Schema<ISubject> = new Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  teacherId: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
});

const Subject: Model<ISubject> = mongoose.models.Subject || mongoose.model<ISubject>('Subject', SubjectSchema);
export default Subject;