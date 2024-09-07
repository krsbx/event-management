import { model } from 'mongoose';
import { eventSchema } from '../schemas/event.events';

export const Event = model('Event', eventSchema, 'events');
