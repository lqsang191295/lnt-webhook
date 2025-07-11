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
          TTPhongBan: true,
          TTChanDoanChinh: true,
          TTChanDoanPhu: true,
        },
      });
    }),

  getAllByFilter: procedure
    .input(
      z.object({
        textSearch: z.string(),
        tuNgay: z.string().datetime().optional(),
        denNgay: z.string().datetime().optional(),
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(100).default(20),
      })
    )
    .query(async ({ input }) => {
      const { textSearch, page, limit, tuNgay, denNgay } = input;
      const skip = (page - 1) * limit;
      const whereCondition = {
        AND: [
          {
            Ngay: {
              gte: tuNgay,
              lte: denNgay,
            },
          },
          textSearch
            ? {
                OR: [{ MaBN: textSearch }, { Sovaovien: textSearch }],
              }
            : {},
        ],
      };

      const [items, total] = await Promise.all([
        prisma.bV_Master.findMany({
          where: whereCondition,
          skip,
          take: limit,
          include: {
            TTBacsi: true,
            TTPhongBan: true,
            TTChanDoanChinh: true,
            TTChanDoanPhu: true,
            TTQLyCapThe: true,
          },
        }),
        prisma.bV_Master.count({
          where: whereCondition,
        }),
      ]);

      return {
        items,
        total,
        totalPages: Math.ceil(total / limit),
        page,
      };
    }),
});
