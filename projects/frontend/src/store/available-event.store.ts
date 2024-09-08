import { create } from "zustand";
import { IAvailableEvent, RestListResponse } from "../types/api";
import { uniqBy } from "lodash-es";

export interface AvailableEventStore extends RestListResponse<IAvailableEvent> {
  isFetched: boolean;
  setIsFetched: (status: boolean | ((prev: boolean) => boolean)) => void;
  addData: (resources: IAvailableEvent | IAvailableEvent[]) => void;
  updateData: (
    id: string,
    resource: IAvailableEvent | Partial<IAvailableEvent>,
  ) => void;
  removeData: (id: string | string[]) => void;
  setData: (
    resources:
      | IAvailableEvent[]
      | ((prev: IAvailableEvent[]) => IAvailableEvent[]),
  ) => void;
}

export const AvailableEventStore = create<AvailableEventStore>((set, get) => ({
  isFetched: false,
  setIsFetched(status) {
    const value =
      typeof status === "function" ? status(get().isFetched) : status;

    set({ isFetched: value });
  },
  addData(resources) {
    const value = [resources].flat(1);

    set((state) => ({ data: uniqBy([...state.data, ...value], "id") }));
  },
  updateData(id, resource) {
    const index = get().data.findIndex((data) => data._id === id);

    if (index === -1) return;

    const current = get().data[index];

    set((state) => ({
      data: [
        ...state.data.slice(0, index),
        { ...current, ...resource },
        ...state.data.slice(index + 1),
      ],
    }));
  },
  removeData(id) {
    const ids = [id].flat(1);

    set((state) => ({
      data: state.data.filter((data) => !ids.includes(data._id)),
    }));
  },
  setData(resources) {
    const value =
      typeof resources === "function" ? resources(get().data) : resources;

    set({ data: value });
  },
  data: [],
  page: {
    current: 0,
    size: 0,
    total: 0,
  },
}));
