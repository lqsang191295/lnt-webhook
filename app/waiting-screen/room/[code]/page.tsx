"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, Users, Clock, ArrowLeft } from "lucide-react"
import TimeDisplay from "@/components/TimeDisplay"
import ClientOnly from "@/components/ClientOnly"
import LoadingFallback from "@/components/LoadingFallback"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Patient, Room } from '@/types/patient'

interface ApiResponse {
  room: Room
  activePatient: {
    HoTen: string
    NamSinh: string
    MaBN: string
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
  const [bannerImage, setBannerImage] = useState("/hospital-banner.png")
  const [isEditingRoom, setIsEditingRoom] = useState(false)

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/waiting-patients?room=${roomCode}`)
      if (!response.ok) {
        throw new Error('Không thể tải dữ liệu')
      }
      const result = await response.json()
      setData(result)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Lỗi không xác định')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 5000) // Cập nhật mỗi 5 giây
    return () => clearInterval(interval)
  }, [roomCode])

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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-blue-600 hover:text-blue-800">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div className="flex items-center gap-4">
              {isEditingRoom ? (
                <div className="flex items-center gap-2">
                  <Input
                    value={room.name}
                    onChange={(e) => setIsEditingRoom(false)}
                    className="text-2xl font-bold text-green-600 bg-white border-2"
                  />
                  <Button onClick={() => setIsEditingRoom(false)} size="sm">
                    Lưu
                  </Button>
                </div>
              ) : (
                <h1
                  className="text-4xl font-bold text-green-600 cursor-pointer hover:text-green-700"
                  onClick={() => setIsEditingRoom(true)}
                >
                  {room.name}
                </h1>
              )}
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-3xl font-bold text-red-600 mb-2">MỜI BỆNH NHÂN</h2>
            <TimeDisplay />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Banner */}
          <div className="space-y-4">
            <Card className="relative overflow-hidden">
              <CardContent className="p-0">
                <div className="relative group cursor-pointer">
                  <img
                    src={bannerImage || "/placeholder.svg"}
                    alt="Hospital Banner"
                    className="w-full h-[630px] object-fill"
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
          <div className="space-y-6">
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
            <Card>
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
                          key={patient.ID}
                          className={`border-b hover:bg-blue-50 ${index === 0 ? "bg-yellow-50" : ""}`}
                        >
                          <td className="px-4 py-3 font-semibold text-blue-800">{index + 1}</td>
                          <td className="px-4 py-3 font-semibold text-blue-800">{patient.HoTen}</td>
                          <td className="px-4 py-3 text-blue-600">{patient.NamSinh}</td>
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
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
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