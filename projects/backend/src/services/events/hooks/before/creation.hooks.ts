import { BlazeCreator, BlazeError } from '@busy-hour/blaze';
import { Random, RecordUnknown } from '@busy-hour/blaze-types/helper';
import { AuthHeader } from '../../../../validations/common';
import { UserRoles } from '../../../../utils/constants/services.constants';

export const verifyUserRoleEventCreation = BlazeCreator.action.hook.before<
  Random,
  AuthHeader,
  RecordUnknown,
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

  if (authedUser.role !== UserRoles.HUMAN_RESOURCE) {
    throw new BlazeError({
      message: 'Event creation restricted to Human Resource only',
      status: 401,
      errors: null,
    });
  }
});
