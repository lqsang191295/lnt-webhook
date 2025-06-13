"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
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
import Image from "next/image"
import { websocketInstance } from '@/websocket'
import Header from "../../_components/header"
import Footer from "../../_components/footer"
import Banner from "../../_components/banner"
import CurrentPatient from "../../_components/current-patient"
import WaitList from "../../_components/wait-list"
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
    <div className="h-screen bg-gradient-to-br from-blue-100 to-blue-200 p-4">
      <div className="max-w-7xl mx-auto flex flex-col gap-4 h-full">
        {/* Header */}
        <Header room={room} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 overflow-hidden">
          {/* Left Column - Banner */}
          <Banner bannerImage={bannerImage} handleImageChange={handleImageChange} />

          {/* Right Column - Patient Info */}
          <div className="space-y-6 flex flex-col overflow-hidden">
            {/* Current Patient */}
            <CurrentPatient activePatient={activePatient} />

            {/* Waiting List */}
            <WaitList count={count} patients={patients} />
          </div>
        </div>

        {/* Footer Stats */}
        <Footer activePatient={activePatient} count={count} />
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
 