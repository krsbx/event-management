import { create } from "zustand";
import { createJSONStorage, persist, devtools } from "zustand/middleware";
import { storage } from "../utils/storage.utils";
import { UserRoles } from "../utils/constants/services.constants";
import { IUser } from "../types/api";

const initialState = {
  _id: "",
  username: "",
  companyName: "",
  role: UserRoles.HUMAN_RESOURCE,
  createdAt: "",
  updatedAt: "",
} satisfies IUser;

export interface AuthStore {
  user: IUser;
  setUser: (user: IUser | ((prev: IUser) => IUser)) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (status: boolean | ((prev: boolean) => boolean)) => void;
  token: string;
  setToken: (token: string) => void;
  reset: () => void;
}

export const useAuthStore = create(
  devtools(
    persist<AuthStore>(
      (set, get) => ({
        user: initialState,
        setUser(user) {
          const value =
            typeof user === "function" ? user({ ...get().user }) : user;

          set({ user: value });
        },
        isAuthenticated: false,
        setIsAuthenticated(status) {
          const value =
            typeof status === "function"
              ? status(get().isAuthenticated)
              : status;

          set({ isAuthenticated: value });
        },
        token: "",
        setToken(token) {
          set({ token });
        },
        reset() {
          set({ user: initialState, isAuthenticated: false, token: "" });
        },
      }),
      {
        name: "user",
        storage: createJSONStorage(() => storage),
      },
    ),
    {
      enabled: true,
      store: "user",
      name: "user",
    },
  ),
);
