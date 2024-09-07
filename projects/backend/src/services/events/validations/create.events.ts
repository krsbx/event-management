import { z } from '@busy-hour/blaze';
import { EventStatus } from '../../../utils/constants/services.constants';

export const $createBodySchema = z.object({
  eventName: z
    .string()
    .length(24)
    .openapi({ example: '66dbee51d126d6ffae044d02' }),
  location: z.string().openapi({ example: 'location' }),
  proposedDates: z
    .array(z.coerce.date())
    .min(1)
    .max(3)
    .openapi({ example: ['2022-01-01', '2022-01-02'] as never }),
  status: z.nativeEnum(EventStatus).openapi({ example: EventStatus.PENDING }),
  companyName: z.string().openapi({ example: 'company name' }),
  proposedBy: z
    .string()
    .length(24)
    .openapi({ example: '66dbfdc72e3e6af7bf303d4b' }),
  proposedTo: z.string().openapi({ example: '66dbfdc72e3e6af7bf303d4b' }),
  remarks: z.string().nullable().default(null).openapi({ example: null }),
  eventDate: z.coerce
    .date()
    .nullable()
    .default(null)
    .openapi({ example: null }),
});

export const createBodySchema = $createBodySchema.omit({
  companyName: true,
  proposedBy: true,
  remarks: true,
  eventDate: true,
  status: true,
});
