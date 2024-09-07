import { BlazeCreator } from '@busy-hour/blaze';
import { metaList } from '../../../utils/constants';
import { paginateList } from '../../../hooks/before/pagination.hooks';
import { $listBodySchema } from '../validations/list.events';
import { AvailableEvent } from '../models/available.events';

export const $onListEvent = BlazeCreator.action({
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
    const count = await AvailableEvent.countDocuments().where(filter);
    let queries: ReturnType<typeof AvailableEvent.find>;

    if (!attributes) {
      queries = AvailableEvent.find()
        .where(filter)
        .limit(ctx.meta.get('limit'))
        .skip(ctx.meta.get('offset'));
    } else {
      queries = AvailableEvent.find()
        .where(filter)
        .select(attributes)
        .limit(ctx.meta.get('limit'))
        .skip(ctx.meta.get('offset'));
    }

    return {
      data: await queries,
      count,
    };
  },
});
