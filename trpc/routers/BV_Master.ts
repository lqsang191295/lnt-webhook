import { z } from "zod";
import { procedure, router } from "../trpc";
import { prisma } from "@/lib/prisma";

export const BV_MasterRouter = router({
  getAll: procedure.query(async () => {
    return prisma.bV_Master.findMany();
  }),
  getByMaBN: procedure
    .input(
      z.object({
        maBN: z.string(),
        TuNgay: z.string().datetime().optional(),
        DenNgay: z.string().datetime().optional(),
      })
    )
    .query(async ({ input }) => {
      const where: Record<string, unknown> = {
        MaBN: input.maBN,
      };

      if (input.TuNgay && input.DenNgay) {
        where.Ngay = {
          gte: new Date(input.TuNgay),
          lte: new Date(input.DenNgay),
        };
      }

      return prisma.bV_Master.findMany({
        where,
        include: {
          TTBacsi: true,
          TTPhongKham: true,
          TTChanDoanChinh: true,
          TTChanDoanPhu: true,
        },
      });
    }),
});
