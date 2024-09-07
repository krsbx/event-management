import { Schema } from 'mongoose';
import { IUser } from '../interfaces/user.users';
import { UserRoles } from '../../../utils/constants/services.constants';

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

// Make sure a username are unique between each user
userSchema.index(
  {
    username: 1,
  },
  {
    unique: true,
  }
);

export { userSchema };
