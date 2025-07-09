import { procedure, router } from "../trpc";
import { prisma } from "@/lib/prisma";

export const NS_NhanVienRouter = router({
  getAll: procedure.query(async () => {
    return prisma.nS_NhanVien.findMany();
  }),
});
