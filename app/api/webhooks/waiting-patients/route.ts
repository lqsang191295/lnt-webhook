import { NextResponse } from 'next/server';
import { Patient, waitingPatientsByRoom } from '@/types/patient';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log('Dữ liệu nhận được từ webhook:', data);
    // Kiểm tra xem dữ liệu có phải là mảng không
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
      // Kiểm tra các trường bắt buộc
      const requiredFields: (keyof Patient)[] = ['Hoten', 'Namsinh'];
      const missingFields = requiredFields.filter(field => !patient[field]);

      if (missingFields.length > 0) {
        return NextResponse.json(
          { 
            error: 'Thiếu các trường bắt buộc',
            missingFields 
          },
          { status: 400 }
        );
      }

      // Kiểm tra định dạng arrivalTime (ISO 8601)
      try {
        new Date(patient.arrivalTime);
      } catch {
        return NextResponse.json(
          { error: 'Định dạng thời gian không hợp lệ (phải là ISO 8601)' },
          { status: 400 }
        );
      }

      // Nhóm bệnh nhân theo phòng khám
      const roomCode = patient.PhongKham || ''; // Mặc định là Khám nội nếu không có
      if (!patientsByRoom[roomCode]) {
        patientsByRoom[roomCode] = [];
      }
      patientsByRoom[roomCode].push(patient);
    }

    // Cập nhật danh sách bệnh nhân theo phòng khám
    Object.assign(waitingPatientsByRoom, patientsByRoom);

    const totalPatients = data.length;
    const roomCount = Object.keys(patientsByRoom).length;

    return NextResponse.json(
      { 
        message: 'Cập nhật danh sách bệnh nhân thành công',
        count: totalPatients,
        rooms: roomCount,
        patientsByRoom: Object.keys(patientsByRoom).map(room => ({
          room,
          count: patientsByRoom[room].length
        }))
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Lỗi xử lý webhook:', error);
    return NextResponse.json(
      { error: 'Lỗi xử lý dữ liệu' },
      { status: 400 }
    );
  }
} 