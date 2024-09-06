import { BlazeCreator, z } from '@busy-hour/blaze';
import jwtToken from 'jsonwebtoken';
import { env } from '../../../utils/env';

export const $onSignJwt = BlazeCreator.action({
  validator: BlazeCreator.action.validator({
    body: z.object({
      payload: z.any(),
      options: z
        .object({
          expiresIn: z.string(),
        })
        .optional(),
    }),
  }),
  async handler(ctx) {
    const { payload, options } = await ctx.request.body();

    return jwtToken.sign(payload, env.JWT_SECRET, options);
  },
});
