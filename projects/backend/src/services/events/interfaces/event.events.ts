import { Types } from 'mongoose';
import { EventStatus } from '../../../utils/constants/services.constants';

export interface IEvent {
  eventName: string;
  location: string;
  proposedDates: Date[];
  status: EventStatus;
  remarks: string | null;
  proposedBy: Types.ObjectId;
  proposedTo: Types.ObjectId;
  eventDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
