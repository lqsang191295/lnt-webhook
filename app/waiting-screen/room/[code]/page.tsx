"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, Users, Clock, ArrowLeft } from "lucide-react"
import TimeDisplay from "@/components/TimeDisplay"
import ClientOnly from "@/components/ClientOnly"
import LoadingFallback from "@/components/LoadingFallback"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Patient, Room } from '@/types/patient'
import Image from "next/image"
import { websocketInstance } from '@/websocket'
interface ApiResponse {
  room: Room
  activePatient: {
    HoTen: string
    NamSinh: string
    Sovaovien: string
  } | null
  patients: Patient[]
  count: number
}

function RoomDetailContent() {
  const params = useParams()
  const roomCode = params.code as string
  const [data, setData] = useState<ApiResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [bannerImage, setBannerImage] = useState("/imgs/hospital-banner.png")

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

  // Handle banner image change
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setBannerImage(imageUrl)
    }
  }

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
          <div className="w-screen h-screen bg-[#e6f3f1] border border-green-600 rounded-md flex flex-col select-none">
      {/* Header */}
      <div className="grid grid-cols-12 border-b border-green-600 text-green-900 flex-shrink-0">
        <div className="col-span-6 flex items-center justify-center border-r border-green-600 py-5 font-extrabold text-2xl uppercase">
          PHÒNG KHÁM NỘI
        </div>
        <div className="col-span-6 flex flex-col justify-center border-l border-green-600 py-5 font-extrabold text-2xl uppercase leading-tight text-center">
          <span>MỜI BỆNH NHÂN:</span>
          <span className="mt-2 truncate">4063. LÊ THÀNH BẢO KHÔI</span>
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
              BỆNH NHÂN TIẾP THEO
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
                <TableRow className="border-b border-green-200">
                  <TableCell className="text-center py-2">4078</TableCell>
                  <TableCell className="py-2 pl-5">TRẦN THỊ KIM THOA</TableCell>
                  <TableCell className="text-center py-2">1985</TableCell>
                </TableRow>
                <TableRow className="border-b border-green-200">
                  <TableCell className="text-center py-2">4077</TableCell>
                  <TableCell className="py-2 pl-5">PHẠM THỊ QUÝ</TableCell>
                  <TableCell className="text-center py-2">1990</TableCell>
                </TableRow>
                <TableRow className="border-b border-green-200">
                  <TableCell className="text-center py-2">4076</TableCell>
                  <TableCell className="py-2 pl-5">HUỲNH THANH TÂM</TableCell>
                  <TableCell className="text-center py-2">1987</TableCell>
                </TableRow>
                <TableRow className="border-b border-green-200">
                  <TableCell className="text-center py-2">4075</TableCell>
                  <TableCell className="py-2 pl-5">NGUYỄN THỊ THÚY</TableCell>
                  <TableCell className="text-center py-2">1978</TableCell>
                </TableRow>
                <TableRow className="border-b border-green-200">
                  <TableCell className="text-center py-2">4074</TableCell>
                  <TableCell className="py-2 pl-5">ĐẶNG THỊ THU</TableCell>
                  <TableCell className="text-center py-2">1982</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center py-2">4073</TableCell>
                  <TableCell className="py-2 pl-5">LÊ THỊ THANH TÂM</TableCell>
                  <TableCell className="text-center py-2">1993</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Footer hotline */}
      <div className="bg-green-900 text-white text-center py-3 text-base font-extrabold rounded-b-md flex-shrink-0 tracking-wider select-none">
        Hotline hỗ trợ tải &amp; sử dụng App: 0276 3836 991 - 0941 696 939
      </div>
    </div>
    )
  }

  const { room, activePatient, patients, count } = data

  return (
    <div className="h-screen bg-gradient-to-br from-blue-100 to-blue-200 p-4">
      <div className="max-w-7xl mx-auto flex flex-col gap-4 h-full">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-blue-600 hover:text-blue-800">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div className="flex items-center gap-4">
                  <h1
                  className="text-4xl font-bold text-green-600 cursor-pointer hover:text-green-700"                >
                  {room?.name}
                </h1>
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-3xl font-bold text-red-600 mb-2">MỜI BỆNH NHÂN{params.variable}</h2>
            <TimeDisplay />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 overflow-hidden">
          {/* Left Column - Banner */}
          <div className="space-y-4">
            <Card className="relative overflow-hidden h-full w-full p-0">
              <CardContent className="p-0 h-full w-full">
                <div className="relative group cursor-pointer h-full w-full">
                  <Image
                    src={bannerImage || "/placeholder.svg"}
                    alt="Hospital Banner"
                    fill
                    className="object-fill"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Label htmlFor="banner-upload" className="cursor-pointer">
                      <div className="bg-white rounded-lg p-4 flex items-center gap-2">
                        <Upload className="w-5 h-5" />
                        <span>Thay đổi hình ảnh</span>
                      </div>
                    </Label>
                    <Input
                      id="banner-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Patient Info */}
          <div className="space-y-6 flex flex-col overflow-hidden">
            {/* Current Patient */}
            <Card className="border-2 border-red-500">
              <CardHeader className="bg-red-50">
                <CardTitle className="text-center text-2xl text-red-600">BỆNH NHÂN HIỆN TẠI</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {activePatient ? (
                  <div className="text-center">
                    <h3 className="text-3xl font-bold text-blue-800 mb-2">{activePatient.HoTen}</h3>
                    <p className="text-xl text-blue-600">Năm sinh: {activePatient.NamSinh}</p>
                  </div>
                ) : (
                  <div className="text-center text-gray-500">
                    <Clock className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-xl">Chưa có bệnh nhân</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Waiting List */}
            <Card className="flex-1 overflow-hidden pt-6">
              <CardHeader className="bg-blue-50">
                <CardTitle className="text-center text-xl text-blue-800">
                  BỆNH NHÂN TIẾP THEO ({count})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-96 overflow-y-auto">
                  <table className="w-full">
                    <thead className="bg-gray-100 sticky top-0">
                      <tr>
                        <th className="px-4 py-3 text-left font-bold text-blue-800">STT</th>
                        <th className="px-4 py-3 text-left font-bold text-blue-800">HỌ VÀ TÊN</th>
                        <th className="px-4 py-3 text-left font-bold text-blue-800">NĂM SINH</th>
                      </tr>
                    </thead>
                    <tbody>
                      {patients.map((patient, index) => (
                        <tr                      
                          key={index}
                          className={`border-b hover:bg-blue-50 ${index === 0 ? "bg-yellow-50" : ""}`}
                        >
                          <td className="px-4 py-3 font-semibold text-blue-800">{index + 1}</td>
                          <td className="px-4 py-3 font-semibold text-blue-800">{patient.Hoten}</td>
                          <td className="px-4 py-3 text-blue-600">{patient.Namsinh}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {patients.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">Không còn bệnh nhân chờ</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{activePatient ? 1 : 0}</div>
              <div className="text-sm text-gray-600">Đang khám</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">{count}</div>
              <div className="text-sm text-gray-600">Đang chờ</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {count + (activePatient ? 1 : 0)}
              </div>
              <div className="text-sm text-gray-600">Tổng bệnh nhân</div>
            </CardContent>
          </Card>
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
 