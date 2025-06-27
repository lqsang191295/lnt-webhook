import { restaurantRouter } from './routers/restaurant';
import { HT_DMPhongBanRouter } from './routers/HT_DMPhongBan';
import { router } from './trpc';

export const rootRouter  = router({
    restaurant: restaurantRouter,
    HT_DMPhongBan: HT_DMPhongBanRouter
})

export type RootRouter = typeof rootRouter;