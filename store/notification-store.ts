import { create } from "zustand";

interface NotificationState {
  open: boolean;
  setOpen: (v: boolean) => void;
  selectedValue: Record<string, unknown> | null;
  setSelectedValue: (s: Record<string, unknown>) => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  open: false,
  setOpen: (v) => set(() => ({ open: v })),
  selectedValue: null,
  setSelectedValue: (s: Record<string, unknown>) =>
    set(() => ({ selectedValue: s })),
}));
