import { BlazeCreator } from '@busy-hour/blaze';
import { RecordUnknown } from '@busy-hour/blaze-types/helper';
import { Document, Types } from 'mongoose';
import { validateInstanceFilter } from '../../../hooks/before/instance.hooks';
import { $updateBodySchema } from '../validations/update.events';
import { IAvailableEvent } from '../interfaces/available.events';
import { AvailableEvent } from '../models/available.events';

export const $onUpdateEvent = BlazeCreator.action({
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
      data: [] as Document<Types.ObjectId, RecordUnknown, IAvailableEvent>[],
      count: 0,
    };

    if (instance) {
      await instance.updateOne(payload);

      result.data = [instance];
      result.count = 1;

      return result;
    }

    const { modifiedCount } = await AvailableEvent.updateMany(filter!, payload);

    const modifiedEvents = await AvailableEvent.find().where(filter!);

    result.data = modifiedEvents as never;
    result.count = modifiedCount;

    return result;
  },
});
