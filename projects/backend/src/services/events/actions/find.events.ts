import { BlazeCreator } from '@busy-hour/blaze';
import { authHeader } from '../../../validations/common';
import { findParamsSchema } from '../validations/find.events';
import { metaAuth } from '../../../utils/constants';
import { metaEvent } from '../utils/constants.events';
import { validateUserToken } from '../../../hooks/before/auth.hooks';
import { verifyEventExistence } from '../hooks/before/fetch.hooks';

export const onFindEvent = BlazeCreator.action({
  rest: 'GET /:eventId',
  throwOnValidationError: true,
  openapi: BlazeCreator.action.openapi({
    body: {
      type: 'application/json',
    },
  }),
  validator: BlazeCreator.action.validator({
    header: authHeader,
    params: findParamsSchema,
  }),
  meta: {
    ...metaAuth,
    ...metaEvent,
  },
  hooks: {
    before: [validateUserToken, verifyEventExistence],
  },
  async handler(ctx) {
    const event = ctx.meta.get('event')!;

    return event;
  },
});
