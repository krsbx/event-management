import { z } from '@busy-hour/blaze';
import { Document, Types } from 'mongoose';
import { RecordUnknown } from '@busy-hour/blaze-types/helper';
import { FilterQuery } from '../../../types/backend';
import { IEvent } from '../interfaces/event.events';

export const $deleteBodySchema = z.object({
  filter: z.custom<FilterQuery<IEvent>>().optional(),
  instance: z
    .instanceof(Document<Types.ObjectId, RecordUnknown, IEvent>)
    .optional(),
});
