"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Clock } from "lucide-react"
import ClientOnly from "@/components/ClientOnly"
import LoadingFallback from "@/components/LoadingFallback"
import { useParams } from "next/navigation"
import { Patient, Room } from '@/types/patient'
import { websocketInstance } from '@/websocket'
interface ApiResponse {
  room: Room
  activePatient: Patient | null
  patients: Patient[]
  count: number
}

function RoomDetailContent() {
  const params = useParams()
  const roomCode = params.code as string
  const [data, setData] = useState<ApiResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [logoImage] = useState("/imgs/logo.jpg")
  const [qrCodeImage] = useState("/imgs/QR.png")


  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`/api/waiting-patients`, {
        method: 'POST',
        body: JSON.stringify(roomCode),
      });
      if (!response.ok) {
        throw new Error('Không thể tải dữ liệu')
      }
      const result = await response.json()
      setData(result)
      setError(null)
    } catch (err) {
      console.error('Lỗi khi tải dữ liệu:', err)
      setError(err instanceof Error ? err.message : 'Lỗi không xác định')
    } finally {
      setLoading(false);
    }
  }, [roomCode])
  useEffect(() => {
    fetchData();
  }, [fetchData])

  useEffect(() => {
    websocketInstance.connect();
    websocketInstance.onMessage((code) => {
      if (code === roomCode) {
      fetchData();
      }
    });
    return () => {
      websocketInstance.close();
    };
  }, [fetchData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
           <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Lỗi tải dữ liệu</h1>
          <p className="text-gray-600 mb-4">{error || 'Không thể tải dữ liệu phòng khám'}</p>
          <button
            onClick={fetchData}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Thử lại
          </button>
        </div>
      </div>


    )
  }

  const { room, activePatient, patients, count } = data

  return (
  <div className="w-screen h-screen bg-[#e6f3f1] border border-green-600 rounded-md flex flex-col select-none overflow-hidden">
  {/* Header - Responsive */}
  <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[80px] sm:min-h-[100px] lg:h-32 xl:h-40 border-b border-green-600 text-green-900 flex-shrink-0">
    <div className="lg:col-span-6 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-green-600 py-2 sm:py-3 lg:py-4 font-extrabold text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl uppercase px-2">
      PHÒNG KHÁM {room.name}
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

  {/* Main content - Optimized layout with better proportions */}
  <div className="flex flex-col lg:flex-row flex-grow overflow-hidden min-h-0">
    {/* Banner section - Enhanced with better visual design */}
    <Card className="flex-grow min-w-0 rounded-none shadow-none border-b-2 lg:border-b-0 lg:border-r-2 border-green-600 flex flex-col">
        <CardHeader className="flex-shrink-0 flex-basis-1/3 border-b-2 border-green-600 pb-2 sm:pb-3 lg:pb-4 px-3 sm:px-4 lg:px-6 from-green-50">
        <CardTitle className="text-center font-black">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 lg:gap-4 mb-2">
            <div className="relative">
              <img
                src={logoImage || "/placeholder.svg"}
                alt="Hospital logo"
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
                <img
                  src={qrCodeImage || "/placeholder.svg"}
                  alt="Hospital QRCODE"
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

    {/* Patient list - Responsive */}
    <Card className="w-full lg:w-2/5 rounded-none shadow-none border-green-600 lg:border-l flex flex-col overflow-auto max-h-[35vh] sm:max-h-[40vh] lg:max-h-none min-w-0">
      <CardHeader className="border-b border-green-600 py-1 sm:py-2 lg:py-3 px-2">
        <CardTitle className="text-green-900 font-extrabold text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-center tracking-wide">
          BỆNH NHÂN TIẾP THEO ({count})
        </CardTitle>
      </CardHeader>

      <CardContent className="overflow-auto p-0 flex-grow min-h-0">
        <div className="overflow-x-auto">
          <Table className="w-full min-w-0 text-green-800 text-xs sm:text-sm md:text-base lg:text-lg font-semibold leading-relaxed min-w-[250px] sm:min-w-[300px]">
            <TableHeader>
              <TableRow className="border-b-2 border-green-400 bg-green-100">
                <TableHead className="w-1/6 text-center py-2 sm:py-3 lg:py-4 text-green-900 text-xs sm:text-sm md:text-base font-black">
                  STT
                </TableHead>
                <TableHead className="w-3/6 text-left py-2 sm:py-3 lg:py-4 pl-2 sm:pl-3 lg:pl-5 text-green-900 text-xs sm:text-sm md:text-base font-black">
                  HỌ VÀ TÊN
                </TableHead>
                <TableHead className="w-2/6 text-center py-2 sm:py-3 lg:py-4 text-green-900 text-xs sm:text-sm md:text-base font-black">
                  NĂM SINH
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.map((patient, index) => (
                <TableRow key={index} className="border-b border-green-200">
                  <TableCell className="text-center py-1 sm:py-2 text-xs sm:text-sm md:text-base">
                    {patient.STT}
                  </TableCell>
                  <TableCell className="py-1 sm:py-2 pl-1 sm:pl-2 lg:pl-4 text-xs sm:text-sm md:text-base truncate max-w-0">
                    {patient.Hoten}
                  </TableCell>
                  <TableCell className="text-center py-1 sm:py-2 text-xs sm:text-sm md:text-base">
                    {patient.Namsinh}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  </div>

  {/* Footer - Responsive */}
  <div className="bg-green-900 text-white text-center py-1 sm:py-2 lg:py-3 text-xs sm:text-sm md:text-base font-extrabold rounded-b-md flex-shrink-0 tracking-wider select-none">
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-0.5 sm:gap-1">
      <div className="px-1 sm:px-2">Tổng đài: 02763 797999</div>
      <div className="px-1 sm:px-2">Hotline: 1900 561 510</div>
      <div className="px-1 sm:px-2">Cấp cứu: 0888 79 52 59</div>
    </div>
  </div>
</div>

  )
}
export default function RoomDetail() {
  return (
    <ClientOnly fallback={<LoadingFallback />}>
      <RoomDetailContent />
    </ClientOnly>
  )
}
 