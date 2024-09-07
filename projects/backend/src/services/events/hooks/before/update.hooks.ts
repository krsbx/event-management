import { BlazeCreator, BlazeError } from '@busy-hour/blaze';
import { Random, RecordUnknown } from '@busy-hour/blaze-types/helper';
import { AuthHeader } from '../../../../validations/common';
import {
  EventStatus,
  UserRoles,
} from '../../../../utils/constants/services.constants';
import { UpdateBodySchema } from '../../validations/update.events';

export const verifyUpdatePayload = BlazeCreator.action.hook.before<
  Random,
  AuthHeader,
  RecordUnknown,
  RecordUnknown,
  UpdateBodySchema
>(async (ctx) => {
  const authedUser = ctx.meta.get('user');
  const payload = await ctx.request.body();

  if (!authedUser) {
    throw new BlazeError({
      message: 'Unauthorized',
      status: 401,
      errors: null,
    });
  }

  if (authedUser.role === UserRoles.HUMAN_RESOURCE) {
    delete payload.eventDate;

    if (![EventStatus.PENDING, EventStatus.CANCELED].includes(payload.status)) {
      throw new BlazeError({
        message: 'Human resource can only cancel the events',
        status: 401,
        errors: null,
      });
    }

    return;
  }

  switch (payload.status) {
    case EventStatus.REJECTED:
      if (!payload.remarks) {
        throw new BlazeError({
          message: 'Bad Request',
          status: 400,
          errors: {
            remarks: 'Remarks is required',
            eventDate: 'Event Date is required',
          },
        });
      }
      break;

    case EventStatus.APPROVED:
      if (!payload.eventDate) {
        throw new BlazeError({
          message: 'Bad Request',
          status: 400,
          errors: {
            eventDate: 'Event Date is required',
          },
        });
      }
      break;

    default:
      payload.status = EventStatus.PENDING;
      break;
  }
});
