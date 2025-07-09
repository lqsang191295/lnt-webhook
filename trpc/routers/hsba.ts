import { z } from "zod";
import { procedure, router } from "../trpc";
import { prisma } from "@/lib/prisma";

export const HsbaRouter = router({
  getDataHsba: procedure
    .input(
      z.object({
        MaBN: z.string(),
      })
    )
    .query(async ({ input }) => {
      const where: Record<string, unknown> = {
        MaBN: input.MaBN,
      };

      return prisma.bV_Master.findMany({
        where,
        select: {
          MaBN: true,
          Ngay: true,
          Sovaovien: true,
          TGVao: true,
          TGRa: true,

          TTPhongKham: {
            select: {
              Ten: true,
            },
          },

          TTQLyCapThe: {
            select: {
              Hoten: true,
              Ngaysinh: true,
              Thangsinh: true,
              Namsinh: true,
              SoBHYT: true,
              SoCMND: true,
              Gioitinh: true,
            },
          },
        },
      });
    }),
});
