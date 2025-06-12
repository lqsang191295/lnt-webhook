export interface Patient {
  ID: string; // Mã tiếp nhận bệnh nhân
  Hoten: string;
  Namsinh: string;
  PhongKham?: string; // Mã phòng khám
}

export interface Room {
  id: string;
  name: string;
  code: string; // Mã phòng khám
  description?: string;
}

// Biến toàn cục để lưu trữ danh sách bệnh nhân theo phòng khám
export let waitingPatientsByRoom: Record<string, Patient[]> = {};

// Biến toàn cục để lưu trữ bệnh nhân đang khám theo phòng khám
export let activePatientsByRoom: Record<string, Patient | null> = {};

// Biến toàn cục để lưu trữ thông tin phòng khám
export let rooms: Room[] = [
  {
    id: "3",
    name: "Khám nội",
    code: "03",
    description: "Phòng khám nội khoa"
  },
  {
    id: "4", 
    name: "Khám ngoại",
    code: "04",
    description: "Phòng khám ngoại khoa"
  },
  {
    id: "10",
    name: "Khám nhi",
    code: "10",
    description: "Phòng khám nhi khoa"
  },
  {
    id: "5",
    name: "Khám mắt",
    code: "05",
    description: "Phòng khám mắt"
  },
  {
    id: "2",
    name: "Khám tai mũi họng",
    code: "02",
    description: "Phòng khám tai mũi họng"
  },
  {
    id: "6",
    name: "Khám răng hàm mặt",
    code: "06",
    description: "Phòng khám răng hàm mặt"
  },
  {
    id: "7",
    name: "Khám sản",
    code: "07",
    description: "Phòng khám sản"
  },
  {
    id: "8",
    name: "Khám phụ khoa",
    code: "08",
    description: "Phòng khám phụ khoa"
  },
  {
    id: "9",
    name: "Khám da liễu",
    code: "09",
    description: "Phòng khám da liễu"
  },
  {
    id: "12",
    name: "thận nhân tạo",
    code: "12",
    description: "thận nhân tạo"
  },
  {
    id: "16",
    name: "Khám ngoại trú campuchia",
    code: "16",
    description: "Phòng khám ngoại trú campuchia"
  },
  {
    id: "17",
    name: "Vật lý trị liệu",
    code: "17",
    description: "Phòng khám vật lý trị liệu"
  },
  {
    id: "18",
    name: "Khám thẩm mỹ",
    code: "15",
    description: "Phòng khám thẩm mỹ"
  },
  {
    id: "19",
    name: "Khám phụ khoa (có hình)",
    code: "19",
    description: "Phòng khám phụ khoa (có hình)"
  },
  {
    id: "20",
    name: "phòng sơ cứu (ngoại trú)",
    code: "05",
    description: "Phòng khám mắt"
  },
  {
    id: "21",
    name: "Phòng khám khoa nội",
    code: "21",
    description: "Phòng khám khoa nội"
  },
  {
    id: "22",
    name: "Phòng khám khoa ngoại",
    code: "22",
    description: "Phòng khám khoa ngoại"
  },
  {
    id: "23",
    name: "Phòng khám khoa nhi",
    code: "23",
    description: "Phòng khám khoa nhi"
  },
  {
    id: "26",
    name: "ĐK xét nghiệm",
    code: "26",
    description: "Đăng ký xét nghiệm"
  }
];

// Hàm để gọi bệnh nhân tiếp theo
export function callNextPatient(roomCode: string, ID?: string): Patient | null {
  const waitingPatients = waitingPatientsByRoom[roomCode] || [];
  
  if (waitingPatients.length === 0) {
    return null;
  }

  let nextPatient: Patient;
  
  if (ID) {
    // Tìm bệnh nhân theo Sovaovien
    const patientIndex = waitingPatients.findIndex(p => p.ID === ID);
    if (patientIndex === -1) {
      return null; // Không tìm thấy bệnh nhân
    }
    nextPatient = waitingPatients[patientIndex];
    // Xóa bệnh nhân khỏi danh sách chờ
    activePatientsByRoom[roomCode] = nextPatient;
    // waitingPatientsByRoom[roomCode] = waitingPatients.filter(p => p !== nextPatient);
    // Cập nhật bệnh nhân đang khám

      return nextPatient;
    } 
    return null; // Không có bệnh nhân nào trong danh sách chờ

}

// Hàm để kết thúc khám bệnh nhân
export function finishExamination(roomCode: string): void {
  activePatientsByRoom[roomCode] = null;
} 