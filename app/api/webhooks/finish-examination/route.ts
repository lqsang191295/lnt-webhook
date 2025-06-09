import { NextResponse } from 'next/server';
import { activePatientsByRoom, finishExamination } from '@/types/patient';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { room = 'KN' } = body;

    // Kiểm tra xem có bệnh nhân đang khám không
    const activePatient = activePatientsByRoom[room];
    
    if (!activePatient) {
      return NextResponse.json(
        { 
          error: 'Không có bệnh nhân nào đang khám',
          room: room
        },
        { status: 404 }
      );
    }

    // Lưu thông tin bệnh nhân trước khi kết thúc
    const finishedPatient = {
      HoTen: activePatient.HoTen,
      NamSinh: activePatient.NamSinh,
      MaBN: activePatient.MaBN,
      Sovaovien: activePatient.Sovaovien,
      PhongKham: activePatient.PhongKham
    };

    // Kết thúc khám
    finishExamination(room);

    return NextResponse.json(
      {
        success: true,
        message: 'Đã kết thúc khám bệnh nhân',
        finishedPatient: finishedPatient,
        room: room,
        activePatient: null
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Lỗi kết thúc khám:', error);
    return NextResponse.json(
      { error: 'Lỗi xử lý yêu cầu' },
      { status: 500 }
    );
  }
} 