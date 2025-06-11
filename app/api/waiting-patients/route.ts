import { NextResponse } from 'next/server';
import { Patient, waitingPatientsByRoom, activePatientsByRoom, rooms , callNextPatient} from '@/types/patient';
import { get } from "@/api/client";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const roomCode = body.roomCode as string;
    const params = new URLSearchParams({
      where: `MaBankham='${roomCode}'`,
      select: 'ID, BV_QLyCapThe.Hoten, BV_QLyCapThe.Namsinh',
      limit: '4',
    });
    const baseUrl = 'http://172.16.0.10:5100/his/get-BV_TiepnhanBenh';
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
    for (const patient of data) {
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
    // Cập nhật danh sách bệnh nhân theo phòng khám
    Object.assign(waitingPatientsByRoom, patientsByRoom);
    if (roomCode) {
      // Lấy dữ liệu cho một phòng khám cụ thể
      let patients = waitingPatientsByRoom[roomCode] || [];
      const activePatient = callNextPatient(roomCode, body.ID);
      if (activePatient) {
        patients = patients.filter(x => x !== activePatient); }
      const room = rooms.find(r => r.code === roomCode);
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
    } else {
      // Lấy dữ liệu cho tất cả phòng khám
      const allRooms = rooms.map(room => ({
        ...room,
        patients: waitingPatientsByRoom[room.code] || [],
        activePatient: activePatientsByRoom[room.code] ? {
          HoTen: activePatientsByRoom[room.code]!.Hoten,
          NamSinh: activePatientsByRoom[room.code]!.Namsinh,
        } : null,
        count: (waitingPatientsByRoom[room.code] || []).length
      }));

      const totalPatients = Object.values(waitingPatientsByRoom).reduce(
        (total, patients) => total + patients.length, 
        0
      );

      const totalActivePatients = Object.values(activePatientsByRoom).filter(p => p !== null).length;

      return NextResponse.json(
        { 
          rooms: allRooms,
          totalPatients,
          totalActivePatients,
          totalRooms: rooms.length
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