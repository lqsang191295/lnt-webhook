import { HT_DMPhongBanRouter } from "./routers/HT_DMPhongBan";
import { BV_MasterRouter } from "./routers/BV_Master";
import { BV_PhieuChidinhDVRouter } from "./routers/BV_PhieuChidinhDV";
import { BV_ToathuocRouter } from "./routers/BV_Toathuoc";
import { NS_NhanVienRouter } from "./routers/NS_NhanVien";
import { router } from "./trpc";

export const rootRouter = router({
  HT_DMPhongBan: HT_DMPhongBanRouter,
  BV_Master: BV_MasterRouter,
  BV_PhieuChidinhDV: BV_PhieuChidinhDVRouter,
  BV_Toathuoc: BV_ToathuocRouter,
  NS_NhanVien: NS_NhanVienRouter,
});

export type RootRouter = typeof rootRouter;
