export interface iPhieuChidinhDVCT {
    ID: string;
    MaDV: string;
    TenDV: string;
    Ngay: string; // hoặc Date nếu bạn xử lý kiểu ngày
    Dathuchien: boolean;
}

export interface iPhieuChidinhDV {
    ID: string;
    MaBN: string;
    MaDV: string | null;
    BsKham: string;
    Ngay: string;
    KhoaPhong: string;
    Chandoan: string;
    Khoa: string;
    Ghichu: string | null;
    TenBsKham: string;
    TenKhoa: string;
    phieuDVCT: iPhieuChidinhDVCT[];
}

export interface iToaThuocCT {
  ID: string;
  Ngay: string; // ISO format date string
  Ma: string;
  Ten: string;
  Hoatchat: string | null;
  Hamluong: string | null;
  Dongia: number;
  DongiaBH: number;
  Soluong: number;
  Donvi: string;
  SLSang: string | null;
  SLTrua: string | null;
  SLChieu: string | null;
  SLToi: string | null;
  Ghichu: string;
}

export interface iToaThuoc {
  ID: string;
  Ngay: string; // ISO format date string
  MaBN: string;
  Khoa: string;
  BsKetoa: string;
  Doituong: string;
  Ghichu: string;
  Ketluan: string | null;
  toaThuocCT: iToaThuocCT[];
  TenBsKeToa: string;
  TenKhoa: string;
}
