import { create } from "zustand";

enum eGuiZns {
  "GuiZns",
  "GuiZnsSuDungHashPhone",
  "GuiZnsSuDungDevMode",
}

type tGuiZns = {
  id: eGuiZns;
  name: string;
};

interface GuiZnsState {
  GuiZns: tGuiZns;
  setGuiZns: (model: tGuiZns) => void;
}

export const LIST_GuiZns: tGuiZns[] = [
  {
    id: eGuiZns.GuiZns,
    name: "Gửi ZNS",
  },
  {
    id: eGuiZns.GuiZnsSuDungHashPhone,
    name: "Gửi ZNS sử dụng hash phone",
  },
  {
    id: eGuiZns.GuiZnsSuDungDevMode,
    name: "Gửi ZNS sử dụng development mode",
  },
];

export const useGuiZnsStore = create<GuiZnsState>((set) => ({
  GuiZns: LIST_GuiZns[0],
  setGuiZns: (state) => set({ GuiZns: state }),
}));
