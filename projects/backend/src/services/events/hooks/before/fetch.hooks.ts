import { BlazeCreator, BlazeError } from '@busy-hour/blaze';
import { Random, RecordUnknown } from '@busy-hour/blaze-types/helper';
import { AuthHeader } from '../../../../validations/common';
import { UserRoles } from '../../../../utils/constants/services.constants';
import { FindParamsSchema } from '../../validations/find.events';
import { FilterQuery } from '../../../../types/backend';
import { IEvent } from '../../interfaces/event.events';

export const verifyEventExistence = BlazeCreator.action.hook.before<
  Random,
  AuthHeader,
  FindParamsSchema,
  RecordUnknown,
  RecordUnknown
>(async (ctx) => {
  const authedUser = ctx.meta.get('user');

  if (!authedUser) {
    throw new BlazeError({
      message: 'Unauthorized',
      status: 401,
      errors: null,
    });
  }

  const filter: FilterQuery<IEvent> = {
    _id: {
      $eq: ctx.request.params.eventId,
    },
  };

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

  const eventRes = await ctx.call('events.$find', {
    filter,
  });

  if (!eventRes.ok || !eventRes.result) {
    throw new BlazeError({
      message: 'Event not found',
      status: 404,
      errors: null,
    });
  }

  ctx.meta.set('event', eventRes.result);
});
