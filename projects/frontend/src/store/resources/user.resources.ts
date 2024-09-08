import { create } from "zustand";
import { IUser, ResourceStore } from "../../types/api";
import { uniqBy } from "lodash-es";

export type UserStore = ResourceStore<IUser>;

export const useUserStore = create<UserStore>((set, get) => ({
  isLoading: false,
  setIsLoading(status) {
    const value =
      typeof status === "function" ? status(get().isLoading) : status;

    set({ isLoading: value });
  },
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
  setInformation(info) {
    const value = typeof info === "function" ? info(get().page) : info;

    set({ page: value });
  },
  data: [],
  page: {
    current: 0,
    size: 0,
    total: 0,
  },
}));
