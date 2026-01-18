import mongoose, { Schema, Document, Types } from "mongoose";

export interface IExercise {
    _id: Types.ObjectId;
    name: string;
    sets: number;
    reps: number;
    weight?: number;
    duration?: string;
    restTime?: string;
    notes?: string;
}

export interface IWorkout extends Document {
    addedBy: Types.ObjectId;
    name: string;
    description?: string;
    exercises: IExercise[];
    createdAt: Date;
    updatedAt: Date;
}

const ExerciseSchema: Schema = new Schema({
    name: { type: String, required: true },
    sets: { type: Number, required: true, default: 0 },
    reps: { type: Number, required: true, default: 0 },
    weight: { type: Number },
    duration: { type: String },
    restTime: { type: String },
    notes: { type: String },
}, { _id: true });

const WorkoutSchema: Schema = new Schema({
    addedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    description: { type: String },
    exercises: { type: [ExerciseSchema], default: [] },
}, { timestamps: true });

const Workout = mongoose.model<IWorkout>("Workout", WorkoutSchema);

export default Workout;
