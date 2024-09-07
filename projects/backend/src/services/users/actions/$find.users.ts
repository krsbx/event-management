import { BlazeCreator } from '@busy-hour/blaze';
import { User } from '../models/user.users';
import { validateFindFilter } from '../../../hooks/before/find.hooks';
import { $findBodySchema } from '../validations/finds.users';

export const $onFindUser = BlazeCreator.action({
  throwOnValidationError: true,
  validator: BlazeCreator.action.validator({
    body: $findBodySchema,
  }),
  hooks: {
    before: validateFindFilter,
  },
  async handler(ctx) {
    const { filter, attributes } = await ctx.request.body();

    if (!attributes) {
      return User.findOne().where(filter);
    }

    return User.findOne().where(filter).select(attributes);
  },
});
