import { EventStatus, UserRoles } from "../utils/constants/services.constants";

export interface IAvailableEvent {
  _id: string;
  eventName: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface IUser {
  _id: string;
  username: string;
  companyName: string;
  role: UserRoles;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface IEvent {
  _id: string;
  eventName: IAvailableEvent;
  location: string;
  proposedDates: Date[];
  status: EventStatus;
  remarks: string | null;
  companyName: string;
  proposedBy: IUser;
  proposedTo: IUser;
  eventDate: Date;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface RestListResponse<T> {
  data: T[];
  page: {
    size: number;
    current: number;
    total: number;
  };
}
