import { create } from "zustand";

export enum eTab {
  "GuiZns",
  "GuiZnsSuDungHashPhone",
  "GuiZnsSuDungDevMode",
  "GuiZnsMaHoaRsa",
  "GuiZnsJourney",
}

type tTab = {
  id: eTab;
  name: string;
};

interface TabState {
  tab: tTab;
  setTab: (model: tTab) => void;
}

export const LIST_TAB: tTab[] = [
  {
    id: eTab.GuiZns,
    name: "Gửi ZNS",
  },
  {
    id: eTab.GuiZnsSuDungHashPhone,
    name: "Gửi ZNS sử dụng hash phone",
  },
  {
    id: eTab.GuiZnsSuDungDevMode,
    name: "Gửi ZNS sử dụng development mode",
  },
  {
    id: eTab.GuiZnsMaHoaRsa,
    name: "Gửi ZNS với hệ mã hóa RSA",
  },
  {
    id: eTab.GuiZnsJourney,
    name: "Gửi ZNS Journey",
  },
];

export const useGuiZnsStore = create<TabState>((set) => ({
  tab: LIST_TAB[0],
  setTab: (state) => set({ tab: state }),
}));
