export interface Patient {
  ID: string; // uniqueidentifier
  MaBN: string;
  Sovaovien: string;
  HoTen: string;
  NamSinh: string;
  arrivalTime: string; // ISO 8601 format
  PhongKham?: string; // Mã phòng khám
}

export interface Room {
  id: string;
  name: string;
  code: string; // Mã phòng khám
  description?: string;
  isActive: boolean;
}

// Biến toàn cục để lưu trữ danh sách bệnh nhân theo phòng khám
export let waitingPatientsByRoom: Record<string, Patient[]> = {};

// Biến toàn cục để lưu trữ bệnh nhân đang khám theo phòng khám
export let activePatientsByRoom: Record<string, Patient | null> = {};

// Biến toàn cục để lưu trữ thông tin phòng khám
export let rooms: Room[] = [
  {
    id: "1",
    name: "Khám nội",
    code: "KN",
    description: "Phòng khám nội khoa",
    isActive: true
  },
  {
    id: "2", 
    name: "Khám ngoại",
    code: "KNG",
    description: "Phòng khám ngoại khoa",
    isActive: true
  },
  {
    id: "3",
    name: "Khám nhi",
    code: "KNH",
    description: "Phòng khám nhi khoa", 
    isActive: true
  },
  {
    id: "4",
    name: "Khám mắt",
    code: "KM",
    description: "Phòng khám mắt",
    isActive: true
  }
];

// Hàm để gọi bệnh nhân tiếp theo
export function callNextPatient(roomCode: string, sovaovien?: string): Patient | null {
  const waitingPatients = waitingPatientsByRoom[roomCode] || [];
  
  if (waitingPatients.length === 0) {
    return null;
  }

  let nextPatient: Patient;
  
  if (sovaovien) {
    // Tìm bệnh nhân theo Sovaovien
    const patientIndex = waitingPatients.findIndex(p => p.Sovaovien === sovaovien);
    if (patientIndex === -1) {
      return null; // Không tìm thấy bệnh nhân
    }
    nextPatient = waitingPatients[patientIndex];
    // Xóa bệnh nhân khỏi danh sách chờ
    waitingPatientsByRoom[roomCode] = waitingPatients.filter((_, index) => index !== patientIndex);
  } else {
    // Lấy bệnh nhân đầu tiên trong danh sách
    nextPatient = waitingPatients[0];
    // Xóa bệnh nhân khỏi danh sách chờ
    waitingPatientsByRoom[roomCode] = waitingPatients.slice(1);
  }

  // Cập nhật bệnh nhân đang khám
  activePatientsByRoom[roomCode] = nextPatient;
  
  return nextPatient;
}

// Hàm để kết thúc khám bệnh nhân
export function finishExamination(roomCode: string): void {
  activePatientsByRoom[roomCode] = null;
} 