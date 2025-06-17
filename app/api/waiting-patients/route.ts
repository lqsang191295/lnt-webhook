import { NextResponse } from 'next/server';
import { Patient, rooms, setRooms, GetRoomByCode } from '@/types/patient';
import { get } from "@/api/client";

export async function GET() {
  try {
    // lấy danh sách phòng khám
    const response = await get(`http://172.16.0.10:9001/his/get-HT_DMPhongBan`);
    if (!response || !response.data) {
      return NextResponse.json(
        { error: 'Không tìm thấy dữ liệu phòng khám' },
        { status: 404 }
      );
    }
    const data = response.data;
    if (!Array.isArray(data)) {
      return NextResponse.json(
        { error: 'Dữ liệu phải là một mảng' },
        { status: 400 }
      );
    } 
    setRooms(data.map(room => ({
      code: room.Ma,
      name: room.Ten,
      description: room.Diengiai,
    })));
    return NextResponse.json(
      { rooms, totalRooms: data.length },
      { status: 200 } )
  }catch (error) {
    console.error('Lỗi khi lấy danh sách phòng khám:', error);
    return NextResponse.json(
      { error: 'Lỗi khi lấy danh sách phòng khám' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const roomCode = await request.json();
    if (roomCode) {
      const today = new Date().toISOString().split('T')[0];
      const params = new URLSearchParams({
      where: `Phong='${roomCode}'&&(Trangthai='Đang_chờ'||Trangthai='Đang_khám')&&Ngay='${today}'`,
      select: 'ID, Trangthai, BV_QLyCapThe.Hoten, BV_QLyCapThe.Namsinh',
      limit: '50',
    });
    const baseUrl = 'http://172.16.0.10:9001/his/get-BV_TiepnhanBenh';
    const finalUrl = `${baseUrl}?${params.toString()}`;
    const response = await get(finalUrl);
    if (!response || !response.data) {
      return NextResponse.json(
        { error: 'Không tìm thấy dữ liệu bệnh nhân' },
        { status: 404 }
      );
    }
    const data = response.data;
     if (!Array.isArray(data)) {
      return NextResponse.json(
        { error: 'Dữ liệu phải là một mảng' },
        { status: 400 }
      );
    }

    // Nhóm bệnh nhân theo phòng khám
    const patientsByRoom: Record<string, Patient[]> = {};
    // Kiểm tra từng bệnh nhân trong mảng
    const filterData = data.filter(p => p.Trangthai !== 'Đang_khám');
    for (const patient of filterData) {
      const BV_QLyCapThe = patient.BV_QLyCapThe || {};
      BV_QLyCapThe.ID = patient.ID; // Mã tiếp nhận bệnh nhân
      // Kiểm tra các trường bắt buộc
      const requiredFields: (keyof Patient)[] = ['Hoten', 'Namsinh'];
      const missingFields = requiredFields.filter(field => !BV_QLyCapThe[field]);

      if (missingFields.length > 0) {
        return NextResponse.json(
          { 
            error: 'Thiếu các trường bắt buộc',
            missingFields 
          },
          { status: 400 }
        );
      }

      // Nhóm bệnh nhân theo phòng khám
      if (!patientsByRoom[roomCode]) {
        patientsByRoom[roomCode] = [];
      }
      patientsByRoom[roomCode].push(BV_QLyCapThe);
    }
      let patients = patientsByRoom[roomCode] || [];
      const activePatient = data.find(p => p.Trangthai === 'Đang_khám')?.BV_QLyCapThe || null;
      const room = await GetRoomByCode(roomCode);
      return NextResponse.json(
        { 
          room,
          activePatient: activePatient ? {
            HoTen: activePatient.Hoten,
            NamSinh: activePatient.Namsinh,
          } : null,
          patients,
          count: patients.length 
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error('Lỗi khi lấy danh sách bệnh nhân:', error);
    return NextResponse.json(
      { error: 'Lỗi khi lấy danh sách bệnh nhân' },
      { status: 500 }
    );
  }
} 