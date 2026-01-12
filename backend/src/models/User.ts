import mongoose, { Schema, Types, Document } from 'mongoose';
import bcrypt from 'bcrypt';

import { IOnboarding } from './Onboarding';

export interface IUser {
  name: string;
  email: string;
  password?: string | null;
  role: "CLIENT" | "TRAINER" | "ADMIN";
  is_verified: boolean;
  is_onboarded: boolean;
  assigned_trainer?: Types.ObjectId | null;
  createdAt: Date;
  updatedAt: Date;
  onboarding?: IOnboarding;

  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface IUserDocument extends IUser, Document { }

const UserSchema = new Schema<IUserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, default: null },
    role: {
      type: String,
      enum: ["CLIENT", "TRAINER", "ADMIN"],
      default: "CLIENT",
    },
    is_verified: { type: Boolean, default: false },
    is_onboarded: { type: Boolean, default: false },
    assigned_trainer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

UserSchema.virtual('onboarding', {
  ref: 'Onboarding',
  localField: '_id',
  foreignField: 'user_id',
  justOne: true
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  if (!this.password || !candidatePassword) return false;
  return bcrypt.compare(candidatePassword, this.password);
};


UserSchema.pre('save', async function (this: IUserDocument) {

  if (!this.isModified('password')) return;

  if (!this.password) {
    console.log("No password provided, leaving as null");
    this.password = null;
    return;
  }

  try {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  } catch (err) {
    throw err;
  }
});


export default mongoose.model<IUserDocument>("User", UserSchema);
