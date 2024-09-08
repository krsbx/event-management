import { BlazeCreator } from '@busy-hour/blaze';
import { $onCreateUser } from './actions/$create.users';
import { $onUpdateUser } from './actions/$update.users';
import { $onDeleteUser } from './actions/$delete.users';
import { $onFindUser } from './actions/$find.users';
import { $onListUser } from './actions/$list.users';
import { onListUser } from './actions/list.users';

const service = BlazeCreator.service({
  name: 'users',
  tags: ['Users'],
  actions: {
    // Private
    $create: $onCreateUser,
    $update: $onUpdateUser,
    $delete: $onDeleteUser,
    $find: $onFindUser,
    $list: $onListUser,

    // Public
    list: onListUser,
  },
});

export default service;
