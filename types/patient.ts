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