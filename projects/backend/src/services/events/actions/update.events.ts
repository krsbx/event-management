import { BlazeCreator, BlazeError } from '@busy-hour/blaze';
import { Error as MongooseError } from 'mongoose';
import { authHeader } from '../../../validations/common';
import { findParamsSchema } from '../validations/find.events';
import { metaAuth } from '../../../utils/constants';
import { validateUserToken } from '../../../hooks/before/auth.hooks';
import { updateBodySchema } from '../validations/update.events';
import { verifyUpdatePayload } from '../hooks/before/update.hooks';
import { metaEvent } from '../utils/constants.events';
import { verifyEventExistence } from '../hooks/before/fetch.hooks';
import { Document } from '../../../types/backend';
import { IEvent } from '../interfaces/event.events';
import { EventStatus } from '../../../utils/constants/services.constants';
import { validateUpdatePayload } from '../../../hooks/before/update.hooks';

export const onUpdateEvent = BlazeCreator.action({
  rest: 'PATCH /:eventId',
  throwOnValidationError: true,
  openapi: BlazeCreator.action.openapi({
    body: {
      type: 'application/json',
    },
  }),
  validator: BlazeCreator.action.validator({
    body: updateBodySchema,
    header: authHeader,
    params: findParamsSchema,
  }),
  meta: {
    ...metaAuth,
    ...metaEvent,
  },
  hooks: {
    before: [
      validateUserToken,
      verifyEventExistence,
      verifyUpdatePayload,
      validateUpdatePayload,
    ],
  },
  async handler(ctx) {
    const prevEvent = ctx.meta.get('event')!;
    const payload = await ctx.request.body();

    if (prevEvent.status !== EventStatus.PENDING) {
      throw new BlazeError({
        message: 'Event no longer can be updated',
        status: 400,
        errors: null,
      });
    }

    const eventRes = await ctx.call('events.$update', {
      instance: prevEvent,
      payload,
    });

    if (!eventRes.ok) {
      if (eventRes.error instanceof MongooseError.ValidationError) {
        throw new BlazeError({
          message: 'Bad Request',
          status: 400,
          errors: eventRes.error.errors,
        });
      }

      throw new BlazeError({
        message: 'Something went wrong',
        status: 500,
        errors: null,
      });
    }

    const event = eventRes.result.data[0] as Document<IEvent>;

    return event;
  },
});
