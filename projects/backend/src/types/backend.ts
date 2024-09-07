import { RecordUnknown } from '@busy-hour/blaze-types/helper';
import {
  QuerySelector as MongooseQuerySelector,
  Document as MongooseDocument,
  Types as MonggoseTypes,
} from 'mongoose';

export interface MigrationFile {
  up(): Promise<void>;
  down(): Promise<void>;
}

export type FilterQuery<T> = {
  [P in keyof T]?: MongooseQuerySelector<T[P]>;
} & {
  _id?: MongooseQuerySelector<MonggoseTypes.ObjectId>;
};

export type Document<T> = MongooseDocument<unknown, RecordUnknown, T> &
  T & {
    _id: MonggoseTypes.ObjectId;
  };

export type RestListResult<T> = {
  data: T[];
  page: {
    size: number;
    current: number;
    total: number;
  };
};
