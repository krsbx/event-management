import { BlazeCreator } from '@busy-hour/blaze';
import { RecordString, RecordUnknown } from '@busy-hour/blaze-types/helper';
import { MetaList } from '../../utils/constants';

export const paginateList = BlazeCreator.action.hook.before<
  MetaList,
  RecordString,
  RecordUnknown,
  RecordUnknown,
  {
    limit?: number;
    page?: number;
  }
>(async (ctx) => {
  const { limit, page } = await ctx.request.body();

  if (limit !== undefined) {
    ctx.meta.set('limit', limit);
  }

  if (page !== undefined) {
    ctx.meta.set('page', page);
  }

  ctx.meta.set('offset', (ctx.meta.get('page') - 1) * ctx.meta.get('limit'));
});
