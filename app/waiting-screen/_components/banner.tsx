import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { memo } from "react"

// interface BannerProps {
//     bannerImage: string
//     handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void
// }

const Banner = () => {

    return <Card className="flex-grow rounded-none shadow-none border-r border-green-600 flex flex-col">
        <CardHeader className="pb-4 border-b border-green-600">
            <CardTitle className="text-center text-xl font-extrabold text-gray-800">
                BỆNH VIỆN ĐA KHOA LÊ NGỌC TÙNG
            </CardTitle>
            <h2 className="text-center font-extrabold text-green-900 text-3xl mt-2 mb-6">
                CỔNG THÔNG TIN ĐIỆN TỬ BVĐK LÊ NGỌC TÙNG TRÊN ZALO
            </h2>
            <p className="text-center text-lg text-green-700 bg-green-200 rounded-sm px-4 py-2 font-semibold">
                Công cụ hỗ trợ đắc lực trong việc chăm sóc sức khỏe bản thân &amp; gia đình
            </p>
        </CardHeader>
        <CardContent className="flex-grow text-gray-700 font-semibold leading-relaxed text-lg space-y-4 overflow-auto px-6">
            <ul className="list-disc list-inside">
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
            </ul>
        </CardContent>
        <CardFooter className="flex items-center justify-center space-x-12 pt-4 border-t border-green-600">

        </CardFooter>
    </Card>
}

export default memo(Banner);