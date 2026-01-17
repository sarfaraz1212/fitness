import mongoose, { Schema, Document, Types } from "mongoose";

// Meal subdocument interface
interface Meal {
  _id: Types.ObjectId; 
  name: string;
  description?: string;
  time: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export interface IMeal {
  _id: Types.ObjectId;     
  name: string;
  description?: string;
  time: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}


export interface IDiet extends Document {
  addedBy: Types.ObjectId; // reference to User
  name: string;
  description?: string;
  meals: Meal[];
  createdAt: Date;
  updatedAt: Date;
}


const MealSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    time: { type: String, required: true },
    calories: { type: Number, required: true, default: 0 },
    protein: { type: Number, required: true, default: 0 },
    carbs: { type: Number, required: true, default: 0 },
    fats: { type: Number, required: true, default: 0 },
  },
  { _id: true } 
);


const DietSchema: Schema = new Schema(
  {
    addedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    description: { type: String },
    meals: { type: [MealSchema], default: [] },
  },
  { timestamps: true } 
);

const Diet = mongoose.model<IDiet>("Diet", DietSchema);

export default Diet;
