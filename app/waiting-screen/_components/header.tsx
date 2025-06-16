import TimeDisplay from "@/components/TimeDisplay"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Room } from "@/types/patient"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { memo } from "react"

interface HeaderProps {
    room: Room
}

const Header = ({ room }: HeaderProps) => {
    const params = useParams()


    return <div className="grid grid-cols-12 border-b border-green-600 text-green-900 flex-shrink-0">
        <div className="col-span-6 flex items-center justify-center border-r border-green-600 py-5 font-extrabold text-2xl uppercase">
            PHÒNG KHÁM NỘI
        </div>
        <div className="col-span-6 flex flex-col justify-center border-l border-green-600 py-5 font-extrabold text-2xl uppercase leading-tight text-center">
            <span>MỜI BỆNH NHÂN:</span>
            <span className="mt-2 truncate">4063. LÊ THÀNH BẢO KHÔI</span>
        </div>
    </div>
}

export default memo(Header);