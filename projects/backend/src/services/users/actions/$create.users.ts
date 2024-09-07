import { BlazeCreator } from '@busy-hour/blaze';
import { $createBodySchema } from '../validations/create.users';
import { User } from '../models/user.users';

export const $onCreateUser = BlazeCreator.action({
  throwOnValidationError: true,
  validator: BlazeCreator.action.validator({
    body: $createBodySchema,
  }),
  async handler(ctx) {
    const payload = await ctx.request.body();

    const passwordRes = await ctx.call('core.$hashText', {
      text: payload.password,
    });

    if (!passwordRes.ok) {
      throw passwordRes.error;
    }

    return User.create(payload);
  },
});
