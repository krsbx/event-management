import { BlazeCreator } from '@busy-hour/blaze';
import { User } from '../models/user.users';
import { metaList } from '../../../utils/constants';
import { paginateList } from '../../../hooks/before/pagination.hooks';
import { $listBodySchema } from '../validations/list.users';
import { Document } from '../../../types/backend';
import { IUser } from '../interfaces/user.users';

export const $onListUser = BlazeCreator.action({
  throwOnValidationError: true,
  validator: BlazeCreator.action.validator({
    body: $listBodySchema,
  }),
  meta: {
    ...metaList,
  },
  hooks: {
    before: paginateList,
  },
  async handler(ctx) {
    const { filter, attributes } = await ctx.request.body();
    const count = await User.countDocuments().where(filter);
    let queries: Document<IUser>[];

    if (!attributes) {
      queries = User.find()
        .where(filter)
        .limit(ctx.meta.get('limit'))
        .skip(ctx.meta.get('offset')) as never;
    } else {
      queries = User.find()
        .where(filter)
        .select(attributes)
        .limit(ctx.meta.get('limit'))
        .skip(ctx.meta.get('offset')) as never;
    }

    return {
      data: await queries,
      count,
    };
  },
});
