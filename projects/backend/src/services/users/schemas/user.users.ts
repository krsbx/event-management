import { Schema, Types } from 'mongoose';
import { User } from '../interfaces/user.users';
import { UserRoles } from '../utils/constants.users';

export const userSchema = new Schema<User>({
  userId: Types.ObjectId,
  username: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  role: { type: String, enum: UserRoles, required: true },
});
