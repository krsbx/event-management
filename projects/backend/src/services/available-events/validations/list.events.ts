import { z } from '@busy-hour/blaze';
import { FilterQuery } from '../../../types/backend';
import { IAvailableEvent } from '../interfaces/available.events';

export const $listBodySchema = z.object({
  filter: z.custom<FilterQuery<IAvailableEvent>>(),
  attributes: z.custom<(keyof IAvailableEvent)[]>().optional(),
  limit: z.number().positive().optional(),
  page: z.number().min(1).positive().optional(),
});
