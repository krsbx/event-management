import { z } from '@busy-hour/blaze';
import { UserRoles } from '../utils/constants.users';

export const $createBodySchema = z.object({
  username: z.string().openapi({ example: 'username' }),
  password: z.string().openapi({ example: 'password' }),
  companyName: z.string().openapi({ example: 'company name' }),
  role: z.nativeEnum(UserRoles).openapi({ example: UserRoles.HUMAN_RESOURCE }),
});
