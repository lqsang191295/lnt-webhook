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

// Biến toàn cục để lưu trữ thông tin phòng khám
export let rooms: Room[] = [
  {
    id: "3",
    name: "KHÁM NỘI",
    code: "03",
    description: "Phòng khám nội khoa"
  },
  {
    id: "4", 
    name: "KHÁM NGOẠI",
    code: "04",
    description: "Phòng khám ngoại khoa"
  },
  {
    id: "2",
    name: "KHÁM TAI MŨI HỌNG",
    code: "02",
    description: "Phòng khám tai mũi họng"
  },
  {
    id: "5",
    name: "KHÁM MẮT",
    code: "05",
    description: "Phòng khám mắt"
  },
    {
    id: "6",
    name: "KHÁM RĂNG HÀM MẶT",
    code: "06",
    description: "Phòng khám răng hàm mặt"
  },
  {
    id: "10",
    name: "KHÁM NHI",
    code: "10",
    description: "Phòng khám nhi khoa"
  },
  {
    id: "7",
    name: "KHÁM SẢN",
    code: "07",
    description: "Phòng khám sản"
  },
  {
    id: "8",
    name: "KHÁM PHỤ KHOA",
    code: "08",
    description: "Phòng khám phụ khoa"
  },
  {
    id: "9",
    name: "KHÁM DA LIỄU",
    code: "09",
    description: "Phòng khám da liễu"
  },
  {
    id: "12",
    name: "THẬN NHÂN TẠO",
    code: "12",
    description: "thận nhân tạo"
  },
  {
    id: "16",
    name: "KHÁM NGOẠI TRÚ CAMPUCHIA",
    code: "16",
    description: "Phòng khám ngoại trú campuchia"
  },
  {
    id: "17",
    name: "VẬT LÝ TRỊ LIỆU",
    code: "17",
    description: "Phòng khám vật lý trị liệu"
  },
  {
    id: "18",
    name: "KHÁM THẨM MỸ",
    code: "15",
    description: "Phòng khám thẩm mỹ"
  },
  {
    id: "19",
    name: "KHÁM PHỤ KHOA (CÓ HÌNH)",
    code: "19",
    description: "Phòng khám phụ khoa (có hình)"
  },
  {
    id: "20",
    name: "PHÒNG SƠ CỨU (NGOẠI TRÚ)",
    code: "05",
    description: "Phòng sơ cứu (ngoại trú)"
  },
  {
    id: "21",
    name: "PHÒNG KHÁM KHOA NỘI",
    code: "21",
    description: "Phòng khám khoa nội"
  },
  {
    id: "22",
    name: "PHÒNG KHÁM KHOA NGOẠI",
    code: "22",
    description: "Phòng khám khoa ngoại"
  },
  {
    id: "23",
    name: "PHÒNG KHÁM KHOA NHI",
    code: "23",
    description: "Phòng khám khoa nhi"
  },
  {
    id: "26",
    name: "ĐK XÉT NGHIỆM",
    code: "26",
    description: "Đăng ký xét nghiệm"
  }
];
