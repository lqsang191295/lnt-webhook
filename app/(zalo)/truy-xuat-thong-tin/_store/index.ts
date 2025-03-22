import { create } from "zustand";

export enum eTab {
  "lttttzns",
  "lttquota",
  "lttlndznsdpg",
  "ldstl",
}

type tTab = {
  id: eTab;
  name: string;
};

interface TruyXuatThongTinState {
  tab: tTab;
  setTab: (model: tTab) => void;
}

export const LIST_TAB: tTab[] = [
  {
    id: eTab.lttttzns,
    name: "Lấy thông tin trạng thái ZNS",
  },
  {
    id: eTab.lttquota,
    name: "Lấy thông tin quota ZNS",
  },
  {
    id: eTab.lttlndznsdpg,
    name: "Lấy thông tin loại nội dung ZNS được phép gửi",
  },
  {
    id: eTab.ldstl,
    name: "Lấy danh sách template",
  },
];

export const useTruyXuatThongTinStore = create<TruyXuatThongTinState>(
  (set) => ({
    tab: LIST_TAB[0],
    setTab: (state) => set({ tab: state }),
  })
);
