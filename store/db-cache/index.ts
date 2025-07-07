import { NS_NhanVienService } from "./NS_NhanVien";

class DbService {
  public NS_NhanVien = new NS_NhanVienService();
}

export const dbService = new DbService();
