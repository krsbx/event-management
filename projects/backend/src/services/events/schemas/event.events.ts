import { Schema } from 'mongoose';
import { IEvent } from '../interfaces/event.events';
import { EventStatus } from '../../../utils/constants/services.constants';

export const eventSchema = new Schema<IEvent>(
  {
    eventName: { type: String, required: true },
    location: { type: String, required: true },
    proposedDates: { type: [Date], required: true, minlength: 1, maxlength: 3 },
    status: {
      type: String,
      enum: EventStatus,
      required: true,
      default: EventStatus.PENDING,
    },
    companyName: { type: String, required: true },
    proposedBy: { type: Schema.ObjectId, ref: 'User', required: true },
    proposedTo: { type: Schema.ObjectId, ref: 'User', required: true },
    remarks: { type: String, required: false, default: null },
    eventDate: { type: Date, required: false, default: null },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);
