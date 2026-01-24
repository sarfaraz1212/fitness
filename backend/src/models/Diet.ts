import mongoose, { Schema, Document, Types } from "mongoose";

export interface IDietDay {
  dayId: string;        // monday, tuesday
  dayLabel: string;     // Monday, Tuesday
  meals: Types.ObjectId[];
  isOpen: boolean;
}

export interface IDiet extends Document {
  name: string;
  description?: string;
  days: IDietDay[];
  assignedBy: Types.ObjectId;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const DaySchema = new Schema<IDietDay>(
  {
    dayId: {
      type: String,
      required: true,
    },
    dayLabel: {
      type: String,
      required: true,
    },
    meals: [
      {
        type: Schema.Types.ObjectId,
        ref: "Meal",
        required: true,
      },
    ],
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

const DietSchema = new Schema<IDiet>(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    days: {
      type: [DaySchema],
      required: true,
    },

    assignedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
);

const Diet = mongoose.model<IDiet>("Diet", DietSchema);

export default Diet;
