import { z } from '@busy-hour/blaze';
import { Document, Types } from 'mongoose';
import { RecordUnknown } from '@busy-hour/blaze-types/helper';
import { FilterQuery } from '../../../types/backend';
import { IUser } from '../interfaces/user.users';
import { UserRoles } from '../../../utils/constants/services.constants';

export const $updateBodySchema = z.object({
  payload: z.object({
    username: z.string().optional(),
    password: z.string().optional(),
    companyName: z.string().optional(),
    role: z
      .nativeEnum(UserRoles)
      .optional()
      .openapi({ example: UserRoles.HUMAN_RESOURCE }),
  }),
  filter: z.custom<FilterQuery<IUser>>().optional(),
  instance: z
    .instanceof(Document<Types.ObjectId, RecordUnknown, IUser>)
    .optional(),
});
