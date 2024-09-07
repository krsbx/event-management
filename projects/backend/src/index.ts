import { Blaze } from '@busy-hour/blaze';
import { cors } from '@busy-hour/blaze/cors';
import path from 'node:path';
import { setupDoc } from './utils/setup';
import { connectDB } from './utils/mongoose';

const app = new Blaze({
  path: path.resolve(__dirname, 'services'),
  autoStart: true,
  middlewares: [['ALL', cors()]],
});

connectDB();

const serve = setupDoc(app);

export default serve;
