"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Building2, ArrowRight, Users, Clock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import TimeDisplay from '@/components/TimeDisplay'
import { Room, Patient } from '@/app/types/patient'
import { formatTime } from '@/app/utils/timeUtils'
import ClientOnly from '@/components/ClientOnly'

interface ApiResponse {
  rooms: (Room & {
    patients: Patient[]
    activePatient: {
      HoTen: string
      NamSinh: string
      MaBN: string
      Sovaovien: string
    } | null
    count: number
  })[]
  totalPatients: number
  totalActivePatients: number
  totalRooms: number
}

export default function DashboardPage() {
  const [data, setData] = useState<ApiResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      const response = await fetch('/api/waiting-patients')
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
  }, [])

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
          <p className="text-gray-600 mb-4">{error || 'Không thể tải dữ liệu dashboard'}</p>
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

  const { rooms, totalPatients, totalActivePatients, totalRooms } = data

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Building2 className="w-12 h-12 text-blue-600" />
            <div>
              <h1 className="text-4xl font-bold text-blue-800">HỆ THỐNG MÀN HÌNH CHỜ</h1>
              <p className="text-lg text-blue-600">Bệnh viện Đa khoa</p>
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-2xl font-bold text-red-600 mb-2">TỔNG QUAN</h2>
            <TimeDisplay />
          </div>
        </div>

        {/* Thống kê tổng quan */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{totalRooms}</div>
              <div className="text-sm text-blue-800">Tổng số phòng khám</div>
            </CardContent>
          </Card>
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{totalActivePatients}</div>
              <div className="text-sm text-green-800">Đang khám</div>
            </CardContent>
          </Card>
          <Card className="bg-orange-50 border-orange-200">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">{totalPatients}</div>
              <div className="text-sm text-orange-800">Tổng bệnh nhân chờ</div>
            </CardContent>
          </Card>
          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {Math.round((totalPatients + totalActivePatients) / Math.max(totalRooms, 1))}
              </div>
              <div className="text-sm text-purple-800">Trung bình/phòng</div>
            </CardContent>
          </Card>
        </div>

        {/* Danh sách phòng khám */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {rooms.map((room) => (
            <Link key={room.id} href={`/room/${room.code}`}>
              <Card className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                room.count > 0 || room.activePatient ? 'border-2 border-green-500 bg-green-50' : 'border-2 border-gray-200'
              }`}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-center text-blue-800">
                    {room.name}
                  </CardTitle>
                  <p className="text-sm text-center text-gray-600">
                    {room.description}
                  </p>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-center">
                    <div className={`text-4xl font-bold mb-2 ${
                      room.count > 0 || room.activePatient ? 'text-green-600' : 'text-gray-400'
                    }`}>
                      {room.count + (room.activePatient ? 1 : 0)}
                    </div>
                    <div className="text-sm text-gray-600 mb-4">
                      {room.count > 0 || room.activePatient ? 'Bệnh nhân' : 'Không có bệnh nhân'}
                    </div>

                    {/* Hiển thị bệnh nhân đang khám */}
                    {room.activePatient && (
                      <div className="bg-green-100 border border-green-300 rounded-lg p-3 mb-3">
                        <div className="text-xs text-green-800 font-semibold mb-1">ĐANG KHÁM</div>
                        <div className="text-sm font-semibold text-green-700 truncate">
                          {room.activePatient.HoTen}
                        </div>
                        <div className="text-xs text-green-600">
                          {room.activePatient.NamSinh}
                        </div>
                      </div>
                    )}

                    {/* Hiển thị bệnh nhân tiếp theo */}
                    {room.count > 0 && (
                      <div className="space-y-2">
                        <div className="text-xs text-gray-500">Bệnh nhân tiếp theo:</div>
                        <div className="text-sm font-semibold text-blue-800 truncate">
                          {room.patients[0]?.HoTen || 'N/A'}
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-4 flex items-center justify-center gap-2 text-blue-600">
                      <span className="text-sm">Xem chi tiết</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-600">
          <p>Hệ thống tự động cập nhật mỗi 5 giây</p>
          <p className="text-sm mt-1">© 2024 Bệnh viện Đa khoa</p>
        </div>
      </div>
    </div>
  )
}