import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  MONGODB_HOST: z.string(),
  MONGODB_PORT: z.coerce.number().default(27017),
  MONGODB_DATABASE: z.string(),
  MONGODB_USER: z.string(),
  MONGODB_PASSWORD: z.string(),
});

export const env = envSchema.parse(process.env);
