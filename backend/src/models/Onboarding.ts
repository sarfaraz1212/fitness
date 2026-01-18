import mongoose, { Document, Schema } from 'mongoose';


export interface IOnboarding extends Document {
  user_id: mongoose.Types.ObjectId;
  token: string;
  expires_at: Date;
  status: 'pending' | 'completed' | 'expired';
  dob: Date;
  age: number;
  gender: 'male' | 'female' | 'other';
  blood_group: string;
  weight: number;
  height: number;
  target_weight?: number;
  body_fat?: number;
  bmi?: number;
  fitness_level: 'beginner' | 'intermediate' | 'advanced';
  exercise_frequency: number;
  sleep_hours: number;
  smoking_frequency: 'never' | 'occasionally' | 'weekly' | 'daily';
  alcohol_frequency: 'never' | 'occasionally' | 'weekly' | 'daily';
  stress_level: 'low' | 'medium' | 'high';
  training_time: 'morning' | 'evening' | 'flexible';
  work_environment: 'desk' | 'active';
  medical_conditions: string;
  notes: string;
  diet_preferences: any;
  fitness_goals: any;
  address?: string;
  phone_number?: string;
  profile_image: string;
  createdAt: Date;
  updatedAt: Date;
}

const OnboardingSchema: Schema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    token: { type: String, required: true, unique: true },
    expires_at: { type: Date, required: true },
    status: {
      type: String,
      enum: ['pending', 'completed', 'expired'],
      default: 'pending',
    },
    dob: { type: Date },
    age: { type: Number },
    gender: { type: String, enum: ['male', 'female', 'other'] },
    blood_group: { type: String },
    weight: { type: Number },
    height: { type: Number },
    target_weight: { type: Number },
    body_fat: { type: Number },
    bmi: { type: Number },
    fitness_level: { type: String, enum: ['beginner', 'intermediate', 'advanced'] },
    exercise_frequency: { type: Number },
    sleep_hours: { type: Number },
    smoking_frequency: { type: String, enum: ['never', 'occasionally', 'weekly', 'daily'] },
    alcohol_frequency: { type: String, enum: ['never', 'occasionally', 'weekly', 'daily'] },
    stress_level: { type: String, enum: ['low', 'medium', 'high'] },
    training_time: { type: String, enum: ['morning', 'evening', 'flexible'] },
    work_environment: { type: String, enum: ['desk', 'active'] },
    medical_conditions: { type: String },
    notes: { type: String },
    diet_preferences: { type: Schema.Types.Mixed },
    fitness_goals: { type: Schema.Types.Mixed },
    address: { type: String },
    phone_number: { type: String },
    profile_image: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IOnboarding>('Onboarding', OnboardingSchema);