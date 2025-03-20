import { create } from "zustand";

interface DialogState {
  open: boolean;
  mode: "add" | "edit"; // Xác định chế độ
  data: Record<string, unknown> | null; // Dữ liệu của hàng được chỉnh sửa
  openDialog: (mode: "add" | "edit", data?: Record<string, unknown>) => void;
  closeDialog: () => void;
  setData: (d: Record<string, unknown>) => void;
}

export const useDialogStore = create<DialogState>((set) => ({
  open: false,
  mode: "add",
  data: null,
  openDialog: (mode, data) => set({ open: true, mode, data }),
  closeDialog: () => set({ open: false, data: null, mode: "add" }),
  setData: (newData: Record<string, unknown>) =>
    set((state) => ({
      data: state.data ? { ...state.data, ...newData } : newData,
    })),
}));
