import { BlazeCreator, BlazeError } from '@busy-hour/blaze';
import { listQuerySchema } from '../validations/list.events';
import { Document, FilterQuery, RestListResult } from '../../../types/backend';
import { IEvent } from '../interfaces/event.events';
import { authHeader } from '../../../validations/common';
import { validateUserToken } from '../../../hooks/before/auth.hooks';
import { metaAuth } from '../../../utils/constants';
import { UserRoles } from '../../../utils/constants/services.constants';

export const onListEvent = BlazeCreator.action({
  rest: 'GET /',
  throwOnValidationError: true,
  openapi: BlazeCreator.action.openapi({
    body: {
      type: 'application/json',
    },
  }),
  validator: BlazeCreator.action.validator({
    query: listQuerySchema,
    header: authHeader,
  }),
  meta: {
    ...metaAuth,
  },
  hooks: {
    before: validateUserToken,
  },
  async handler(ctx) {
    const authedUser = ctx.meta.get('user')!;
    const { limit, page } = ctx.request.query;
    const filter: FilterQuery<IEvent> = {};

    switch (authedUser.role) {
      case UserRoles.HUMAN_RESOURCE:
        filter.proposedBy = {
          $eq: authedUser._id,
        };
        break;

      case UserRoles.VENDOR:
        filter.proposedTo = {
          $eq: authedUser._id,
        };
        break;

      default:
        break;
    }

    const listRes = await ctx.call('events.$list', {
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

    const result: RestListResult<Document<IEvent>> = {
      data: listRes.result.data,
      page: {
        size: listRes.result.count,
        current: page || 1,
        total: Math.ceil(listRes.result.count / (limit || 10)),
      },
    };

    return result;
  },
});
