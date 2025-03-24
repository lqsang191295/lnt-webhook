import { create } from "zustand";

interface ComboboxState {
  open: boolean;
  setOpen: (v: boolean) => void;
  selectedValue: Record<string, unknown> | null;
  setSelectedValue: (s: Record<string, unknown>) => void;
}

export const useComboboxStore = create<ComboboxState>((set) => ({
  open: false,
  setOpen: (v) => set(() => ({ open: v })),
  selectedValue: null,
  setSelectedValue: (s: Record<string, unknown>) =>
    set(() => ({ selectedValue: s })),
}));
