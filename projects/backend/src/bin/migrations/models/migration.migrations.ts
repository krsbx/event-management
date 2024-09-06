import { model } from 'mongoose';
import { migrationSchema } from '../schemas/migration.migrations';

export const Migration = model('Migration', migrationSchema);
