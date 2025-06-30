import { iNavbarItemType } from "@/types/nav-bar";
import ContentFiles from "./content-files";
import ContentPhieuCD from "./content-phieu-cd";
import ContentToaThuoc from "./content-toa-thuoc";
import ContentThongTin from "./content-thong-tin";
import ContentThongTinTiepNhan from "./content-thong-tin-tiep-nhan";
import ContentQuetQR from "./doctors/content-quet-qr";
import ContentChiDinh from "./doctors/content-chi-dinh";
import ContentLichSuKham from "./content-lich-su-kham";

interface iMainContentProps {
  navbarItem: iNavbarItemType
}

export default function MainContent({ navbarItem }: iMainContentProps) {
  return <div className="flex-1 flex flex-col mt-16 md:mt-0 overflow-x-hidden">
    <main className="bg-blue-100 flex-1 overflow-hidden md:p-4">
      {navbarItem.label === "Lịch sử khám" && <ContentLichSuKham />}
      {navbarItem.label === "Thông tin hành chính" && <ContentThongTin />}
      {navbarItem.label === "Thông tin tiếp nhận" && <ContentThongTinTiepNhan />}
      {navbarItem.label === "Phiếu chỉ định" && <ContentPhieuCD />}
      {navbarItem.label === "Toa thuốc" && <ContentToaThuoc />}
      {navbarItem.label === "Files" && <ContentFiles />}

      {/* Doctor */}
      {navbarItem.label === "Quét QR" && <ContentQuetQR />}
      {navbarItem.label === "Chỉ định trực tiếp" && <ContentChiDinh />}
    </main>
  </div>;
}
