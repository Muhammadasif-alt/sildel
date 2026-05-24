/**
 * User — registered customer account.
 *
 * Created by /account/register; signed in via /account/login.
 * passwordHash stores a bcrypt hash; the raw password never lands in the DB.
 */
import mongoose, { Schema, Model, InferSchemaType } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    passwordHash: { type: String, required: true },
    name: { type: String, required: true, trim: true, maxlength: 120 },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
      index: true,
    },
    lastLoginAt: { type: Date },
  },
  { timestamps: true },
);

export type User = InferSchemaType<typeof userSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const UserModel: Model<User> =
  (mongoose.models.User as Model<User>) ||
  mongoose.model<User>("User", userSchema);
