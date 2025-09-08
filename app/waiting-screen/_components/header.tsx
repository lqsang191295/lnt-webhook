import { iClsGroupData, iRoom } from "@/types/cls";
import { memo } from "react";
import Banner from "./banner";

interface HeaderProps {
  room: iRoom | undefined;
  activePatient: iClsGroupData | undefined;
}

const Header = ({ room }: HeaderProps) => {
  return (
    <div className="flex text-green-900 flex-shrink-0">
      <div className="flex-1 border-r-2 border-green-600 ">
        <Banner />
      </div>
      <div className="flex-1 flex items-center justify-center border-b-2 border-green-600 font-extrabold text-lg sm:text-xl md:text-2xl uppercase">
        PHÒNG {room?.name}
      </div>
      {/* <div className="col-span-6 flex flex-col justify-center border-l border-green-600 font-extrabold text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl uppercase leading-tight text-center px-2">
        {activePatient ? (
          <>
            <span className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
              BỆNH NHÂN ĐANG KHÁM:
            </span>
            <span className="mt-1 truncate text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
              {activePatient?.STT}. {activePatient?.Hoten} -{" "}
              {activePatient?.Namsinh}
            </span>
          </>
        ) : (
          <div className="text-center text-gray-500">
            <Clock className="w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 xl:w-16 xl:h-16 mx-auto mb-1 lg:mb-2 opacity-50" />
            <p className="text-xs sm:text-sm md:text-base lg:text-lg">
              Chưa có bệnh nhân
            </p>
          </div>
        )}
      </div> */}
    </div>
  );
};

export default memo(Header);
