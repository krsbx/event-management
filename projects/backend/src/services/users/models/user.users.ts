import { model } from 'mongoose';
import { userSchema } from '../schemas/user.users';

export const User = model('User', userSchema, 'users');
