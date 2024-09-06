import bcrypt from 'bcrypt';
import { BlazeCreator, z } from '@busy-hour/blaze';

export const $onCompareText = BlazeCreator.action({
  validator: BlazeCreator.action.validator({
    body: z.object({
      original: z.string(),
      modified: z.string(),
    }),
  }),
  async handler(ctx) {
    const { original, modified } = await ctx.request.body();

    return await bcrypt.compare(modified, original);
  },
});
