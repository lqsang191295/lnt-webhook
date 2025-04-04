import { create } from "zustand";

export type tUser = {
  username: string;
  userId: number;
  roles: string[];
};

interface UserState {
  user: tUser | null;
  setUser: (user: tUser) => void;
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user: tUser) => set({ user }),
}));

export { useUserStore };
