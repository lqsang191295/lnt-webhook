import {
    Package,
    Info,
    BriefcaseMedical,
    ScanQrCode,
    File,
    Stethoscope,
    PcCase,
} from "lucide-react"

export const sidebarItems = [
    { icon: Info, label: "Thông tin hành chính" },
    { icon: Stethoscope, label: "Thông tin tiếp nhận" },
    { icon: PcCase, label: "Phiếu chỉ định" },
    { icon: Package, label: "Toa thuốc" },
    { icon: File, label: "Files" },
]

export const sidebarDoctorItems = [
    { icon: ScanQrCode, label: "Quét QR" },
    { icon: BriefcaseMedical, label: "Chỉ định trực tiếp" },
]

