"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import ClientOnly from "@/components/ClientOnly"
import LoadingFallback from "@/components/LoadingFallback"
import { useParams } from "next/navigation"
import { websocketInstance } from '@/websocket'
import Footer from "@/app/waiting-screen/_components/footer"
import Banner from "@/app/waiting-screen/_components/banner"
import WaitList from "@/app/waiting-screen/_components/wait-list"
import Header from "@/app/waiting-screen/_components/header"
import { eTiepNhanCLS } from "@/enum/cls"
import { getDataPhieuTiepNhanCLS } from "@/app/waiting-screen/_actions/cls"
import { eTrangthai } from "@/enum/status"
import { iClsData } from "@/types/cls"

function XQuangContent() {
  const params = useParams()
  const loaiCls = eTiepNhanCLS[eTiepNhanCLS.XquangCTMRI];
  const idCode = params.code as string

  const [data, setData] = useState<iClsData[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [bannerImage, setBannerImage] = useState("/imgs/hospital-banner.png")

  const fetchData = useCallback(async () => {
    try {
      const dataPhieu = await getDataPhieuTiepNhanCLS(loaiCls, idCode);

      setData(dataPhieu)
    } catch (err) {
      console.error('Lỗi khi tải dữ liệu:', err)
      setError(err instanceof Error ? err.message : 'Lỗi không xác định')
    } finally {
      setLoading(false);
    }
  }, [idCode])

  useEffect(() => {
    fetchData();
  }, [])

  useEffect(() => {
    websocketInstance.connect();
    websocketInstance.onMessage((data) => {
      if (data) {
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

  const getCurPhieu = () => {
    if (!data) return;

    const filter = data.filter(item => {
      console.log('item= ==== ', item.TrangThai)

      return item.TrangThai === eTrangthai[eTrangthai.Đang_thực_hiện]
    })

    if (!filter || filter.length === 0) {
      return data[0];
    };

    return filter[0]
  }

  const getWaitingList = () => {
    if (!data) return [];

    return data.filter(item => {
      console.log('item 111= ==== ', item.TrangThai)

      return item.TrangThai == eTrangthai[eTrangthai.Đang_thực_hiện]
    })
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

  const curPhieu = getCurPhieu()
  const waitingList = getWaitingList()

  return (
    <div className="w-screen h-screen bg-[#e6f3f1] border border-green-600 rounded-md flex flex-col select-none">
      {/* Header */}
      <Header room={{ id: "xquang", name: "Phòng Xquang", code: "xquang" }} />
      <div className="flex flex-grow overflow-hidden">
        {/* Left Column - Banner */}
        <Banner bannerImage={bannerImage} handleImageChange={handleImageChange} />
        {/* Right Column - Patient Info */}
        <WaitList waitingList={waitingList} />
      </div>

      <Footer />
    </div>
  )
}
export default function PageXQuang() {
  return (
    <ClientOnly fallback={<LoadingFallback />}>
      <XQuangContent />
    </ClientOnly>
  )
}
