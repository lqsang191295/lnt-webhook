import { iClsGroupData, iRoom } from "@/types/cls"
import { Clock } from "lucide-react"
import { memo } from "react"

interface HeaderProps {
    room: iRoom | undefined
    activePatient: iClsGroupData | undefined
}

const Header = ({ room, activePatient }: HeaderProps) => {
    return <div className="grid grid-cols-12 h-48 border-b border-green-600 text-green-900 flex-shrink-0">
        <div className="col-span-6 flex items-center justify-center border-r border-green-600 py-5 font-extrabold text-4xl uppercase">
            Phòng {room?.name}
        </div>
        <div className="col-span-6 flex flex-col justify-center border-l border-green-600 py-5 font-extrabold text-4xl uppercase leading-tight text-center">
            {activePatient ? (
                <>
                    <span>{!activePatient.TrangThaiKham ? 'MỜI BỆNH NHÂN:' : 'BỆNH NHÂN ĐANG KHÁM'}</span>
                    <span className="mt-2 truncate">{activePatient?.STT}. {activePatient?.Hoten} - {activePatient?.Namsinh}</span>
                </>
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