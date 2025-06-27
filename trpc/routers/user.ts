import { z } from 'zod';
import { procedure, router } from "../trpc";
import { prisma } from '@/lib/prisma';

export const userRouter = router({
  getAll: procedure.query(async () => {
    return prisma.user.findMany(); // giả sử có bảng User
  }),
});
