import { BlazeCreator } from '@busy-hour/blaze';
import { $onCreateEvent } from './actions/$create.events';
import { $onUpdateEvent } from './actions/$update.events';
import { $onDeleteEvent } from './actions/$delete.events';
import { $onFindEvent } from './actions/$find.events';
import { $onListEvent } from './actions/$list.events';
import { onListEvent } from './actions/list.events';

const service = BlazeCreator.service({
  name: 'available-events',
  tags: ['Available Events'],
  actions: {
    // Private
    $create: $onCreateEvent,
    $update: $onUpdateEvent,
    $delete: $onDeleteEvent,
    $find: $onFindEvent,
    $list: $onListEvent,

    // Public
    list: onListEvent,
  },
});

export default service;
