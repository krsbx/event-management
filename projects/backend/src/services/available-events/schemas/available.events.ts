import { Schema } from 'mongoose';
import { IAvailableEvent } from '../interfaces/available.events';

export const availableSchema = new Schema<IAvailableEvent>(
  {
    eventName: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);
