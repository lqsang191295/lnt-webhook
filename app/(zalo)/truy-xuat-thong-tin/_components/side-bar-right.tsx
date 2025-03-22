"use client";

import { eTab, useTruyXuatThongTinStore } from "../_store";
import { DanhSachTemplate } from "./danh-sach-template";
import { ThongTinTrangThaiZns } from "./thong-tin-trang-thai-zns";

export function SidebarRight() {
  const { tab } = useTruyXuatThongTinStore();

  switch (tab.id) {
    case eTab.lttttzns:
      return <ThongTinTrangThaiZns />;
    case eTab.ldstl:
      return <DanhSachTemplate />;
  }

  return <div className="flex flex-col">SidebarRight</div>;
}
