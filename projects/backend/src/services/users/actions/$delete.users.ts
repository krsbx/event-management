import { BlazeCreator } from '@busy-hour/blaze';
import { validateInstanceFilter } from '../../../hooks/before/instance.hooks';
import { $deleteBodySchema } from '../validations/delete.users';
import { User } from '../models/user.users';

export const $onDeleteUser = BlazeCreator.action({
  throwOnValidationError: true,
  validator: BlazeCreator.action.validator({
    body: $deleteBodySchema,
  }),
  hooks: {
    before: validateInstanceFilter,
  },
  async handler(ctx) {
    const { filter, instance } = await ctx.request.body();

    if (instance) {
      return instance.deleteOne();
    }

    return User.deleteMany(filter);
  },
});
