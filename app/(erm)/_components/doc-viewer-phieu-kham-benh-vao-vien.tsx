"use client";

import { useEffect, useState, memo, useCallback } from "react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import DocxViewer from "./docx-viewer";
import { Label } from "@ui5/webcomponents-react";
import { trpc } from "@/trpc/client";
import Spinner from "@/components/spinner";
import { formatDateTimeCT } from "@/utils/timer";

interface iDocViewerPkbvvProps {
  MaBN: string;
  Sovaovien: string;
  selected: {
    name: string;
    url: string;
  };
}

function DocViewerPkbvv({ MaBN, Sovaovien, selected }: iDocViewerPkbvvProps) {
  const [dataMain, setDataMain] = useState<Record<string, unknown>>();
  const { data, isFetching } = trpc.Hsba.getDataPhieuKhamBenhVaoVien.useQuery(
    { MaBN, Sovaovien },
    {
      enabled:
        !!MaBN && !!Sovaovien && selected.name === "PHIẾU KHÁM BỆNH VÀO VIỆN",
    }
  );

  const handleDataHsba = useCallback(() => {
    console.log("dataQLyCapTheHsba =========== ", data);
    if (!data || isFetching) return;

    const record: Record<string, unknown> = {};

    const {
      TTBvMaster,
      TTQlyCapThe,
      TTNgheNghiep,
      TTChanDoanPhu,
      TTChanDoanChinh,
    } = data;

    record.MaBN = TTBvMaster.MaBN;
    record.Sovaovien = TTBvMaster.Sovaovien;
    record.Hoten = TTQlyCapThe?.Hoten;
    record.Ngaysinh = TTQlyCapThe?.Ngaysinh;
    record.Thangsinh = TTQlyCapThe?.Thangsinh;
    record.Namsinh = TTQlyCapThe?.Namsinh;
    record.SoBHYT = TTQlyCapThe?.SoBHYT;
    record.SoCMND = TTQlyCapThe?.SoCMND;
    record.Gioitinh = TTQlyCapThe?.Gioitinh;
    record.Diachi = TTQlyCapThe?.Diachi;
    record.Dienthoai = TTQlyCapThe?.Dienthoai;
    record.Tuoi = new Date().getFullYear() - (TTQlyCapThe?.Namsinh || 0);
    record.NgayVaoVien = TTBvMaster.TGVao && formatDateTimeCT(TTBvMaster.TGVao);
    record.NgayRaVien = TTBvMaster.TGRa && formatDateTimeCT(TTBvMaster.TGRa);
    record.CDC_CICD10 = TTChanDoanChinh?.CICD10;
    record.CDC_VVIET = TTChanDoanChinh?.VVIET;
    record.TTChanDoanPhu = TTChanDoanPhu;
    record.TenNgheNghiep = TTNgheNghiep?.Ten;

    setDataMain(record);
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
          data={dataMain}
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

export default memo(DocViewerPkbvv);
