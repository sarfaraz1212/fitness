import mongoose, { Schema, Document } from "mongoose";

export interface IExercise extends Document {
  name: string;
  sets: number;
  reps: number;
  weight?: number;
  duration?: string;
  restTime?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ExerciseSchema: Schema<IExercise> = new Schema(
  {
    name: { type: String, required: true },
    sets: { type: Number, required: true, default: 0 },
    reps: { type: Number, required: true, default: 0 },
    weight: { type: Number },
    duration: { type: String },
    restTime: { type: String },
    notes: { type: String },
  },
  { timestamps: true }
);

const Exercise = mongoose.model<IExercise>("Exercise", ExerciseSchema);

export default Exercise;
