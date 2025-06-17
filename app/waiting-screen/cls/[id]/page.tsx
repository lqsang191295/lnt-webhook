"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import ClientOnly from "@/components/ClientOnly"
import LoadingFallback from "@/components/LoadingFallback"
import { websocketInstance } from '@/websocket'
import Footer from "@/app/waiting-screen/_components/footer"
import Banner from "@/app/waiting-screen/_components/banner"
import WaitList from "@/app/waiting-screen/_components/wait-list"
import Header from "@/app/waiting-screen/_components/header"
import { getDataPhieuChidinhDVCT } from "@/app/waiting-screen/_actions/cls"
import { eTrangthai } from "@/enum/status"
import { iClsData, iClsGroupData } from "@/types/cls"
import { useParams } from "next/navigation"
import { ListRooms } from "@/constant/cls"

function PageContent() {
  const params = useParams()
  const id = params.id as string
  const [data, setData] = useState<iClsData[] | null>(null)
  const [bannerImage, setBannerImage] = useState("/imgs/hospital-banner.png")

  function getTrangThaiKham(trangthai: (string | null)[]): string | null {
    const hasNull = trangthai.some(v => v === null);
    const allNull = trangthai.every(v => v === null);
    const allHoanThanh = trangthai.every(v => v === eTrangthai[eTrangthai.Đã_thực_hiện]);

    if (allNull) {
      return null;
    }

    if (allHoanThanh) {
      return eTrangthai[eTrangthai.Đã_thực_hiện];
    }

    return eTrangthai[eTrangthai.Đang_thực_hiện];
  }

  function groupAndTransform(data: iClsData[]): iClsGroupData[] {
    const grouped = new Map<string, iClsData[]>();

    // Nhóm theo MaBN
    for (const row of data) {
      if (!grouped.has(row.MaBN)) grouped.set(row.MaBN, []);
      grouped.get(row.MaBN)!.push(row);
    }

    // Tính trạng thái ưu tiên và thêm STT
    const result: iClsGroupData[] = [];
    let stt = 1;

    for (const [maBN, group] of grouped) {
      const hoten = group[0].Hoten;
      const namsinh = group[0].Namsinh;
      const trangThais = group.map(r => r.TrangThaiKham);

      result.push({
        STT: stt++,
        MaBN: maBN,
        TrangThaiKham: getTrangThaiKham(trangThais),
        Hoten: hoten,
        Namsinh: namsinh,
      });
    }

    return result.filter(i => i.TrangThaiKham !== eTrangthai[eTrangthai.Đã_thực_hiện]);
  }

  const getRoom = () => {
    const phongban = ListRooms.find(i => {
      return i.code === id
    });

    if (phongban) return phongban;

    return;
  }

  const fetchData = useCallback(async () => {
    try {
      const room = getRoom();

      if(!room) return;

      const dataPhieu = await getDataPhieuChidinhDVCT(room.nhom);

      setData(dataPhieu)
    } catch (err) {
      console.error('Lỗi khi tải dữ liệu:', err)
    }
  }, [id])

  useEffect(() => {
    fetchData();

    websocketInstance.connect();
    websocketInstance.onMessage((data) => {
      if (data) {
        fetchData();
      }
    });
    return () => {
      websocketInstance.close();
    };
  }, [])

  // Handle banner image change
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setBannerImage(imageUrl)
    }
  }

  const getCurPhieu = (dataGroup: iClsGroupData[]) => {
    if (!dataGroup) return;

    const filter = dataGroup.filter(item => {
      return item.TrangThaiKham === eTrangthai[eTrangthai.Đang_thực_hiện]
    })

    if (!filter || filter.length === 0) {
      return dataGroup[0];
    };

    return filter[0]
  }

  const getWaitingList = (dataGroup: iClsGroupData[], exclude?: iClsGroupData) => {
    if (!dataGroup) return [];

    return dataGroup.filter(item => {
      return !item.TrangThaiKham && item.MaBN !== exclude?.MaBN
    })
  }

  if (!data) {
    return;
  }

  const dataGroup = groupAndTransform(data);
  const curPhieu = getCurPhieu(dataGroup)
  const waitingList = getWaitingList(dataGroup, curPhieu)

  console.log('data === ', data)
  console.log('dataGroup === ', dataGroup)
  console.log('curPhieu === ', curPhieu)
  console.log('waitingList === ', waitingList)

  return (
    <div className="w-screen h-screen bg-[#e6f3f1] border border-green-600 rounded-md flex flex-col select-none">
      {/* Header */}
      <Header room={getRoom()} activePatient={curPhieu} />
      <div className="flex flex-grow overflow-hidden">
        {/* Left Column - Banner */}
        <Banner bannerImage={bannerImage} handleImageChange={handleImageChange} />
        {/* Right Column - Patient Info */}
        <WaitList patients={waitingList} />
      </div>

      <Footer />
    </div>
  )
}
export default function PageId() {
  return (
    <ClientOnly fallback={<LoadingFallback />}>
      <PageContent />
    </ClientOnly>
  )
}
