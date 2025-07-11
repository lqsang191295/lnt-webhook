"use client";

import { useEffect, useState, memo, useCallback } from "react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import DocxViewer from "./docx-viewer";
import { Label } from "@ui5/webcomponents-react";
import { trpc } from "@/trpc/client";
import Spinner from "@/components/spinner";
import { formatDateTimeCT } from "@/utils/timer";

interface iDocViewerTomTatHsbaProps {
  MaBN: string;
  Sovaovien: string;
  selected: {
    name: string;
    url: string;
  };
}

function DocViewerTomTatHsba({
  MaBN,
  Sovaovien,
  selected,
}: iDocViewerTomTatHsbaProps) {
  const [mainData, setMainData] = useState<Record<string, unknown>>();

  const { data, isFetching } = trpc.Hsba.getDataHsba.useQuery(
    { MaBN, Sovaovien },
    { enabled: !!MaBN && !!Sovaovien && selected.name === "HỒ SƠ BỆNH ÁN" }
  );

  const handleDataHsba = useCallback(() => {
    console.log("dataQLyCapTheHsba =========== ", data);
    if (!data || isFetching) return;

    const record: Record<string, unknown> = {};
    const dtQLyCapThe = data.TTQLyCapThe;
    const dtChanDoanChinh = data.TTChanDoanChinh;

    record.MaBN = data.MaBN;
    record.Sovaovien = data.Sovaovien;
    record.Hoten = dtQLyCapThe?.Hoten;
    record.Thangsinh = dtQLyCapThe?.Thangsinh;
    record.Namsinh = dtQLyCapThe?.Namsinh;
    record.SoBHYT = dtQLyCapThe?.SoBHYT;
    record.SoCMND = dtQLyCapThe?.SoCMND;
    record.Gioitinh = dtQLyCapThe?.Gioitinh;
    record.Tuoi = new Date().getFullYear() - (dtQLyCapThe?.Namsinh || 0);
    record.NgayVaoVien = data.TGVao && formatDateTimeCT(data.TGVao);
    record.NgayRaVien = data.TGRa && formatDateTimeCT(data.TGRa);
    record.CDC_CICD10 = dtChanDoanChinh?.CICD10;
    record.CDC_VVIET = dtChanDoanChinh?.VVIET;
    record.TTChanDoanPhu = data.TTChanDoanPhu;

    setMainData(record);
  }, [data, isFetching]);

  useEffect(() => {
    handleDataHsba();
  }, [handleDataHsba]);

  return (
    <div className="w-full h-full">
      {!isFetching && data && (
        <DocxViewer
          title={selected.name}
          urlDocx={selected.url}
          data={mainData}
        />
      )}
      {isFetching && (
        <div className="flex items-center justify-center h-full">
          <Spinner />
          <Label className="text-center text-xs font-semibold">
            Đang tải dữ liệu...
          </Label>
        </div>
      )}
    </div>
  );
}

export default memo(DocViewerTomTatHsba);
