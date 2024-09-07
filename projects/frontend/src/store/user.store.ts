import { create } from "zustand";
import { createJSONStorage, persist, devtools } from "zustand/middleware";
import { storage } from "../utils/storage.utils";

export const useUserStore = create(
  devtools(
    persist((set, get) => ({}), {
      name: "user",
      storage: createJSONStorage(() => storage),
    }),
    {
      enabled: true,
      store: "user",
      name: "user",
    },
  ),
);
