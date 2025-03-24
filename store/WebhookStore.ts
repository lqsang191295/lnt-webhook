import { create } from "zustand";

enum eWebhook {
  "dstl",
}

type tWebhook = {
  id: eWebhook;
  name: string;
};

interface WebhookState {
  webhook: tWebhook;
  setWebhook: (model: tWebhook) => void;
}

export const LIST_WEBHOOK: tWebhook[] = [
  {
    id: eWebhook.dstl,
    name: "Danh sách template",
  },
];

export const useWebhookStore = create<WebhookState>((set) => ({
  webhook: LIST_WEBHOOK[0],
  setWebhook: (state) => set({ webhook: state }),
}));
