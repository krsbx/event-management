import _ from 'lodash';
import { BlazeCreator, BlazeError } from '@busy-hour/blaze';
import { listQuerySchema } from '../validations/list.users';
import { authHeader } from '../../../validations/common';
import { metaAuth } from '../../../utils/constants';
import { validateUserToken } from '../../../hooks/before/auth.hooks';
import { Document, FilterQuery, RestListResult } from '../../../types/backend';
import { IUser } from '../interfaces/user.users';

export const onListUser = BlazeCreator.action({
  rest: 'GET /',
  throwOnValidationError: true,
  openapi: BlazeCreator.action.openapi({
    body: {
      type: 'application/json',
    },
  }),
  validator: BlazeCreator.action.validator({
    header: authHeader,
    query: listQuerySchema,
  }),
  meta: {
    ...metaAuth,
  },
  hooks: {
    before: validateUserToken,
  },
  async handler(ctx) {
    const authedUser = ctx.meta.get('user')!;
    const { limit, page, role } = ctx.request.query;
    const filter: FilterQuery<IUser> = {
      role: {
        $ne: authedUser.role,
      },
    };

    if (role) {
      filter.role = {
        $eq: role,
      };
    }

    const listRes = await ctx.call('users.$list', {
      filter,
      limit,
      page,
    });

    if (!listRes.ok) {
      throw new BlazeError({
        status: 500,
        message: 'Something went wrong',
        errors: null,
      });
    }

    const result: RestListResult<Omit<IUser, 'password'>> = {
      data: listRes.result.data.map((user) =>
        _.omit(user.toJSON(), ['password'])
      ),
      page: {
        size: listRes.result.count,
        current: page || 1,
        total: Math.ceil(listRes.result.count / (limit || 1)),
      },
    };

    return result;
  },
});
