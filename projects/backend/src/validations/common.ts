import { z } from '@busy-hour/blaze';

export const authHeader = z.object({
  authorization: z
    .string()
    .optional()
    .openapi({ example: 'Bearer ***********-...' }),
});

export type AuthHeader = z.infer<typeof authHeader>;
