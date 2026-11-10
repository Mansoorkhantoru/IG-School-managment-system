// src/models/Teacher.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface ITeacher extends Document {
  name: string;
  email: string;
  password: string;
  subjectSpecialization: string;
  phone: string;
}

const TeacherSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  subjectSpecialization: { type: String, required: true },
  phone: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Teacher || mongoose.model<ITeacher>('Teacher', TeacherSchema);