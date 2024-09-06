import mongoose from 'mongoose';
import { env } from './env';

export function connectDB() {
  return mongoose.connect(
    `mongodb://${env.MONGODB_HOST}:${env.MONGODB_PORT}/${env.MONGODB_DATABASE}`,
    {
      user: env.MONGODB_USER,
      pass: env.MONGODB_PASSWORD,
    }
  );
}
