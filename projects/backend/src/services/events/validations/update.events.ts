import { z } from '@busy-hour/blaze';
import { Document, Types } from 'mongoose';
import { RecordUnknown } from '@busy-hour/blaze-types/helper';
import { FilterQuery } from '../../../types/backend';
import { IEvent } from '../interfaces/event.events';
import { EventStatus } from '../../../utils/constants/services.constants';

export const $updateBodySchema = z.object({
  payload: z
    .object({
      eventName: z.string(),
      location: z.string(),
      proposedDates: z.array(z.coerce.date()).min(1).max(3),
      status: z.nativeEnum(EventStatus),
      companyName: z.string(),
      proposedBy: z.string(),
      proposedTo: z.string(),
      remarks: z.string().nullable().default(null),
      eventDate: z.coerce.date().nullable().default(null),
    })
    .partial(),
  filter: z.custom<FilterQuery<IEvent>>().optional(),
  instance: z
    .instanceof(Document<Types.ObjectId, RecordUnknown, IEvent>)
    .optional(),
});

export const updateBodySchema = z.object({
  status: z.nativeEnum(EventStatus),
  remarks: z.string().nullable().optional(),
  eventDate: z.coerce.date().nullable().optional(),
});

export type UpdateBodySchema = z.infer<typeof updateBodySchema>;
