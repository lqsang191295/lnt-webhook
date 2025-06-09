import { create } from "zustand";

type tZaloTemplate = {
  templateId: number;
  templateName: string;
  createdTime: number;
  status: string;
  templateQuality: string;
};

interface ZaloDataState {
  dsTemplate: tZaloTemplate[];
  access_token: string;
  refresh_token: string;
  setAccessToken: (access_token: string) => void;
  setRefreshToken: (refresh_token: string) => void;
  setDsTempalte: (dsTemplate: tZaloTemplate[]) => void;
}

export const useZaloData = create<ZaloDataState>((set) => ({
  dsTemplate: [],
  access_token: "",
  refresh_token: "",
  setAccessToken: (access_token) => set({ access_token }),
  setRefreshToken: (refresh_token) => set({ refresh_token }),
  setDsTempalte: (dsTemplate) => set({ dsTemplate }),
}));
