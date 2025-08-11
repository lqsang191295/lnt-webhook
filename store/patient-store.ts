import { create } from "zustand";

export type tPatient = {
  phone: number | null;
  logged: boolean;
  maBN: string;
};

interface PatientState {
  patient: tPatient | null;
  setData: (patient: tPatient) => void;
}

const usePatientStore = create<PatientState>((set) => ({
  patient: null,

  setData: (patient) => {
    set({ patient });
  },
}));

export { usePatientStore };
