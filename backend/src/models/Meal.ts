import { Schema, model, Types } from 'mongoose';

export interface IMeal {
  _id: Types.ObjectId;
  name: string;
  description?: string;
  time: string;        // "08:00"
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  addedBy: Types.ObjectId;
}

const MealSchema = new Schema<IMeal>(
  {
    name: {
      type: String,
      required: true,
      trim: true,      
    },

    description: {
      type: String,
      default: null,
    },

    time: {
      type: String,
      required: true,
      match: /^([01]\d|2[0-3]):([0-5]\d)$/,
    },

    calories: {
      type: Number,
      required: true,
      min: 0,
    },

    protein: {
      type: Number,
      required: true,
      min: 0,
    },

    carbs: {
      type: Number,
      required: true,
      min: 0,
    },

    fats: {
      type: Number,
      required: true,
      min: 0,
    },

    addedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    }
  },
  {
    timestamps: true,
  }
);

export const Meal = model<IMeal>('Meal', MealSchema);
