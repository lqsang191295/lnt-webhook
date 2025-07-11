import { z } from "zod";
import { procedure, router } from "../trpc";
import { prisma } from "@/lib/prisma";

export const HsbaRouter = router({
  getDataHsba: procedure
    .input(
      z.object({
        MaBN: z.string(),
        Sovaovien: z.string(),
      })
    )
    .query(async ({ input }) => {
      const where: Record<string, unknown> = {
        MaBN: input.MaBN,
        Sovaovien: input.Sovaovien,
      };

      const dataBvMaster = await prisma.bV_Master.findMany({
        where,
        select: {
          MaBN: true,
          Ngay: true,
          Sovaovien: true,
          TGVao: true,
          TGRa: true,
          ChandoanPhu: true,

          TTPhongBan: {
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

          TTChanDoanChinh: {
            select: {
              CICD10: true,
              VVIET: true,
            },
          },
        },
      });

      if (!dataBvMaster || dataBvMaster.length === 0) return null;

      const mainData = dataBvMaster[0];
      const listStrCDP = mainData.ChandoanPhu
        ? mainData.ChandoanPhu.split(";")
        : [];
      const listCDP = await prisma.hT_DMICD10.findMany({
        where: {
          CICD10: {
            in: listStrCDP,
          },
        },
      });

      return {
        ...mainData,
        TTChanDoanPhu: listCDP,
      };
    }),
  getDataPhieuKhamBenhVaoVien: procedure
    .input(
      z.object({
        MaBN: z.string(),
        Sovaovien: z.string(),
      })
    )
    .query(async ({ input }) => {
      const where: Record<string, unknown> = {
        MaBN: input.MaBN,
        Sovaovien: input.Sovaovien,
      };

      const TTBvMaster = await prisma.bV_Master.findFirst({
        where,
        select: {
          MaBN: true,
          Ngay: true,
          Sovaovien: true,
          TGVao: true,
          TGRa: true,
          ChandoanPhu: true,
          ChandoanChinh: true,

          TTPhongBan: {
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
              Diachi: true,
              TTNgheNghiep: true,
            },
          },

          TTChanDoanChinh: {
            select: {
              CICD10: true,
              VVIET: true,
            },
          },
        },
      });

      if (!TTBvMaster) return null;

      const listStrCDP = TTBvMaster?.ChandoanPhu
        ? TTBvMaster?.ChandoanPhu.split(";")
        : [];
      const listCDP = await prisma.hT_DMICD10.findMany({
        where: {
          CICD10: {
            in: listStrCDP,
          },
        },
      });
      const TTChanDoanChinh = await prisma.hT_DMICD10.findFirst({
        where: {
          CICD10: TTBvMaster?.ChandoanChinh || "",
        },
      });
      const TTQlyCapThe = await prisma.bV_QLyCapThe.findFirst({
        where: {
          Ma: TTBvMaster?.MaBN || "",
        },
      });
      const TTNgheNghiep = await prisma.hT_DMNgheNghiep.findFirst({
        where: {
          Ma: TTQlyCapThe?.Nghenghiep || "",
        },
      });
      const TTTinh = await prisma.hT_DMTinh.findFirst({
        where: {
          MATT: TTQlyCapThe?.Tinhquan || "",
        },
      });

      return {
        TTBvMaster,
        TTQlyCapThe,
        TTNgheNghiep,
        TTChanDoanChinh,
        TTChanDoanPhu: listCDP,
        TTTinh,
      };
    }),
});
