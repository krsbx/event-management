import { z } from "zod";
import dayjs from "dayjs";
import { EventStatus } from "../utils/constants/services.constants";

export const createEventSchema = z.object({
  eventName: z.string(),
  location: z.string(),
  proposedDates: z
    .array(
      z.string().transform((value, ctx) => {
        const date = dayjs(value);

        if (!date.isValid()) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Invalid date format",
          });
        }

        return value;
      }),
    )
    .min(1)
    .max(3),
  companyName: z.string(),
  proposedTo: z.string(),
});

export type CreateEventSchema = z.infer<typeof createEventSchema>;

export const updateEventSchema = z.object({
  status: z.nativeEnum(EventStatus),
  remarks: z.string().nullable().optional(),
  eventDate: z.coerce.date().nullable().optional(),
});

export type UpdateEventSchema = z.infer<typeof updateEventSchema>;
