import { z } from '@busy-hour/blaze';
import { IUser } from '../interfaces/user.users';
import { FilterQuery } from '../../../types/backend';

export const $listBodySchema = z.object({
  filter: z.custom<FilterQuery<IUser>>(),
  attributes: z.custom<(keyof IUser)[]>().optional(),
  limit: z.number().positive().optional(),
  page: z.number().min(1).positive().optional(),
});
