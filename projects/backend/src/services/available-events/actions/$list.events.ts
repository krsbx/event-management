import { BlazeCreator } from '@busy-hour/blaze';
import { metaList } from '../../../utils/constants';
import { paginateList } from '../../../hooks/before/pagination.hooks';
import { $listBodySchema } from '../validations/list.events';
import { AvailableEvent } from '../models/available.events';
import { IAvailableEvent } from '../interfaces/available.events';
import { Document } from '../../../types/backend';

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
    let queries: Document<IAvailableEvent>[];

    if (!attributes) {
      queries = AvailableEvent.find()
        .where(filter)
        .limit(ctx.meta.get('limit'))
        .skip(ctx.meta.get('offset')) as never;
    } else {
      queries = AvailableEvent.find()
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
