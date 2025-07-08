import { z } from "zod";
import { procedure, router } from "../trpc";
import { prisma } from "@/lib/prisma";

export const BV_QLyCapTheRouter = router({
  getAll: procedure
    .input(
      z.object({
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(100).default(20),
      })
    )
    .query(async ({ input }) => {
      const { page, limit } = input;
      const skip = (page - 1) * limit;

      const [items, total] = await Promise.all([
        prisma.bV_QLyCapThe.findMany({
          skip,
          take: limit,
        }),
        prisma.bV_QLyCapThe.count(),
      ]);

      return {
        items,
        total,
        totalPages: Math.ceil(total / limit),
        page,
      };
    }),
});
