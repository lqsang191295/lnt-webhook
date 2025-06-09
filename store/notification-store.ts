import { create } from "zustand";

interface iNotificationData {
  id: number;
  title: string;
  description: string;
  readed: boolean;
  created_at: Date;
}

interface NotificationState {
  data: iNotificationData[];
  setData: (item: iNotificationData | iNotificationData[]) => void;
  markAsRead: (id: number) => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  data: [],
  setData: (item) =>
    set((state) => ({
      data: Array.isArray(item)
        ? [...item, ...state.data] // nếu item là array
        : [item, ...state.data], // nếu item là 1 object
    })),
  markAsRead: (id) =>
    set((state) => ({
      data: state.data.map((item) =>
        item.id === id ? { ...item, readed: true } : item
      ),
    })),
}));
