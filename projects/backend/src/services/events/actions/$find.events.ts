import { BlazeCreator } from '@busy-hour/blaze';
import { validateFindFilter } from '../../../hooks/before/find.hooks';
import { $findBodySchema } from '../validations/find.events';
import { Event } from '../models/event.events';
import { Document } from '../../../types/backend';
import { IEvent } from '../interfaces/event.events';

export const $onFindEvent = BlazeCreator.action({
  throwOnValidationError: true,
  validator: BlazeCreator.action.validator({
    body: $findBodySchema,
  }),
  hooks: {
    before: validateFindFilter,
  },
  async handler(ctx) {
    const { filter, attributes } = await ctx.request.body();

    let queries = Event.findOne()
      .where(filter)
      .skip(ctx.meta.get('offset'))
      .populate(['eventName', 'proposedBy', 'proposedTo']);

    if (attributes) {
      queries = queries.select(attributes);
    }

    return (await queries) as Document<IEvent>;
  },
});
