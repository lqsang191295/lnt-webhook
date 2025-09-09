import { ArrowBigLeftDash } from "lucide-react";
import Image from "next/image";
import { memo } from "react";
import Banner from "./banner";

const Header = () => {
  return (
    <div className="flex flex-row flex-1 text-green-900 ">
      <div className="flex justify-center items-center h-full">
        <Image
          src={"/imgs/QR.png"}
          alt="Hospital QRCODE"
          width={500}
          height={500}
          className="h-28 w-28 p-1.5"
        />
      </div>
      <div className="flex flex-col flex-1 ">
        <Banner />
        <div className="flex flex-row gap-1 items-center font-bold text-red-500 ml-2">
          <ArrowBigLeftDash />
          <span className="text-xs leading-tight">
            Quét QRcode xem lịch sử kết quả khám chữa bệnh
          </span>
        </div>
        {/* <div className="flex justify-between p-4 gap-2">
          <div className="text-xs list-none text-blue-900 space-y-0.5 sm:space-y-1 lg:space-y-2">
            <div className="flex items-center">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full mr-1.5 sm:mr-2 flex-shrink-0"></span>
              <span className="font-black leading-tight">
                ĐĂNG KÝ KHÁM CHỮA BỆNH ONLINE
              </span>
            </div>
            <div className="flex items-center">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full mr-1.5 sm:mr-2 flex-shrink-0"></span>
              <span className="font-black leading-tight">
                TRẢ KẾT QUẢ CẬN LÂM SÀNG ONLINE
              </span>
            </div>
          </div>
          <div className="text-xs list-none text-blue-900 space-y-0.5 sm:space-y-1 lg:space-y-2">
            <div className="flex items-center">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full mr-1.5 sm:mr-2 flex-shrink-0"></span>
              <span className="font-black leading-tight">
                CHƯƠNG TRÌNH KHUYẾN MÃI
              </span>
            </div>
            <div className="flex items-center">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full mr-1.5 sm:mr-2 flex-shrink-0"></span>
              <span className="font-black leading-tight">BẢNG GIÁ DỊCH VỤ</span>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default memo(Header);
