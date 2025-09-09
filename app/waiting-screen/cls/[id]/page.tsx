"use client";

import { getDataPhieuChidinhDVCT } from "@/app/waiting-screen/_actions/cls";
import Footer from "@/app/waiting-screen/_components/footer";
import Header from "@/app/waiting-screen/_components/header";
import ClientOnly from "@/components/ClientOnly";
import FullscreenToggle from "@/components/full-screen-toggle";
import LoadingFallback from "@/components/LoadingFallback";
import { ListRooms } from "@/constant/cls";
import { eTrangthai } from "@/enum/status";
import { iClsData, iClsGroupData } from "@/types/cls";
import { websocketInstance } from "@/websocket";
import { Clock } from "lucide-react";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import WaitList from "../../_components/wait-list";

const API_BASE_URL = process.env.NEXT_PUBLIC_API || "";

console.log("API_BASE_URL ===  111", API_BASE_URL, process.env);

function PageContent() {
  const params = useParams();
  const id = params.id as string;
  const [data, setData] = useState<iClsData[] | null>(null);

  function getTrangThaiKham(trangthai: (string | null)[]): string | null {
    const allNull = trangthai.every((v) => v === null);
    const allHoanThanh = trangthai.every(
      (v) => v === eTrangthai[eTrangthai.Đã_thực_hiện]
    );

    if (allNull) {
      return null;
    }

    if (allHoanThanh) {
      return eTrangthai[eTrangthai.Đã_thực_hiện];
    }

    return eTrangthai[eTrangthai.Đang_thực_hiện];
  }

  function transform(data: iClsData[]): iClsGroupData[] {
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
      const trangThais = group.map((r) => r.TrangThaiKham);

      result.push({
        STT: stt++,
        MaBN: maBN,
        TrangThaiKham: getTrangThaiKham(trangThais),
        Hoten: hoten,
        Namsinh: namsinh,
      });
    }

    return result;
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
      const trangThais = group.map((r) => r.TrangThaiKham);

      result.push({
        STT: stt++,
        MaBN: maBN,
        TrangThaiKham: getTrangThaiKham(trangThais),
        Hoten: hoten,
        Namsinh: namsinh,
      });
    }

    return result.filter(
      (i) => i.TrangThaiKham !== eTrangthai[eTrangthai.Đã_thực_hiện]
    );
  }

  const getRoom = useCallback(() => {
    const phongban = ListRooms.find((i) => {
      return i.code === id;
    });

    if (phongban) return phongban;

    return;
  }, [id]);

  const fetchData = useCallback(async () => {
    try {
      const room = getRoom();

      if (!room) return;

      const dataPhieu = await getDataPhieuChidinhDVCT(room.nhom);

      setData(dataPhieu);
    } catch (err) {
      console.error("Lỗi khi tải dữ liệu:", err);
    }
  }, [getRoom]);

  useEffect(() => {
    fetchData();

    if (!websocketInstance) return;

    websocketInstance.connect();
    websocketInstance.onMessage((data) => {
      if (data) {
        fetchData();
      }
    });
    return () => {
      websocketInstance.close();
    };
  }, [fetchData]);

  const getCurPhieu = (dataGroup: iClsGroupData[]) => {
    if (!dataGroup) return;

    const filter = dataGroup.filter((item) => {
      return item.TrangThaiKham === eTrangthai[eTrangthai.Đang_thực_hiện];
    });

    if (!filter || filter.length === 0) {
      // return dataGroup[0];
      return;
    }

    return filter[0];
  };

  const getWaitingList = (
    dataGroup: iClsGroupData[],
    exclude?: iClsGroupData
  ) => {
    if (!dataGroup) return [];

    return dataGroup.filter((item) => {
      return !item.TrangThaiKham && item.MaBN !== exclude?.MaBN;
    });
  };

  if (!data) {
    return;
  }

  const dataAll = transform(data);
  const dataGroup = groupAndTransform(data);
  const curPhieu = getCurPhieu(dataGroup);
  const waitingList = getWaitingList(dataGroup, curPhieu);

  console.log("data === ", data);
  console.log("dataGroup === ", dataGroup);
  console.log("curPhieu === ", curPhieu);
  console.log("waitingList === ", waitingList);

  return (
    <div className="w-screen h-screen border-2 border-green-600 flex flex-col select-none">
      <div className="flex flex-row border-b-2 border-green-600">
        {/* Header */}
        <Header />
        {/* Banner */}
        <div className="flex flex-1 flex-col text-green-900 flex-shrink-0 border-l-2 border-green-600 ">
          <div className="flex items-center justify-center border-b-2 border-green-600 font-extrabold text-2xl sm:text-2xl py-2 uppercase">
            PHÒNG {getRoom()?.name}
          </div>
          <div className="flex-1 text-[#c10007]">
            {curPhieu ? (
              <div className="flex flex-col justify-center h-full font-extrabold text-red-500">
                <span className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-center">
                  BỆNH NHÂN ĐANG KHÁM:
                </span>
                <span className="mt-1 truncate text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-center">
                  {curPhieu?.STT}. {curPhieu?.Hoten} - {curPhieu?.Namsinh}
                </span>
              </div>
            ) : (
              <div className="text-center flex flex-col justify-center h-full ">
                <Clock className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-1 lg:mb-2 opacity-50" />
                <p className="text-xs sm:text-sm md:text-base lg:text-lg">
                  Chưa có bệnh nhân
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      {/*  */}
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1">
          <WaitList
            patients={waitingList}
            title="Danh sách chờ"
            className="border-0 border-r-1 border-b-1 border-green-600"
            classText="text-green-500"
          />
        </div>
        <div className="flex-1">
          <WaitList
            patients={dataAll}
            title="Danh sách tiếp nhận"
            className="border-0 border-l-1 border-b-1 border-green-600"
            classText="text-[#193cb8]"
          />
        </div>
      </div>

      <Footer />

      <FullscreenToggle />
    </div>
  );
}
export default function PageId() {
  return (
    <ClientOnly fallback={<LoadingFallback />}>
      <PageContent />
    </ClientOnly>
  );
}
