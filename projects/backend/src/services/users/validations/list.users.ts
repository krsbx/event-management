import { z } from '@busy-hour/blaze';
import { IUser } from '../interfaces/user.users';
import { FilterQuery } from '../../../types/backend';
import { UserRoles } from '../../../utils/constants/services.constants';

export const $listBodySchema = z.object({
  filter: z.custom<FilterQuery<IUser>>(),
  attributes: z.custom<(keyof IUser)[]>().optional(),
  limit: z.number().min(0).optional(),
  page: z.number().min(1).optional(),
});

export const listQuerySchema = z.object({
  role: z.nativeEnum(UserRoles).optional(),
  limit: z.coerce
    .number()
    .min(0)
    .optional()
    .default(10)
    .openapi({ example: 10 }),
  page: z.coerce.number().min(1).optional().default(1).openapi({ example: 1 }),
});
