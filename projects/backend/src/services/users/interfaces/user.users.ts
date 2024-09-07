import { UserRoles } from '../../../utils/constants/services.constants';

export interface IUser {
  username: string;
  password: string;
  companyName: string;
  role: UserRoles;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AuthedUser {
  _id: string;
  username: string;
  companyName: string;
  role: UserRoles;
  createdAt: string | Date;
  updatedAt: string | Date;
}
