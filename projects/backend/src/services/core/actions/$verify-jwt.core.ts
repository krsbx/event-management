import { BlazeCreator, z } from '@busy-hour/blaze';
import jwtToken from 'jsonwebtoken';
import { env } from '../../../utils/env';

export const $onVerifyJwt = BlazeCreator.action({
  validator: BlazeCreator.action.validator({
    body: z.object({
      token: z.string(),
    }),
  }),
  async handler(ctx) {
    const { token } = await ctx.request.body();

    return jwtToken.verify(token, env.JWT_SECRET);
  },
});
