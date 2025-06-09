import { NextResponse } from 'next/server';
import { waitingPatientsByRoom, Patient } from '@/app/types/patient';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { patients, room = 'KN' } = body;

    // Kiểm tra dữ liệu đầu vào
    if (!patients || !Array.isArray(patients)) {
      return NextResponse.json(
        { 
          error: 'Dữ liệu không hợp lệ',
          required: 'patients (array)',
          received: typeof patients
        },
        { status: 400 }
      );
    }

    // Validate từng bệnh nhân
    const validPatients: Patient[] = [];
    const errors: string[] = [];

    for (let i = 0; i < patients.length; i++) {
      const patient = patients[i];
      
      // Kiểm tra các trường bắt buộc
      if (!patient.MaBN || !patient.Sovaovien || !patient.HoTen || !patient.NamSinh) {
        errors.push(`Bệnh nhân ${i + 1}: Thiếu thông tin bắt buộc (MaBN, Sovaovien, HoTen, NamSinh)`);
        continue;
      }

      // Tạo đối tượng Patient hợp lệ
      const validPatient: Patient = {
        ID: patient.ID || `patient_${Date.now()}_${i}`,
        MaBN: patient.MaBN,
        Sovaovien: patient.Sovaovien,
        HoTen: patient.HoTen,
        NamSinh: patient.NamSinh,
        arrivalTime: patient.arrivalTime || new Date().toISOString(),
        PhongKham: room
      };

      validPatients.push(validPatient);
    }

    // Nếu có lỗi validation, trả về lỗi
    if (errors.length > 0) {
      return NextResponse.json(
        { 
          error: 'Dữ liệu bệnh nhân không hợp lệ',
          details: errors,
          validCount: validPatients.length,
          totalCount: patients.length
        },
        { status: 400 }
      );
    }

    // Thêm bệnh nhân vào danh sách chờ
    if (!waitingPatientsByRoom[room]) {
      waitingPatientsByRoom[room] = [];
    }

    // Kiểm tra trùng lặp
    const existingPatients = waitingPatientsByRoom[room];
    const newPatients: Patient[] = [];
    const duplicates: string[] = [];

    for (const patient of validPatients) {
      const isDuplicate = existingPatients.some(
        existing => existing.MaBN === patient.MaBN && existing.Sovaovien === patient.Sovaovien
      );
      
      if (isDuplicate) {
        duplicates.push(`${patient.HoTen} (${patient.MaBN})`);
      } else {
        newPatients.push(patient);
      }
    }

    // Thêm bệnh nhân mới vào danh sách
    waitingPatientsByRoom[room] = [...existingPatients, ...newPatients];

    // Trả về kết quả
    return NextResponse.json(
      {
        success: true,
        message: 'Cập nhật danh sách bệnh nhân thành công',
        room: room,
        added: newPatients.length,
        duplicates: duplicates.length,
        totalWaiting: waitingPatientsByRoom[room].length,
        details: {
          newPatients: newPatients.map(p => ({ HoTen: p.HoTen, MaBN: p.MaBN, Sovaovien: p.Sovaovien })),
          duplicates: duplicates
        }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Lỗi xử lý webhook patients:', error);
    return NextResponse.json(
      { error: 'Lỗi xử lý yêu cầu' },
      { status: 500 }
    );
  }
} 