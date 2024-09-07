import { model } from 'mongoose';
import { availableSchema } from '../schemas/available.events';

export const AvailableEvent = model(
  'AvailableEvent',
  availableSchema,
  'availableEvents'
);
