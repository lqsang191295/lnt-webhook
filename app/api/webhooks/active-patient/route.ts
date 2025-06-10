import { NextResponse } from 'next/server';
import { callNextPatient, waitingPatientsByRoom } from '@/types/patient';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { MaBN, Sovaovien, room = 'KN' } = body;

    // Kiểm tra các tham số bắt buộc
    if (!MaBN || !Sovaovien) {
      return NextResponse.json(
        { 
          error: 'Thiếu tham số bắt buộc',
          required: ['MaBN', 'Sovaovien'],
          received: { MaBN, Sovaovien }
        },
        { status: 400 }
      );
    }

    // Kiểm tra xem bệnh nhân có tồn tại trong danh sách chờ không
    const waitingPatients = waitingPatientsByRoom[room] || [];
    const patientExists = waitingPatients.some(p => p.MaBN === MaBN && p.Sovaovien === Sovaovien);

    if (!patientExists) {
      return NextResponse.json(
        { 
          error: 'Bệnh nhân không tồn tại trong danh sách chờ',
          patient: { MaBN, Sovaovien },
          room: room,
          waitingCount: waitingPatients.length
        },
        { status: 404 }
      );
    }

    // Gọi bệnh nhân tiếp theo với Sovaovien cụ thể
    const activePatient = callNextPatient(room, Sovaovien);

    if (!activePatient) {
      return NextResponse.json(
        { 
          error: 'Không thể gọi bệnh nhân',
          patient: { MaBN, Sovaovien },
          room: room
        },
        { status: 500 }
      );
    }

    // Trả về thông tin bệnh nhân đang khám
    return NextResponse.json(
      {
        success: true,
        message: 'Bệnh nhân đã được gọi thành công',
        activePatient: {
          HoTen: activePatient.HoTen,
          NamSinh: activePatient.NamSinh,
          MaBN: activePatient.MaBN,
          Sovaovien: activePatient.Sovaovien,
          PhongKham: activePatient.PhongKham
        },
        room: room,
        remainingPatients: waitingPatientsByRoom[room]?.length || 0
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Lỗi xử lý webhook active patient:', error);
    return NextResponse.json(
      { error: 'Lỗi xử lý yêu cầu' },
      { status: 500 }
    );
  }
} 