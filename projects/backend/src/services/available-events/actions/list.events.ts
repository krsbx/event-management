import { BlazeCreator, BlazeError } from '@busy-hour/blaze';
import { listQuerySchema } from '../validations/list.events';
import { Document, RestListResult } from '../../../types/backend';
import { IAvailableEvent } from '../interfaces/available.events';
import { authHeader } from '../../../validations/common';
import { validateUserToken } from '../../../hooks/before/auth.hooks';
import { metaAuth } from '../../../utils/constants';

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
    const { limit, page } = ctx.request.query;

    const listRes = await ctx.call('available-events.$list', {
      filter: {},
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

    const result: RestListResult<Document<IAvailableEvent>> = {
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
