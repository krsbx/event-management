import { BlazeCreator } from '@busy-hour/blaze';
import { RecordUnknown } from '@busy-hour/blaze-types/helper';
import { Document, Types } from 'mongoose';
import { $updateBodySchema } from '../validations/update.users';
import { validateInstanceFilter } from '../../../hooks/before/instance.hooks';
import { IUser } from '../interfaces/user.users';
import { User } from '../models/user.users';

export const $onUpdateUser = BlazeCreator.action({
  throwOnValidationError: true,
  validator: BlazeCreator.action.validator({
    body: $updateBodySchema,
  }),
  hooks: {
    before: validateInstanceFilter,
  },
  async handler(ctx) {
    const { filter, instance, payload } = await ctx.request.body();

    const result = {
      data: [] as Document<Types.ObjectId, RecordUnknown, IUser>[],
      count: 0,
    };

    if (instance) {
      await instance.updateOne(payload);

      result.data = [instance];
      result.count = 1;

      return result;
    }

    const { modifiedCount } = await User.updateMany(filter!, payload);

    const modifiedUsers = await User.find().where(filter!);

    result.data = modifiedUsers as never;
    result.count = modifiedCount;

    return result;
  },
});
