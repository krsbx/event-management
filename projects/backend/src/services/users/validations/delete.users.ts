import { z } from '@busy-hour/blaze';
import { Document, Types } from 'mongoose';
import { RecordUnknown } from '@busy-hour/blaze-types/helper';
import { IUser } from '../interfaces/user.users';
import { FilterQuery } from '../../../types/backend';

export const $deleteBodySchema = z.object({
  filter: z.custom<FilterQuery<IUser>>().optional(),
  instance: z
    .instanceof(Document<Types.ObjectId, RecordUnknown, IUser>)
    .optional(),
});
