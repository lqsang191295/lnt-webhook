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


    return <div className="flex justify-between items-center">
        <div className="flex flex-1 justify-center items-center">
            <h1
                className="text-4xl font-bold text-blue-400 cursor-pointer">
                {room?.name}
            </h1>
        </div>
        <Separator className="!w-2 h-full bg-blue-600" orientation="vertical" />
        <div className="flex flex-1 justify-center items-center py-12 flex-col gap-4">
            <h2 className="text-3xl font-bold text-blue-400">MỜI BỆNH NHÂN</h2>
            <Label className="text-3xl font-bold text-blue-400">4003.Nguyễn Văn A</Label>
        </div>
    </div>
}

export default memo(Header);