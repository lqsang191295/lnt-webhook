import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { memo } from "react"
// interface BannerProps {
//     bannerImage: string
//     handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void
// }

const Banner = () => {

    return <Card className="flex-grow rounded-none shadow-none border-r border-green-600 flex flex-col">
              <CardHeader className="pb-4 border-b border-green-600">
                <CardTitle className="text-center text-xl font-extrabold">
                 <div className="flex items-center justify-center">
                  <img src={"/imgs/logo.jpg"} alt="Hospital logo" className="w-[120px] h-[120px] p4"/>
                  <div className="p-4 ml-4 text-3xl"><span className="text-blue-900">BỆNH VIỆN ĐA KHOA</span><span className="text-red-700"> LÊ NGỌC TÙNG</span></div>
                  </div>
                </CardTitle>
                <h2 className="text-center font-extrabold text-green-900 text-3xl mt-2 mb-6">
                  CỔNG THÔNG TIN ĐIỆN TỬ BVĐK LÊ NGỌC TÙNG TRÊN ZALO
                </h2>
                <p className="text-center text-lg text-green-700 bg-green-200 rounded-sm px-4 py-2 font-semibold">
                  Công cụ hỗ trợ đắc lực trong việc chăm sóc sức khỏe bản thân &amp; gia đình
                </p>
              </CardHeader>
              <CardContent className="flex-grow text-gray-700 font-semibold leading-relaxed text-lg space-y-4 overflow-auto px-6">
                <div className="grid grid-cols-12">
                <div className="col-span-6">
                  <p className="text-center font-extrabold text-red-700 text-3xl mt-2 mb-6">QUÉT MÃ QR-CODE TẠI ĐÂY!</p>
                  <div className="flex items-center justify-center">
                  <img src={"/imgs/QR.png"} alt="Hospital QRCODE" className="w-[250px] h-[250px] p4 border-gray-500 border-3"/>
                  </div>
                </div>
                  <div className="col-span-6 relative mt-8">
                    <p className="z-50 text-3xl text-center font-extrabold text-red-700 text-3xl mt-2 mb-6 absolute -translate-x-1/2 left-1/2">
                      <span className="bg-white border-green-600 border-2 p-2">TÍNH NĂNG</span>
                    </p>
                  <ul className="text-2xl list-disc list-inside text-blue-900 border-green-600 border-2 items-center justify-center space-y-3 pl-5 pt-10 pr-5 absolute top-6">
                  <li>
                    <span className="font-extrabold">ĐĂNG KÝ KHÁM CHỮA BỆNH ONLINE </span>
                  </li>
                  <li>
                    <span className="font-extrabold">TRẢ KẾT QUẢ CẬN LÂM SÀNG ONLINE </span>
                  </li>
                  <li>
                    <span className="font-extrabold">CHƯƠNG TRÌNH KHUYẾN MÃI</span>
                  </li>
                  <li>
                    <span className="font-extrabold">BẢNG GIÁ DỊCH VỤ</span>
                  </li>
                  <li>
                    <span className="font-extrabold">...</span> 
                  </li>
                </ul>
                </div>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-center space-x-12 pt-4 border-t border-green-600">
    
              </CardFooter>
            </Card>
}

export default memo(Banner);