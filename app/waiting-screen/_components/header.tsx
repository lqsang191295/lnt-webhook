import TimeDisplay from "@/components/TimeDisplay"
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
        <div className="flex items-center gap-4">
            <Link href="/" className="text-blue-600 hover:text-blue-800">
                <ArrowLeft className="w-6 h-6" />
            </Link>
            <div className="flex items-center gap-4">
                <h1
                    className="text-4xl font-bold text-green-600 cursor-pointer hover:text-green-700"                >
                    {room?.name}
                </h1>
            </div>
        </div>
        <div className="text-right">
            <h2 className="text-3xl font-bold text-red-600 mb-2">MỜI BỆNH NHÂN{params.variable}</h2>
            <TimeDisplay />
        </div>
    </div>
}

export default memo(Header);