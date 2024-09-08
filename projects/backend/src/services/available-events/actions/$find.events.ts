import { BlazeCreator } from '@busy-hour/blaze';
import { validateFindFilter } from '../../../hooks/before/find.hooks';
import { $findBodySchema } from '../validations/find.events';
import { AvailableEvent } from '../models/available.events';
import { Document } from '../../../types/backend';
import { IAvailableEvent } from '../interfaces/available.events';

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

    let queries = AvailableEvent.findOne()
      .where(filter)
      .skip(ctx.meta.get('offset'));

    if (attributes) {
      queries = queries.select(attributes);
    }

    return (await queries) as Document<IAvailableEvent>;
  },
});
