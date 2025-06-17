export interface iClsData {
    MaBN: string;
    TrangThaiKham: string | null;
    Hoten: string;
    Namsinh: number;
}

export interface iClsGroupData {
    STT: number;
    MaBN: string;
    TrangThaiKham: string | null;
    Hoten: string;
    Namsinh: number;
}

export interface iRoom {
  code: string;
  name: string;
  roomId?: string;
  nhom: string;
}