import { z } from '@busy-hour/blaze';
import { FilterQuery } from '../../../types/backend';
import { IAvailableEvent } from '../interfaces/available.events';

export const $findBodySchema = z.object({
  filter: z.custom<FilterQuery<IAvailableEvent>>(),
  attributes: z.custom<(keyof IAvailableEvent)[]>().optional(),
});
