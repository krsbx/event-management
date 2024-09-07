import { BlazeCreator } from '@busy-hour/blaze';
import { User } from '../models/user.users';
import { validateFindFilter } from '../../../hooks/before/find.hooks';
import { $findBodySchema } from '../validations/finds.users';
import { IUser } from '../interfaces/user.users';
import { Document } from '../../../types/backend';

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

    let queries = User.findOne()
      .where(filter)
      .limit(ctx.meta.get('limit'))
      .skip(ctx.meta.get('offset'));

    if (attributes) {
      queries = queries.select(attributes);
    }

    return (await queries) as Document<IUser>;
  },
});
