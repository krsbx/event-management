import { z } from '@busy-hour/blaze';
import { FilterQuery } from '../../../types/backend';
import { IEvent } from '../interfaces/event.events';

export const $listBodySchema = z.object({
  filter: z.custom<FilterQuery<IEvent>>(),
  attributes: z.custom<(keyof IEvent)[]>().optional(),
  limit: z.number().positive().optional(),
  page: z.number().min(1).positive().optional(),
});

export const listQuerySchema = z.object({
  limit: z.coerce
    .number()
    .positive()
    .optional()
    .default(10)
    .openapi({ example: 10 }),
  page: z.coerce
    .number()
    .min(1)
    .positive()
    .optional()
    .default(1)
    .openapi({ example: 1 }),
});
