import { z } from "zod";
import { procedure, router } from "../trpc";
import { prisma } from "@/lib/prisma";

export const BV_PhieuChidinhDVRouter = router({
  getAll: procedure.query(async () => {
    return prisma.bV_PhieuChidinhDV.findMany();
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
      return prisma.bV_PhieuChidinhDV.findMany({
        where,
        include: {
          TTBacsiKham: true,
          TTPhongKham: true,
          BV_PhieuChidinhDVCT: {
            include: {
              TTNguoiChiDinh: true,
              TTNguoithuchien: true,
            },
          },
        },
      });
    }),
});
