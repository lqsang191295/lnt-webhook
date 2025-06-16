import { Room } from "@/types/patient"
import { Clock } from "lucide-react"
import { memo } from "react"

interface HeaderProps {
    room: Room
}

const Header = ({ room }: HeaderProps) => {
    return <div className="grid grid-cols-12 h-48 border-b border-green-600 text-green-900 flex-shrink-0">
        <div className="col-span-6 flex items-center justify-center border-r border-green-600 py-5 font-extrabold text-4xl uppercase">
            PHÒNG KHÁM {room.name}
        </div>
        <div className="col-span-6 flex flex-col justify-center border-l border-green-600 py-5 font-extrabold text-4xl uppercase leading-tight text-center">
            {activePatient ? (
                <><span>MỜI BỆNH NHÂN:</span><span className="mt-2 truncate">{activePatient?.HoTen} - {activePatient?.NamSinh}</span></>
            ) : (
                <div className="text-center text-gray-500">
                    <Clock className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-xl">Chưa có bệnh nhân</p>
                </div>
            )}
        </div>
    </div>
}

export default memo(Header);