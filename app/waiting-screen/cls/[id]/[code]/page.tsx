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

function XQuangContent() {
  const params = useParams()
  const id = params.id as string
  const roomCode = params.code as string
  const [data, setData] = useState<iClsData[] | null>(null)

  function getTrangThaiKham(trangthai: (string | null)[]): string | null {
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

  const getRoom = useCallback(() => {
    const phongban = ListRooms.find(i => {
      return i.code === id
    });

    if (phongban) return phongban;

    return;
  }, [id])

  const fetchData = useCallback(async () => {
    try {
      const room = getRoom();

      if (!room) return;

      const dataPhieu = await getDataPhieuChidinhDVCT(room.nhom, roomCode);

      setData(dataPhieu)
    } catch (err) {
      console.error('Lỗi khi tải dữ liệu:', err)
    }
  }, [getRoom, roomCode])

  useEffect(() => {
    fetchData();

    if(!websocketInstance) return;

    websocketInstance.connect();
    websocketInstance.onMessage((data) => {
      if (data) {
        fetchData();
      }
    });
    return () => {
      websocketInstance.close();
    };
  }, [fetchData])

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

  setTimeout(() => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    }
  }, 1000)

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
    <div className="w-screen h-screen bg-[#e6f3f1] border border-green-600 rounded-md flex flex-col select-none overflow-hidden">
      {/* Header */}
      <Header />

      <div className="flex flex-col lg:flex-row flex-grow overflow-hidden min-h-0">
        {/* Left Column - Banner */}
        <Banner />
        {/* Right Column - Patient Info */}
        <WaitList patients={waitingList} title="" className="" />
      </div>

      {/* Footer */}
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
