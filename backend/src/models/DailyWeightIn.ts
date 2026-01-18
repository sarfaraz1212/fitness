import { Schema, model, Types } from 'mongoose';

export interface IDailyWeightIn {
  user: Types.ObjectId;
  date: Date;              // the day of the weight-in
  weight: number;
  unit: 'kg' | 'lbs';
  createdAt: Date;
  deletedAt?: Date | null;
}

const DailyWeightInSchema = new Schema<IDailyWeightIn>(
  {
    user: {
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

    weight: {
      type: Number,
      required: true,
      min: 0,
    },

    unit: {
      type: String,
      enum: ['kg', 'lbs'],
      required: true,
      default: 'kg',
    },

    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: false, // usually not needed for weight-ins
    },
  }
);

/**
 * Ensure only ONE weight-in per user per day
 */
DailyWeightInSchema.index(
  { user: 1, date: 1 },
  { unique: true }
);

export const DailyWeightIn = model<IDailyWeightIn>(
  'DailyWeightIn',
  DailyWeightInSchema
);
