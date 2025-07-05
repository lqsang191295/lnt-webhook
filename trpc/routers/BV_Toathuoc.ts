import { z } from "zod";
import { procedure, router } from "../trpc";
import { prisma } from "@/lib/prisma";

export const BV_ToathuocRouter = router({
  getAll: procedure.query(async () => {
    return prisma.bV_Toathuoc.findMany();
  }),
  getByMaBN: procedure
    .input(
      z.object({
        maBN: z.string(),
        Ngay: z.string().datetime(),
      })
    )
    .query(async ({ input }) => {
      const where: Record<string, unknown> = {
        MaBN: input.maBN,
        Ngay: new Date(input.Ngay),
      };
      return prisma.bV_Toathuoc.findMany({
        where,
        include: {
          TTBacsiKeToa: true,
          TTPhongKham: true,
          BV_ToathuocCT: {
            include: {
              TTBsKetoa: true,
            },
          },
        },
      });
    }),
});
