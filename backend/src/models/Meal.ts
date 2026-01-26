import { Schema, model, Types } from 'mongoose';

export interface INutrient {
  name: string;
  amount: string;
}

export interface IMeal {
  _id: Types.ObjectId;
  name: string;
  description?: string;
  time: string;        // "08:00"
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  vitamins: INutrient[];
  minerals: INutrient[];
}

const NutrientSchema = new Schema<INutrient>(
  {
    name: { type: String, required: true },
    amount: { type: String, required: true }, // e.g., "14.8 mg"
  },
  { _id: false } // optional: prevent creating separate _id for each nutrient
);

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

    vitamins: {
      type: [NutrientSchema],
      default: [],
    },

    minerals: {
      type: [NutrientSchema],
      default: [],
    },

  },
  {
    timestamps: true,
  }
);

export const Meal = model<IMeal>('Meal', MealSchema);
