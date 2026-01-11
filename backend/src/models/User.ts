import mongoose, { Schema,Types  } from 'mongoose';
import bcrypt from 'bcrypt';

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

  comparePassword(candidatePassword: string): Promise<boolean>;
}
const UserSchema = new Schema<IUser>(
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
  { timestamps: true }
);

UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>('User', UserSchema);