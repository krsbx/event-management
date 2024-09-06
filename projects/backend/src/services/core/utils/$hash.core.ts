import bcrypt from 'bcrypt';
import { env } from '../../../utils/env';

export async function hashText(text: string) {
  const salt = await bcrypt.genSalt(env.SALT_ROUND);

  return bcrypt.hash(text, salt);
}
