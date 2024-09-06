import { Schema, Types } from 'mongoose';
import { Migration } from '../interfaces/migration.migrations';

export const migrationSchema = new Schema<Migration>({
  migrationName: { type: String, required: true },
  executedAt: { type: Date, default: Date.now },
});
