import { HT_DMPhongBanRouter } from "./routers/HT_DMPhongBan";
import { BV_MasterRouter } from "./routers/BV_Master";
import { BV_PhieuChidinhDVRouter } from "./routers/BV_PhieuChidinhDV";
import { BV_ToathuocRouter } from "./routers/BV_Toathuoc";
import { NS_NhanVienRouter } from "./routers/NS_NhanVien";
import { BV_QLyCapTheRouter } from "./routers/BV_QLyCapThe";
import { HsbaRouter } from "./routers/hsba";
import { router } from "./trpc";

export const rootRouter = router({
  HT_DMPhongBan: HT_DMPhongBanRouter,
  BV_Master: BV_MasterRouter,
  BV_PhieuChidinhDV: BV_PhieuChidinhDVRouter,
  BV_Toathuoc: BV_ToathuocRouter,
  BV_QlyCapThe: BV_QLyCapTheRouter,
  NS_NhanVien: NS_NhanVienRouter,
  Hsba: HsbaRouter,
});

export type RootRouter = typeof rootRouter;
