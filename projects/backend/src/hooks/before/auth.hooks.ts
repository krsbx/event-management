import { BlazeCreator, BlazeError } from '@busy-hour/blaze';
import { Random, RecordUnknown } from '@busy-hour/blaze-types/helper';
import { AuthHeader } from '../../validations/common';
import { User } from '../../services/users/models/user.users';

export const validateUserToken = BlazeCreator.action.hook.before<
  Random,
  AuthHeader,
  RecordUnknown,
  RecordUnknown,
  RecordUnknown
>(async (ctx) => {
  const { authorization } = ctx.request.headers;

  if (!authorization) {
    throw new BlazeError({
      message: 'Unauthorized',
      status: 401,
      errors: null,
    });
  }

  const verifyRes = await ctx.call('core.$verifyJwt', {
    token: authorization.split?.(' ')?.[1] ?? '',
  });

  if (!verifyRes.ok) {
    throw new BlazeError({
      message: 'Unauthorized',
      status: 401,
      errors: null,
    });
  }

  const user = new User(verifyRes.result);

  ctx.meta.set('user', user);
});
