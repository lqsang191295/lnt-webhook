import { HT_DMPhongBanRouter } from './routers/HT_DMPhongBan';
import { BV_MasterRouter } from './routers/BV_Master';
import { BV_PhieuChidinhDVRouter } from './routers/BV_PhieuChidinhDV';
import { router } from './trpc';

export const rootRouter  = router({
    HT_DMPhongBan: HT_DMPhongBanRouter,
    BV_Master: BV_MasterRouter,
    BV_PhieuChidinhDV: BV_PhieuChidinhDVRouter
})

export type RootRouter = typeof rootRouter;