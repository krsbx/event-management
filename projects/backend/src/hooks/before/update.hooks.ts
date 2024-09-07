import { BlazeCreator, BlazeError } from '@busy-hour/blaze';
import { Random, RecordUnknown } from '@busy-hour/blaze-types/helper';

export const validateUpdatePayload = BlazeCreator.action.hook.before<
  Random,
  Random,
  RecordUnknown,
  RecordUnknown,
  RecordUnknown
>(async (ctx) => {
  const payload = await ctx.request.body();
  const payloads = Object.values(payload).filter(Boolean);

  if (!payloads.length) {
    throw new BlazeError({
      message: 'Payload cannot be empty',
      status: 400,
      errors: null,
    });
  }
});
