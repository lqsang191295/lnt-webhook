import { NextResponse } from 'next/server';
import { waitingPatientsByRoom, activePatientsByRoom, rooms } from '@/app/types/patient';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const roomCode = searchParams.get('room');

    if (roomCode) {
      // Lấy dữ liệu cho một phòng khám cụ thể
      const patients = waitingPatientsByRoom[roomCode] || [];
      const activePatient = activePatientsByRoom[roomCode] || null;
      const room = rooms.find(r => r.code === roomCode);
      
      return NextResponse.json(
        { 
          room,
          activePatient: activePatient ? {
            HoTen: activePatient.HoTen,
            NamSinh: activePatient.NamSinh,
            MaBN: activePatient.MaBN,
            Sovaovien: activePatient.Sovaovien
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
          HoTen: activePatientsByRoom[room.code]!.HoTen,
          NamSinh: activePatientsByRoom[room.code]!.NamSinh,
          MaBN: activePatientsByRoom[room.code]!.MaBN,
          Sovaovien: activePatientsByRoom[room.code]!.Sovaovien
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