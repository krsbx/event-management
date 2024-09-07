import { StateStorage } from "zustand/middleware";
import secureStorage from "react-secure-storage";

export const storage = {
  setItem(name, value) {
    secureStorage.setItem(name, value);
  },
  getItem(name) {
    return secureStorage.getItem(name) as never;
  },
  removeItem(name) {
    secureStorage.removeItem(name);
  },
} satisfies StateStorage;
