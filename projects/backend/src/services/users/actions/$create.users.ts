import { BlazeCreator, BlazeError } from '@busy-hour/blaze';
import { $createBodySchema } from '../validations/create.users';
import { User } from '../models/user.users';

export const $onCreateUser = BlazeCreator.action({
  throwOnValidationError: true,
  validator: BlazeCreator.action.validator({
    body: $createBodySchema,
  }),
  async handler(ctx) {
    const payload = await ctx.request.body();

    const prevUser = await ctx.call('users.$find', {
      filter: {
        username: {
          $eq: payload.username,
        },
      },
    });

    if (prevUser.ok && prevUser.result) {
      throw new BlazeError({
        message: 'User already exists',
        errors: {
          username: 'User already exists',
          companyName: 'User already exists',
        },
        status: 409,
      });
    }

    const passwordRes = await ctx.call('core.$hashText', {
      text: payload.password,
    });

    if (!passwordRes.ok) {
      throw passwordRes.error;
    }

    payload.password = passwordRes.result;

    return User.create(payload);
  },
});
