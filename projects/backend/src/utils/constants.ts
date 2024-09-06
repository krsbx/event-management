import { BlazeContext } from '@busy-hour/blaze/internal';
import path from 'node:path';

export const APP_ROOT_PATH = path.resolve(__dirname, '../..');

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
