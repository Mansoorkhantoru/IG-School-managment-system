// src/models/Student.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IStudent extends Document {
  name: string;
  email: string;
  rollNumber: string;
  grade: string;
}

const StudentSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  rollNumber: { type: String, required: true },
  grade: { type: String, required: true },
}, { timestamps: true });

// Compound unique index (Same grade ke andar rollNumber unique rahega)
StudentSchema.index({ grade: 1, rollNumber: 1 }, { unique: true });

export default mongoose.models.Student || mongoose.model<IStudent>('Student', StudentSchema);