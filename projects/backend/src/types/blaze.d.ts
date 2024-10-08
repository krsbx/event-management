// Do not edit this file!
// The content are generated automatically

import '@busy-hour/blaze';
import type {
  ActionsExtractor,
  EventsExtractor,
} from '@busy-hour/blaze-types/internal';
import auth from '../services/auth';
import available_events from '../services/available-events';
import core from '../services/core';
import events from '../services/events';
import users from '../services/users';

declare module '@busy-hour/blaze' {
  export interface ActionCallRecord
    extends ActionsExtractor<typeof auth>,
      ActionsExtractor<typeof available_events>,
      ActionsExtractor<typeof core>,
      ActionsExtractor<typeof events>,
      ActionsExtractor<typeof users> {}

  export interface EventCallRecord
    extends EventsExtractor<typeof auth>,
      EventsExtractor<typeof available_events>,
      EventsExtractor<typeof core>,
      EventsExtractor<typeof events>,
      EventsExtractor<typeof users> {}
}
