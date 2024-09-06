import { UserRoles } from '../utils/constants.users';

export interface User {
  userId: string;
  username: string;
  password: string;
  role: UserRoles;
  createdAt: Date;
  updatedAt: Date;
}
