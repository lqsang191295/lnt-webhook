"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Building2 } from 'lucide-react'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import TimeDisplay from '@/components/TimeDisplay'
import { Room } from '@/types/patient'

interface ApiResponse {
  rooms: Room[]
  totalRooms: number
}

export default function DashboardPage() {
  const [data, setData] = useState<ApiResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const fetchData = async () => {
    try {
      const response = await fetch('/api/waiting-patients', {
        method: 'POST',
        body: "0",
      })
      if (!response.ok) {
        throw new Error('Không thể tải dữ liệu')
      }
      const result = await response.json()
      console.log('Dữ liệu từ API:', result)
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

  const { rooms, totalRooms } = data

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
              <p className="text-sm text-blue-800">Tổng số phòng khám: {totalRooms}</p>
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-2xl font-bold text-red-600 mb-2">TỔNG QUAN</h2>
            <TimeDisplay />
          </div>
        </div>

        {/* Danh sách phòng khám */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {rooms.map((room) => (
            <Link key={room.id} href={`/waiting-screen/room/${room.code}`}>
              <Card className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105`}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-center text-blue-800">
                    {room.name}
                  </CardTitle>
                  <p className="text-sm text-center text-gray-600">
                    {room.description}
                  </p>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>

        {/* Footer */}
      </div>
    </div>
  )
}