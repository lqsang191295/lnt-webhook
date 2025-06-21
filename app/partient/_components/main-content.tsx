import { iNavbarItemType } from "@/types/nav-bar";
import ContentFiles from "./content-files";
import Header from "./header";
import ContentPhieuCD from "./content-phieu-cd";
import ContentToaThuoc from "./content-toa-thuoc";

interface iMainContentProps {
  navbarItem: iNavbarItemType
}

export default function MainContent({ navbarItem }: iMainContentProps) {
  return <div className="flex-1 flex flex-col">
    <Header />
    <main className="bg-blue-100 flex-1 overflow-hidden">
      {navbarItem.label === "Files" && <ContentFiles />}
      {navbarItem.label === "Phiếu chỉ định" && <ContentPhieuCD />}
      {navbarItem.label === "Toa thuốc" && <ContentToaThuoc />}
    </main>
  </div>;
}
