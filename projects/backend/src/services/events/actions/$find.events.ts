import { BlazeCreator } from '@busy-hour/blaze';
import { validateFindFilter } from '../../../hooks/before/find.hooks';
import { $findBodySchema } from '../validations/find.events';
import { Event } from '../models/event.events';

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

    if (!attributes) {
      return Event.findOne().where(filter);
    }

    return Event.findOne().where(filter).select(attributes);
  },
});
