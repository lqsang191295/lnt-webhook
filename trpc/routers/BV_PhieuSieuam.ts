import { z } from "zod";
import { procedure, router } from "../trpc";
import { prisma } from '@/lib/prisma';

export const BV_PhieuSieuamRouter = router({
  getBy_MaBN_SoVaoVien: procedure
    .input(
      z.object({
        MaBN: z.string(),
        SoVaoVien: z.string(),
      })
    )
    .query(async ({ input }) => {
      const { MaBN, SoVaoVien } = input;
      return prisma.bV_PhieuSieuam.findUnique({
        where: {
          MaBN: MaBN,
          SoVaoVien: SoVaoVien,
        },
      });
    }),
});