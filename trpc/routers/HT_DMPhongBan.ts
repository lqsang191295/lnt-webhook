import { procedure, router } from "../trpc";
import { prisma } from '@/lib/prisma';

export const HT_DMPhongBanRouter = router({
  getAll: procedure.query(async () => {
    return prisma.hT_DMPhongBan.findMany();
  }),
});
