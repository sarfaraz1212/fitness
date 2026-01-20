import { Schema, model, Types } from 'mongoose';

export interface IDailyDietPlan {
  user_id: Types.ObjectId;
  date: Date;
  meals: {
    meal_id: Types.ObjectId;
    is_swapped: boolean;
    is_complete: boolean;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const DailyDietPlanSchema = new Schema<IDailyDietPlan>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    date: {
      type: Date,
      required: true,
      index: true,
    },

    meals: [{
      meal_id: {
        type: Schema.Types.ObjectId,
        ref: 'Meal',
        required: true,
      },
      is_swapped: {
        type: Boolean,
        default: false,
      },
      is_complete: {
        type: Boolean,
        default: false,
      },
    }],
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);

DailyDietPlanSchema.index({ user_id: 1, date: 1 }, { unique: true });

export const DailyDietPlan = model<IDailyDietPlan>(
  'DailyDietPlan',
  DailyDietPlanSchema
);
