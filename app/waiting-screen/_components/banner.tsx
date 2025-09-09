import Image from "next/image";
import { memo } from "react";

// interface BannerProps {
//     bannerImage: string
//     handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void
// }

const Banner = () => {
  return (
    <div className=" from-green-50">
      <div className="text-center font-black">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 lg:gap-4">
          <div className="relative">
            <Image
              src={"/imgs/logo.png"}
              alt="Hospital logo"
              width={200}
              height={200}
              className="w-4 h-4 sm:w-8 sm:h-8 md:w-12 md:h-12 lg:w-14 lg:h-14 flex-shrink-0 rounded-lg"
            />
          </div>
          <div>
            <div className="flex text-base leading-tight">
              <span className="text-blue-800 font-extrabold">
                BỆNH VIỆN ĐA KHOA&nbsp;
              </span>
              <span className="block lg:inline text-center text-red-700 font-extrabold">
                LÊ NGỌC TÙNG
              </span>
            </div>
            <h2 className="font-black text-green-800 text-[10px] leading-tight rounded-lg">
              CỔNG THÔNG TIN ĐIỆN TỬ BVĐK LÊ NGỌC TÙNG TRÊN ZALO
            </h2>
          </div>
        </div>
      </div>

      {/* <p className="text-center text-xs text-green-700 bg-gradient-to-r from-green-200 to-blue-200 rounded-lg px-3 py-1 font-bold border border-green-300 shadow-sm mx-4 mt-1">
        Công cụ hỗ trợ đắc lực trong việc chăm sóc sức khỏe bản thân &amp; gia
        đình
      </p> */}
    </div>
  );
};

export default memo(Banner);
