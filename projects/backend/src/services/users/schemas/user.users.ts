import { Schema } from 'mongoose';
import { IUser } from '../interfaces/user.users';
import { UserRoles } from '../utils/constants.users';

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    companyName: { type: String, required: true },
    role: { type: String, enum: UserRoles, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

// Index the collections

// Make sure a username are unique between each companies
userSchema.index(
  {
    username: 1,
    companyName: 1,
  },
  {
    unique: true,
  }
);

export { userSchema };
