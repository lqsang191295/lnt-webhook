// services/DbService.ts

import { trpcClient } from "@/trpc/client";
import DbCache from "./DbCache";

type NS_NhanVien = {
  maNV: string;
  hoTen: string;
  // các trường khác nếu có
};

export class NS_NhanVienService {
  private cache = new DbCache<NS_NhanVien[]>();

  async get(): Promise<NS_NhanVien[]> {
    return this.cache.getOrFetch(async () => {
      const data = await trpcClient.NS_NhanVien.getAll.query(); // 👈 gọi tRPC
      return data;
    });
  }

  clear() {
    this.cache.clear();
  }
}
