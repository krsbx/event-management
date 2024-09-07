import { BlazeCreator } from '@busy-hour/blaze';
import { $createBodySchema } from '../validations/create.events';
import { AvailableEvent } from '../models/available.events';

export const $onCreateEvent = BlazeCreator.action({
  throwOnValidationError: true,
  validator: BlazeCreator.action.validator({
    body: $createBodySchema,
  }),
  async handler(ctx) {
    const payload = await ctx.request.body();

    return AvailableEvent.create(payload);
  },
});
