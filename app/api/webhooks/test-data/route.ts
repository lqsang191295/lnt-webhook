import { NextResponse } from 'next/server';
import { waitingPatientsByRoom } from '@/types/patient';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { room = 'KN' } = body;

    // Dữ liệu test mẫu
    const testPatients = [
      {
        MaBN: "BN001",
        Sovaovien: "SV001",
        HoTen: "Nguyễn Văn A",
        NamSinh: "1985"
      },
      {
        MaBN: "BN002", 
        Sovaovien: "SV002",
        HoTen: "Trần Thị B",
        NamSinh: "1990"
      },
      {
        MaBN: "BN003",
        Sovaovien: "SV003", 
        HoTen: "Lê Văn C",
        NamSinh: "1978"
      },
      {
        MaBN: "BN004",
        Sovaovien: "SV004",
        HoTen: "Phạm Thị D", 
        NamSinh: "1995"
      },
      {
        MaBN: "BN005",
        Sovaovien: "SV005",
        HoTen: "Hoàng Văn E",
        NamSinh: "1982"
      }
    ];

    // Thêm bệnh nhân test vào danh sách chờ
    if (!waitingPatientsByRoom[room]) {
      waitingPatientsByRoom[room] = [];
    }

    // Xóa dữ liệu cũ và thêm dữ liệu test mới
    waitingPatientsByRoom[room] = testPatients.map((patient, index) => ({
      ID: `test_${Date.now()}_${index}`,
      MaBN: patient.MaBN,
      Sovaovien: patient.Sovaovien,
      HoTen: patient.HoTen,
      NamSinh: patient.NamSinh,
      arrivalTime: new Date(Date.now() - index * 60000).toISOString(), // Mỗi bệnh nhân đến cách nhau 1 phút
      PhongKham: room
    }));

    return NextResponse.json(
      {
        success: true,
        message: 'Đã thêm dữ liệu test thành công',
        room: room,
        addedPatients: testPatients.length,
        totalWaiting: waitingPatientsByRoom[room].length,
        patients: waitingPatientsByRoom[room].map(p => ({
          HoTen: p.HoTen,
          MaBN: p.MaBN,
          Sovaovien: p.Sovaovien,
          NamSinh: p.NamSinh
        }))
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Lỗi thêm dữ liệu test:', error);
    return NextResponse.json(
      { error: 'Lỗi xử lý yêu cầu' },
      { status: 500 }
    );
  }
} 