import { BlazeCreator, BlazeError, z } from '@busy-hour/blaze';

export const onSignInUser = BlazeCreator.action({
  rest: 'POST /signin',
  throwOnValidationError: true,
  openapi: BlazeCreator.action.openapi({
    body: {
      type: 'application/json',
    },
  }),
  validator: BlazeCreator.action.validator({
    body: z.object({
      username: z
        .string()
        .transform((value) => value.toLowerCase())
        .openapi({ example: 'john-doe' }),
      password: z.string().openapi({ example: 'password' }),
    }),
  }),
  async handler(ctx) {
    const payload = await ctx.request.body();

    const userRes = await ctx.call('users.$find', {
      filter: {
        username: {
          $eq: payload.username,
        },
      },
    });

    if (!userRes.ok || !userRes.result) {
      throw new BlazeError({
        message: 'Invalid credentials',
        status: 401,
        errors: {
          username: 'Invalid credentials',
          password: 'Invalid Credentials',
        },
      });
    }

    const validatePass = await ctx.call('core.$compareText', {
      original: userRes.result.password,
      modified: payload.password,
    });

    if (!validatePass) {
      throw new BlazeError({
        message: 'Invalid credentials',
        status: 401,
        errors: {
          username: 'Invalid credentials',
          password: 'Invalid Credentials',
        },
      });
    }

    const tokenRes = await ctx.call('core.$signJwt', {
      payload: userRes.result.toJSON(),
    });

    if (!tokenRes.ok) {
      throw new BlazeError({
        message: 'Invalid credentials',
        status: 401,
        errors: {
          username: 'Invalid credentials',
          password: 'Invalid Credentials',
        },
      });
    }

    const token = tokenRes.result as string;

    return {
      token,
    };
  },
});
