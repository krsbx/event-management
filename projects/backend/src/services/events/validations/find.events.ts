import { z } from '@busy-hour/blaze';
import { FilterQuery } from '../../../types/backend';
import { IEvent } from '../interfaces/event.events';

export const $findBodySchema = z.object({
  filter: z.custom<FilterQuery<IEvent>>(),
  attributes: z.custom<(keyof IEvent)[]>().optional(),
});
