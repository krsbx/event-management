import { z } from '@busy-hour/blaze';

export const $createBodySchema = z.object({
  eventName: z.string(),
});
