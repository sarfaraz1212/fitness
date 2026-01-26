import mongoose, { Schema, Document, Types } from "mongoose";

export interface IWorkout extends Document {
    addedBy: Types.ObjectId;
    name: string;
    description?: string;
    exercises: Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

const WorkoutSchema: Schema = new Schema({
    addedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    description: { type: String },
    exercises: [{ type: Schema.Types.ObjectId, ref: "Exercise" }],
}, { timestamps: true });

const Workout = mongoose.model<IWorkout>("Workout", WorkoutSchema);

export default Workout;
