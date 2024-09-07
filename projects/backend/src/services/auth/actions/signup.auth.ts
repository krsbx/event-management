import { BlazeCreator, z } from '@busy-hour/blaze';
import { Document } from 'mongoose';
import { UserRoles } from '../../../utils/constants/services.constants';
import { IUser } from '../../users/interfaces/user.users';

export const onSignUpUser = BlazeCreator.action({
  rest: 'POST /singup',
  throwOnValidationError: true,
  openapi: BlazeCreator.action.openapi({
    body: {
      type: 'application/json',
    },
  }),
  validator: BlazeCreator.action.validator({
    body: z.object({
      username: z
        .string()
        .transform((value) => value.toLowerCase())
        .openapi({ example: 'john-doe' }),
      password: z.string().openapi({ example: 'password' }),
      companyName: z.string().openapi({ example: 'Company' }),
      role: z.nativeEnum(UserRoles),
    }),
  }),
  async handler(ctx) {
    const payload = await ctx.request.body();

    const userRes = await ctx.call('users.$create', payload);

    if (!userRes.ok) {
      throw userRes.error;
    }

    const user = userRes.result as Document & IUser;

    return {
      user,
    };
  },
});
