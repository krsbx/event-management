import { BlazeCreator, z } from '@busy-hour/blaze';
import { hashText } from '../utils/$hash.core';

export const $onHashText = BlazeCreator.action({
  validator: BlazeCreator.action.validator({
    body: z.object({
      text: z.string(),
    }),
  }),
  async handler(ctx) {
    const { text } = await ctx.request.body();

    return hashText(text);
  },
});
