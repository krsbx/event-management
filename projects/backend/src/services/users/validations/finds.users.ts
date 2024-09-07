import { z } from '@busy-hour/blaze';
import { IUser } from '../interfaces/user.users';
import { FilterQuery } from '../../../types/backend';

export const $findBodySchema = z.object({
  filter: z.custom<FilterQuery<IUser>>(),
  attributes: z.custom<(keyof IUser)[]>().optional(),
});
