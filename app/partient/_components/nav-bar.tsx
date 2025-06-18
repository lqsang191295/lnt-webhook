import { Button } from "@/components/ui/button";
import {
    Users,
    Calendar,
    UserCheck,
    Building2,
    Package,
    DollarSign,
    Settings,
    HelpCircle,
    Home,
} from "lucide-react"
import Image from "next/image";

const sidebarItems = [
    { icon: Home, label: "Overview", active: true },
    // { icon: Users, label: "Patients", active: false },
    // { icon: Calendar, label: "Appointments", active: true },
    // { icon: UserCheck, label: "Doctors", active: false },
    // { icon: Building2, label: "Departments", active: false },
    // { icon: Users, label: "Employees", active: false },
    // { icon: Package, label: "Products & stock", active: false },
    // { icon: DollarSign, label: "Earnings", active: false },
    // { icon: Settings, label: "Settings", active: false },
    // { icon: HelpCircle, label: "Help & support", active: false },
]

export default function Navbar() {
    return <div className="w-64 bg-white shadow-sm flex flex-col">
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
                {sidebarItems.map((item, index) => (
                    <li key={index}>
                        <Button
                            variant={item.active ? "default" : "ghost"}
                            className={`w-full justify-start gap-3 ${item.active
                                ? "bg-blue-500 text-white hover:bg-blue-600"
                                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                }`}
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
