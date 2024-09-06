import { Blaze } from '@busy-hour/blaze';
import { cors } from '@busy-hour/blaze/cors';
// import path from 'node:path';

const app = new Blaze({
  // path: path.resolve(__dirname, 'services'),
  autoStart: true,
  middlewares: [['ALL', cors()]],
});

const serve = app.serve(3000, console.log);

export default serve;
