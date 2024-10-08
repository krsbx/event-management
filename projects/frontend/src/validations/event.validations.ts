import { z } from "zod";
import dayjs from "dayjs";
import { EventStatus } from "../utils/constants/services.constants";

export const proposedDateSchema = z.string().transform((value, ctx) => {
  const date = dayjs(value);

  if (!date.isValid()) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Invalid date format",
    });
  }

  if (date.isBefore(dayjs())) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Date cannot be in the past",
    });
  }

  return value;
});

export const createEventSchema = z.object({
  eventName: z.string(),
  location: z.string(),
  proposedDate1: proposedDateSchema,
  proposedDate2: proposedDateSchema,
  proposedDate3: proposedDateSchema,
  companyName: z.string(),
  proposedTo: z.string(),
});

export type CreateEventSchema = z.infer<typeof createEventSchema>;

export const updateEventSchema = z.object({
  status: z.nativeEnum(EventStatus),
  remarks: z.string().nullable().optional(),
  eventDate: z
    .string()
    .nullable()
    .optional()
    .transform((value, ctx) => {
      const date = dayjs(value);

      if (!date.isValid()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Invalid date format",
        });
      }

      return value;
    }),
});

export type UpdateEventSchema = z.infer<typeof updateEventSchema>;
