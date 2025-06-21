import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { memo } from "react"
import Image from 'next/image';

// interface BannerProps {
//     bannerImage: string
//     handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void
// }

const Banner = () => {

    return     <Card className="flex-grow min-w-0 rounded-none shadow-none border-b-2 lg:border-b-0 lg:border-r-2 border-green-600 flex flex-col">
    <CardHeader className="flex-shrink-0 flex-basis-1/3 border-b-2 border-green-600 pb-2 sm:pb-3 lg:pb-4 px-3 sm:px-4 lg:px-6 from-green-50">
    <CardTitle className="text-center font-black">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 lg:gap-4 mb-2">
        <div className="relative">
          <Image
            src={"/imgs/logo.png"}
            alt="Hospital logo"
            width={500}
            height={500}
            className="w-10 h-10 sm:w-14 sm:h-14 md:w-18 md:h-18 lg:w-22 lg:h-22 xl:w-26 xl:h-26 2xl:w-[110px] 2xl:h-[110px] flex-shrink-0 rounded-lg"
          />
        </div>
        <div className="text-center sm:text-left text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl leading-tight">
          <span className="text-blue-800 font-extrabold">BỆNH VIỆN ĐA KHOA </span>
          <span className="text-red-700 font-extrabold">LÊ NGỌC TÙNG</span>
        </div>
      </div>
    </CardTitle>
    <h2 className="text-center font-black text-green-800 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl mb-2 leading-tight rounded-lg px-3 py-2">
      CỔNG THÔNG TIN ĐIỆN TỬ BVĐK LÊ NGỌC TÙNG TRÊN ZALO
    </h2>
    <p className="text-center text-xs sm:text-sm md:text-base lg:text-lg text-green-700 bg-gradient-to-r from-green-200 to-blue-200 rounded-lg px-3 py-2 font-bold border border-green-300 shadow-sm">
      Công cụ hỗ trợ đắc lực trong việc chăm sóc sức khỏe bản thân &amp; gia đình
    </p>
  </CardHeader>

  <CardContent className="flex-grow flex-basis-2/3 min-h-0 text-gray-800 font-bold leading-relaxed text-xs sm:text-sm md:text-base lg:text-lg space-y-2 sm:space-y-3 lg:space-y-4 px-2 sm:px-3 lg:px-5 py-2 sm:py-3 lg:py-4">
    <div className="h-full flex flex-col lg:flex-row gap-3 sm:gap-4 lg:gap-6 min-h-0">
      {/* QR Code section - Enhanced with better visual appeal */}
      <div className="flex-1 order-2 lg:order-1 flex flex-col justify-center min-w-0">
        <div className="text-center">
          <p className="font-black text-red-700 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl mb-2 sm:mb-3 lg:mb-4 bg-white rounded-lg px-3 py-2 border-2 border-red-300 shadow-md">
            QUÉT MÃ QR-CODE TẠI ĐÂY!
          </p>
        </div>
        <div className="flex items-center justify-center flex-grow">
          <div className="relative">
            <Image
              src={"/imgs/QR.png"}
              alt="Hospital QRCODE"
              width={500}
              height={500}
              className="w-24 h-24 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-36 lg:h-36 xl:w-50 xl:h-50 2xl:w-70 2xl:h-70 border-3 border-gray-400 object-contain max-w-full max-h-full rounded-lg shadow-lg bg-white p-2"
            />
            <div className="absolute inset-0 border-2 border-green-500 rounded-lg animate-pulse opacity-30"></div>
          </div>
        </div>
      </div>

      {/* Features section - Enhanced with better visual design */}
      <div className="flex-1 order-1 lg:order-2 flex flex-col justify-center relative min-w-0">
        <div className="relative">
          <p className="absolute -top-3 sm:-top-4 lg:-top-0 left-1/2 transform -translate-x-1/2 z-10 text-center font-black text-red-700 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
            <span className="bg-white border-2 border-green-600 px-3 py-2 rounded-lg shadow-lg">TÍNH NĂNG</span>
          </p>
          <div className="border-2 border-green-600 p-3 sm:p-4 lg:p-5 mt-4 sm:mt-5 lg:mt-6 pt-3 sm:pt-4 lg:pt-5 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg shadow-md">
            <ul className="text-xs sm:text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl list-none text-blue-900 space-y-0.5 sm:space-y-1 lg:space-y-2">
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full mr-1.5 sm:mr-2 flex-shrink-0"></span>
                <span className="font-black leading-tight">ĐĂNG KÝ KHÁM CHỮA BỆNH ONLINE</span>
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full mr-1.5 sm:mr-2 flex-shrink-0"></span>
                <span className="font-black leading-tight">TRẢ KẾT QUẢ CẬN LÂM SÀNG ONLINE</span>
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full mr-1.5 sm:mr-2 flex-shrink-0"></span>
                <span className="font-black leading-tight">CHƯƠNG TRÌNH KHUYẾN MÃI</span>
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full mr-1.5 sm:mr-2 flex-shrink-0"></span>
                <span className="font-black leading-tight">BẢNG GIÁ DỊCH VỤ</span>
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full mr-1.5 sm:mr-2 flex-shrink-0"></span>
                <span className="font-black leading-tight">...</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </CardContent>
</Card>
}

export default memo(Banner);