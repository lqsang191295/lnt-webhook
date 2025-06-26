import { Button } from "@/components/ui/button";
import { iNavbarItemType } from "@/types/nav-bar";
import Image from "next/image";

interface iNavarProps {
    navbarData: iNavbarItemType[]
    navbarItem: iNavbarItemType
    onClick: (item: iNavbarItemType) => void;
}

export default function Navbar({ navbarData, navbarItem, onClick }: iNavarProps) {
    return <div className="w-64 bg-white shadow-sm md:flex flex-col hidden">
        {/* Logo */}
        <div className="p-4 h-16">
            <div className="flex gap-x-2">
                <div className="flex aspect-square size-8 items-center justify-center text-sidebar-primary-foreground border border-gray-400 rounded-xs">
                    <Image src={"/imgs/logo.png"} width={36} height={36} alt="Logo" />
                </div>
                <div className="grid text-left text-sm leading-tight">
                    <span className="truncate text-[10px]">BỆNH VIỆN ĐA KHOA</span>
                    <span className="truncate text-base font-semibold">
                        LÊ NGỌC TÙNG
                    </span>
                </div>
            </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
            <ul className="space-y-2">
                {navbarData.map((item, index) => (
                    <li key={index}>
                        <Button
                            variant={item.label === navbarItem.label ? "default" : "ghost"}
                            className={`w-full justify-start gap-3 ${item.label === navbarItem.label
                                ? "bg-blue-500 text-white hover:bg-blue-600"
                                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                }`}
                            onClick={() => {onClick(item)}}
                        >
                            <item.icon className="w-4 h-4" />
                            {item.label}
                        </Button>
                    </li>
                ))}
            </ul>
        </nav>
    </div>;
}
