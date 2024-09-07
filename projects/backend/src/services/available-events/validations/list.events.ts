import { z } from '@busy-hour/blaze';
import { FilterQuery } from '../../../types/backend';
import { IAvailableEvent } from '../interfaces/available.events';

export const $listBodySchema = z.object({
  filter: z.custom<FilterQuery<IAvailableEvent>>(),
  attributes: z.custom<(keyof IAvailableEvent)[]>().optional(),
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
