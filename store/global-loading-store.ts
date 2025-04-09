import { create } from "zustand";

interface GlobalLoadingState {
  loading: boolean;
  setLoading: (state: boolean) => void;
}

export const useGlobalLoadingStore = create<GlobalLoadingState>((set) => ({
  loading: false,
  setLoading: (state) => set({ loading: state }),
}));
