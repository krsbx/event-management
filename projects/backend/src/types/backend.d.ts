import { ClientSession } from 'mongoose';

declare namespace Backend {
  export interface Migration {
    up(session?: ClientSession): Promise<void>;
    down(session?: ClientSession): Promise<void>;
  }
}
