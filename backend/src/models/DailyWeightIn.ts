import { Schema, model, Types } from 'mongoose';

export interface IDailyWeightIn {
  user: Types.ObjectId;
  date: Date;             
  weight: number;
  unit: 'kg' | 'lbs';
  createdAt: Date;
  updatedAt: Date;
}

const DailyWeightInSchema = new Schema<IDailyWeightIn>(
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

    weight: {
      type: Number,
      required: true,
      min: 0,
    },

    unit: {
      type: String,
      enum: ['KG', 'LBS'],
      required: true,
      default: 'KG',
    },

  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);

// Create compound unique index on user_id and date
DailyWeightInSchema.index({ user_id: 1, date: 1 }, { unique: true });

export const DailyWeightIn = model<IDailyWeightIn>(
  'DailyWeightIn',
  DailyWeightInSchema
);
