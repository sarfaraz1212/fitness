import mongoose, { Schema, Document, Types } from "mongoose";

export interface IDiet extends Document {
  addedBy: Types.ObjectId; // reference to User
  name: string;
  description?: string;
  meals: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}


const DietSchema: Schema = new Schema(
  {
    addedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    description: { type: String },
    meals: [{ type: Schema.Types.ObjectId, ref: "Meal" }],
  },
  { timestamps: true } 
);

const Diet = mongoose.model<IDiet>("Diet", DietSchema);

export default Diet;
