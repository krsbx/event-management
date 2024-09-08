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

export interface PageInformation {
  size: number;
  current: number;
  total: number;
}

export interface RestListResponse<T> {
  data: T[];
  page: PageInformation;
}

export interface ResourceStore<
  T extends {
    _id: string;
  },
> extends RestListResponse<T> {
  isFetched: boolean;
  setIsFetched: (status: boolean | ((prev: boolean) => boolean)) => void;
  addData: (resources: T | T[]) => void;
  updateData: (id: string, resource: T | Partial<T>) => void;
  removeData: (id: string | string[]) => void;
  setData: (resources: T[] | ((prev: T[]) => T[])) => void;
  setInformation: (
    info: PageInformation | ((prev: PageInformation) => PageInformation),
  ) => void;
}
