import { z } from '@busy-hour/blaze';
import { Document, Types } from 'mongoose';
import { RecordUnknown } from '@busy-hour/blaze-types/helper';
import { FilterQuery } from '../../../types/backend';
import { IAvailableEvent } from '../interfaces/available.events';

export const $updateBodySchema = z.object({
  payload: z.object({
    eventName: z.string(),
  }),
  filter: z.custom<FilterQuery<IAvailableEvent>>().optional(),
  instance: z
    .instanceof(Document<Types.ObjectId, RecordUnknown, IAvailableEvent>)
    .optional(),
});
