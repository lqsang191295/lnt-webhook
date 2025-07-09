import { trpcClient } from "@/trpc/client";
import DbCache from "./DbCache";

// Định nghĩa kiểu theo đúng dữ liệu trả về từ API
export type iNS_NhanVien = {
  TrangThai: boolean | null;
  GhiChu: string | null;
  Ten: string | null; // Tên nhân viên
  Ma: string; // Mã nhân viên
  Nhom: string | null;
  ChucVu: string | null;
};

export class NS_NhanVienService {
  private cache = new DbCache<iNS_NhanVien[]>();

  async get(): Promise<iNS_NhanVien[]> {
    return this.cache.getOrFetch(async () => {
      // Gọi tRPC và trả về đúng kiểu dữ liệu đã định nghĩa
      const data = await trpcClient.NS_NhanVien.getAll.query();

      // Có thể thêm filter hoặc sort nếu cần
      return data.map(
        (item): iNS_NhanVien => ({
          TrangThai: item.TrangThai ?? null,
          GhiChu: item.GhiChu ?? null,
          Ten: item.Ten ?? null,
          Ma: item.Ma,
          Nhom: item.Nhom ?? null,
          ChucVu: item.ChucVu ?? null,
        })
      );
    });
  }

  clear() {
    this.cache.clear();
  }
}
