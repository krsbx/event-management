import { BlazeCreator } from '@busy-hour/blaze';
import { metaList } from '../../../utils/constants';
import { paginateList } from '../../../hooks/before/pagination.hooks';
import { $listBodySchema } from '../validations/list.events';
import { Event } from '../models/event.events';
import { Document } from '../../../types/backend';
import { IEvent } from '../interfaces/event.events';

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
    const count = await Event.countDocuments().where(filter);
    let queries = Event.find()
      .where(filter)
      .limit(ctx.meta.get('limit'))
      .skip(ctx.meta.get('offset'))
      .populate(['eventName', 'proposedBy', 'proposedTo']);

    if (attributes) {
      queries = queries.select(attributes);
    }

    const data = (await queries) as Document<IEvent>[];

    return {
      data,
      count,
    };
  },
});
