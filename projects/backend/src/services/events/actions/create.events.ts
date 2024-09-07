import { Error as MongooseError } from 'mongoose';
import { BlazeCreator, BlazeError } from '@busy-hour/blaze';
import { authHeader } from '../../../validations/common';
import { metaAuth } from '../../../utils/constants';
import { validateUserToken } from '../../../hooks/before/auth.hooks';
import { createBodySchema } from '../validations/create.events';
import { verifyUserRoleEventCreation } from '../hooks/before/creation.hooks';
import { EventStatus } from '../../../utils/constants/services.constants';
import { Document } from '../../../types/backend';
import { IEvent } from '../interfaces/event.events';

export const onCreateEvent = BlazeCreator.action({
  rest: 'POST /',
  throwOnValidationError: true,
  openapi: BlazeCreator.action.openapi({
    body: {
      type: 'application/json',
    },
  }),
  validator: BlazeCreator.action.validator({
    body: createBodySchema,
    header: authHeader,
  }),
  meta: {
    ...metaAuth,
  },
  hooks: {
    before: [validateUserToken, verifyUserRoleEventCreation],
  },
  async handler(ctx) {
    const authedUser = ctx.meta.get('user')!;
    const payload = await ctx.request.body();

    const eventRes = await ctx.call('events.$create', {
      ...payload,
      companyName: authedUser.companyName,
      proposedBy: authedUser._id.toString(),
      status: EventStatus.PENDING,
      eventDate: null,
      remarks: null,
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

    const event = eventRes.result as Document<IEvent>;

    return event;
  },
});
