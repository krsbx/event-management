import { Random } from '@busy-hour/blaze-types/helper';
import { BlazeContext } from '@busy-hour/blaze/internal';
import path from 'node:path';
import { Document } from '../../types/backend';
import { IUser } from '../../services/users/interfaces/user.users';

export const APP_ROOT_PATH = path.resolve(__dirname, '../../..');

export const APP_SRC_PATH = path.resolve(APP_ROOT_PATH, 'src');

export const APP_SERVICE_PATH = path.resolve(APP_SRC_PATH, 'services');

export const context = new BlazeContext({
  body: null,
  headers: null,
  honoCtx: null,
  meta: null,
  params: null,
  query: null,
  validations: null,
});

export const metaList = {
  page: 1,
  offset: 0,
  limit: 10,
};

export type MetaList = typeof metaList & Record<string, Random>;

export const metaAuth = {
  user: null as Document<IUser> | null,
};

export type MetaAuth = typeof metaAuth & Record<string, Random>;
