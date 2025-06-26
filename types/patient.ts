import { headers } from 'next/headers';

export interface Patient {
  ID: string; // Mã tiếp nhận bệnh nhân
  Hoten: string;
  Namsinh: string;
  STT?: number; // Số thứ tự
  IsActive?: boolean; // Trạng thái hoạt động
}

export interface Room {
  code: string;
  name: string;
  description?: string;
}

// Biến toàn cục để lưu trữ thông tin phòng khám
export let rooms: Room[] = [];
export function setRooms(newRooms: Room[]) {
  rooms = newRooms;
}
export async function GetRoomByCode(code: string): Promise<Room | null> {
  try {
    if (!rooms || rooms.length === 0) {
      const host = (await headers()).get('host');
      const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
      const response = await fetch(`${protocol}://${host}/api/waiting-patients`, {
        method: 'GET'
      })
      const data = await response.json();
      rooms = data.rooms;
    }
    return rooms.find(room => room.code === code) || null;;
  } catch (error) {
    console.error('Lỗi khi lấy thông tin phòng khám:', error);
    return null;
  }
}

export function formatToFourDigits(STT: number): string {
  return STT.toString().padStart(4, '0');
}

export interface iFileOfPatientData {
  "dateFolder": string,
  "files": iFilePatient[]
}

export interface iFilePatient {
  "filename": string,
  "dateFolder": string,
  "size": number,
  "createdAt": string,
  "url": string
}

export interface iPatientInfo {
  Ma: string;
  Ngay: string; 
  Hoten: string;
  HotenKoDau: string;
  Ngaysinh: number;
  Thangsinh: number;
  Namsinh: number;
  Dienthoai: string;
  Gioitinh: string;
  Email: string;
  Diachi: string;
  SoCMND: string;
  Doituong: string;
  Nghenghiep: string;
  Dantoc: string;
  Quoctich: string;
  Tinhquan: string;
  QuanHuyen: string;
  PhuongXa: string;
  TTHonnhan: string;
  STT: number;
  DaInthe: boolean;
  Ghichu: string;
  NguonGioithieu: string;
  LoaiNguonGT: string;
  NguoiGT: string;
  Nguoithan_Diachi: string;
  Nguoithan_Dienthoai: string;
  Nguoithan_Hoten: string;
  Nguoithan_Quanhe: string;
  Nguoithan_Namsinh: string;
  BenhMantinh: boolean;
  Benhnoitru: boolean;
  BNTuden: boolean;
  CTythanhtoan: string;
  DVDangky: string;
  HDDiachi: string;
  HDMasothue: string;
  HDTen: string;
  Loaithe: string;
  LoaitheTV: string;
  MaCTy: string;
  SoBHYT: string;
  BHYT_TN: boolean;
  ManoiDKBHYT: string;
  SoSeriBHXH: string;
  Masothuchien: string;
  MatheNV: string;
  Ngaykhamcu: string;
  Ngaykhamcuoi: string;
  NhanEmail: boolean;
  NhanSMS: boolean;
  Noilamviec: string;
  Password: string;
  SID: string;
  Sotaikhoan: string;
  Thanhtoanboi: string;
  ThanhtoanTen: string;
  TheKhuyenmai: boolean;
  TheTratruoc: boolean;
  Thuchien: boolean;
  Tiemnang: boolean;
  Tuvan: boolean;
  Ngaycapnhat: string;
  DaKichHoat: boolean;
  KhachKhoTinh: boolean;
  KhachVip: boolean;
  Ghichu_Khachhang: string;
  UPDATE_DATE: string;
  KhachCanhBao: boolean;
  SoKg: number;
  BN_NuocNgoai: string;
  TTChung: string;
  MaKhuVuc: string;
  HoTenVIP: string;
  MaVIP: string;
  NgayCapVIP: string;
  NgayHieuLuc: string;
  KichHoatVIP: boolean;
  IDMe: string;
  SoVaoVienMe: string;
  HoTenCha: string;
  SoBHXHCha: string;
  HoTenMe: string;
  SoBHXHMe: string;
  MaTheTam: string;
  NhomMau: string;
  ChieuCao: string;
  NgayCapCCCD: string;
  NoiCapCCCD: string;
}
