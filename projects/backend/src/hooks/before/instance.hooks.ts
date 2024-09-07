import { BlazeCreator, BlazeError } from '@busy-hour/blaze';
import { RecordString, RecordUnknown } from '@busy-hour/blaze-types/helper';

export const validateInstanceFilter = BlazeCreator.action.hook.before<
  RecordUnknown,
  RecordString,
  RecordUnknown,
  RecordUnknown,
  {
    filter?: unknown;
    instance?: unknown;
  }
>(async (ctx) => {
  const body = await ctx.request.body();

  if (!body.filter && !body.instance) {
    throw new BlazeError({
      message: 'Please provide at least one filter or instance',
      status: 400,
      errors: null,
    });
  }
});
