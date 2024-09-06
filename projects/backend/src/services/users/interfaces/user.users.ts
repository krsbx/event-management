import { UserRoles } from '../utils/constants.users';

export interface IUser {
  username: string;
  password: string;
  companyName: string;
  role: UserRoles;
  createdAt: Date;
  updatedAt: Date;
}
