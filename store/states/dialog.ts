import { create } from "zustand";

interface DialogCronJobState {
  open: boolean;
  mode: "add" | "edit"; // Xác định chế độ
  data: any; // Dữ liệu của hàng được chỉnh sửa
  openDialog: (mode: "add" | "edit", data?: any) => void;
  closeDialog: () => void;
}

export const useDialogStore = create<DialogCronJobState>((set) => ({
  open: false,
  mode: "add",
  data: null,
  openDialog: (mode, data = null) => set({ open: true, mode, data }),
  closeDialog: () => set({ open: false, data: null, mode: "add" }),
}));
