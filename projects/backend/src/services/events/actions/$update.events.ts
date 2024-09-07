import { BlazeCreator } from '@busy-hour/blaze';
import { RecordUnknown } from '@busy-hour/blaze-types/helper';
import { Document, Types } from 'mongoose';
import { validateInstanceFilter } from '../../../hooks/before/instance.hooks';
import { $updateBodySchema } from '../validations/update.events';
import { Event } from '../models/event.events';
import { IEvent } from '../interfaces/event.events';

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
      data: [] as Document<Types.ObjectId, RecordUnknown, IEvent>[],
      count: 0,
    };

    if (instance) {
      await instance.updateOne(payload);

      const updated = (await Event.findById(instance._id))!;

      result.data = [updated as never];
      result.count = 1;

      return result;
    }

    const { modifiedCount } = await Event.updateMany(filter!, payload);

    const modifiedEvents = await Event.find().where(filter!);

    result.data = modifiedEvents as never;
    result.count = modifiedCount;

    return result;
  },
});
