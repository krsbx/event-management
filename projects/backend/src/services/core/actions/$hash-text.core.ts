import bcrypt from 'bcrypt';
import { BlazeCreator, z } from '@busy-hour/blaze';
import { env } from '../../../utils/env';

export const $onHashText = BlazeCreator.action({
  validator: BlazeCreator.action.validator({
    body: z.object({
      text: z.string(),
    }),
  }),
  async handler(ctx) {
    const { text } = await ctx.request.body();

    const salt = await bcrypt.genSalt(env.SALT_ROUND);

    return bcrypt.hash(text, salt);
  },
});
