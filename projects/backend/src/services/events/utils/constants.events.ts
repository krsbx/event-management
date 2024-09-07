import { Random } from '@busy-hour/blaze-types/helper';
import { IEvent } from '../interfaces/event.events';
import { Document } from '../../../types/backend';

export const metaEvent = {
  event: null as Document<IEvent> | null,
};

export type MetaEvent = typeof metaEvent & Record<string, Random>;
