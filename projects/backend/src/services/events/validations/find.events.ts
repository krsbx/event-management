import { Types } from 'mongoose';
import { z } from '@busy-hour/blaze';
import { FilterQuery } from '../../../types/backend';
import { IEvent } from '../interfaces/event.events';

export const $findBodySchema = z.object({
  filter: z.custom<FilterQuery<IEvent>>(),
  attributes: z.custom<(keyof IEvent)[]>().optional(),
});

export const findParamsSchema = z.object({
  eventId: z
    .string()
    .length(24)
    .transform((value) => new Types.ObjectId(value))
    .openapi({ example: '66dbfdc72e3e6af7bf303d4b' }),
});

export type FindParamsSchema = z.infer<typeof findParamsSchema>;
