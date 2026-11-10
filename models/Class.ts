import mongoose, { Schema, Document } from 'mongoose';

export interface IClass extends Document {
  className: string;
  section: string;
  teacher: mongoose.Types.ObjectId;
  subject: string;
}

const ClassSchema: Schema = new Schema({
  className: { type: String, required: true },
  section: { type: String, required: true },
  teacher: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
  subject: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Class || mongoose.model<IClass>('Class', ClassSchema);