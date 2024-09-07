import { BlazeCreator, BlazeError } from '@busy-hour/blaze';
import {
  Random,
  RecordString,
  RecordUnknown,
} from '@busy-hour/blaze-types/helper';

export const validateFindFilter = BlazeCreator.action.hook.before<
  RecordUnknown,
  RecordString,
  RecordUnknown,
  RecordUnknown,
  {
    filter: Random;
  }
>(async (ctx) => {
  const { filter } = await ctx.request.body();
  const filters = Object.values(filter).filter(Boolean);

  if (!filters.length) {
    throw new BlazeError({
      message: 'Please provide at least one filter',
      status: 400,
      errors: null,
    });
  }
});
