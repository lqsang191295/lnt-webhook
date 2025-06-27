import { Button } from "@/components/ui/button";
import { iNavbarItemType } from "@/types/nav-bar";
import { Menu } from "lucide-react";
import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface iNavarProps {
    navbarData: iNavbarItemType[]
    navbarItem: iNavbarItemType
    onClick: (item: iNavbarItemType) => void;
}

export default function NavbarMobile({ navbarData, onClick }: iNavarProps) {
    return <div className="bg-white shadow-sm md:hidden flex-col flex fixed top-0 w-full z-10">
        {/* Logo */}
        <div className="p-4 h-16 flex flex-row justify-between">
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

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                        <Menu />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="start">
                    <DropdownMenuGroup>
                        {navbarData.map((item, index) => (
                            <DropdownMenuItem key={`drop-down-menu-${index}`} onClick={() => { onClick(item) }}>
                                <item.icon className="w-4 h-4" />
                                {item.label}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    </div>;
}
