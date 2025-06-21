import { iClsGroupData, iRoom } from "@/types/cls"
import { Clock } from "lucide-react"
import { memo } from "react"

interface HeaderProps {
    room: iRoom | undefined
    activePatient: iClsGroupData | undefined
}

const Header = ({ room, activePatient }: HeaderProps) => {
    return   <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[80px] sm:min-h-[100px] lg:h-32 xl:h-40 border-b border-green-600 text-green-900 flex-shrink-0">
    <div className="lg:col-span-6 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-green-600 py-2 sm:py-3 lg:py-4 font-extrabold text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl uppercase px-2">
      PHÒNG {room?.name}
    </div>
    <div className="lg:col-span-6 flex flex-col justify-center lg:border-l border-green-600 py-2 sm:py-3 lg:py-4 font-extrabold text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl uppercase leading-tight text-center px-2">
      {activePatient ? (
        <>
          <span className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">MỜI BỆNH NHÂN:</span>
          <span className="mt-1 truncate text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
            {activePatient?.STT}. {activePatient?.Hoten} - {activePatient?.Namsinh}
          </span>
        </>
      ) : (
        <div className="text-center text-gray-500">
          <Clock className="w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 xl:w-16 xl:h-16 mx-auto mb-1 lg:mb-2 opacity-50" />
          <p className="text-xs sm:text-sm md:text-base lg:text-lg">Chưa có bệnh nhân</p>
        </div>
      )}
    </div>
  </div>
}

export default memo(Header);