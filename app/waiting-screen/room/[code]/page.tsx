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
  }, [])

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
  }, []);

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
     <div className="w-screen h-screen bg-[#e6f3f1] border border-green-600 rounded-md flex flex-col select-none">
      {/* Header */}
      <div className="grid grid-cols-12 h-48 border-b border-green-600 text-green-900 flex-shrink-0">
        <div className="col-span-6 flex items-center justify-center border-r border-green-600 py-5 font-extrabold text-4xl uppercase">
          PHÒNG KHÁM {room.name}
        </div>
        <div className="col-span-6 flex flex-col justify-center border-l border-green-600 py-5 font-extrabold text-4xl uppercase leading-tight text-center">
          {activePatient ? (
            <><span>MỜI BỆNH NHÂN:</span><span className="mt-2 truncate">{activePatient?.STT}. {activePatient?.Hoten} - {activePatient?.Namsinh}</span></>
          ): (
            <div className="text-center text-gray-500">
              <Clock className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-xl">Chưa có bệnh nhân</p>
             </div>
          )}
        </div>
      </div>

      {/* Nội dung chính: dùng flex flex-grow để 2 card liền nhau */}
      <div className="flex flex-grow overflow-hidden">
      {/* Card giữa - Banner app */}
        <Card className="flex-grow rounded-none shadow-none border-r border-green-600 flex flex-col">
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


        {/* Card phải danh sách bệnh nhân */}
        <Card className="w-2/5 rounded-none shadow-none border-green-600 border-l flex flex-col overflow-auto">
          <CardHeader className="border-b border-green-600">
            <CardTitle className="text-green-900 font-extrabold text-xl text-center tracking-wide">
              BỆNH NHÂN TIẾP THEO ({count})
            </CardTitle>
          </CardHeader>
          <CardContent className="overflow-auto p-0">
            <Table className="w-full text-green-800 text-lg font-semibold leading-relaxed">
              <TableHeader>
                <TableRow className="border-b border-green-300">
                  <TableHead className="w-1/6 text-center py-3 text-green-1200">STT</TableHead>
                  <TableHead className="w-3/6 text-left py-3 pl-5 text-green-1200">HỌ VÀ TÊN</TableHead>
                  <TableHead className="w-2/6 text-center py-3 text-green-1200">NĂM SINH</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {patients.map((patient, index) => (
                  <TableRow key={index} className="border-b border-green-200">
                    <TableCell className="text-center py-2">{patient.STT}</TableCell>
                    <TableCell className="py-2 pl-5">{patient.Hoten}</TableCell>
                    <TableCell className="text-center py-2">{patient.Namsinh}</TableCell>
                  </TableRow>
                ))}
                {/* Hiển thị bệnh nhân đang khám nếu có */}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Footer hotline */}
      <div className="bg-green-900 text-white text-center py-3 text-base font-extrabold rounded-b-md flex-shrink-0 tracking-wider select-none">
        <div className="grid grid-cols-12">
        <div className="col-span-4">Tổng đài: 02763 797999</div>
        <div className="col-span-4">Hotline: 1900 561 510</div>
        <div className="col-span-4">Cấp cứu: 0888 79 52 59</div>
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
 