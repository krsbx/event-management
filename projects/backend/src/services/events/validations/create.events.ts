import { z } from '@busy-hour/blaze';
import { EventStatus } from '../../../utils/constants/services.constants';

export const $createBodySchema = z.object({
  eventName: z.string(),
  location: z.string(),
  proposedDates: z.array(z.coerce.date()).min(1).max(3),
  status: z.nativeEnum(EventStatus),
  companyName: z.string(),
  proposedBy: z.string(),
  proposedTo: z.string(),
  remarks: z.string().nullable().default(null),
  eventDate: z.coerce.date().nullable().default(null),
});
