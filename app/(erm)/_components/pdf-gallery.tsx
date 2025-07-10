"use client";

import { useEffect, useRef, useState, memo, useCallback } from "react";
import {
  // Document, Page,
  pdfjs,
} from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import DocxViewer from "./docx-viewer";
import { Label } from "@ui5/webcomponents-react";
import { trpc } from "@/trpc/client";
import Spinner from "@/components/spinner";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const pdfs = [
  {
    id: 1,
    name: "HỒ SƠ BỆNH ÁN",
    url: "/hsba/hsba_trang-bia.docx",
  },
  {
    id: 2,
    name: "PHIẾU KHÁM BỆNH VÀO VIỆN",
    url: "/hsba/phieu-kham-benh-vao-vien.docx",
  },
  {
    id: 3,
    name: "BẢN TÓM TẮT HỒ SƠ BỆNH ÁN",
    url: "/hsba/ban-tom-tat-ho-so-benh-an.docx",
  },
  {
    id: 4,
    name: "PHIẾU CHỈ ĐỊNH CHUẨN ĐOÁN CLS",
    url: "/hsba/phieu-chi-dinh-chuan-doan-cls.docx",
  },
  {
    id: 5,
    name: "KẾT QUẢ XQUANG KỸ THUẬT SỐ",
    url: "/hsba/ket-qua-xquang-ky-thuat-so.docx",
  },
];

interface PdfGalleryProps {
  MaBN: string;
}

function PdfGallery({ MaBN }: PdfGalleryProps) {
  const [data, setData] = useState();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [selected, setSelected] = useState(pdfs[0]);
  const [containerWidth, setContainerWidth] = useState<number>(800);
  const containerRef = useRef<HTMLDivElement>(null);

  console.log("Container width:", containerWidth);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  console.log("MaBN ==================== ", MaBN);

  const { data: dataHsba, isFetching: isFetchingHsba } =
    trpc.Hsba.getDataHsba.useQuery(
      { MaBN },
      { enabled: MaBN && selected.name === "HỒ SƠ BỆNH ÁN" }
    );
  const { data: dataQLyCapTheHsba, isFetching: isFetchingQLyCapTheHsba } =
    trpc.Hsba.getDataQLyCapTheHsba.useQuery(
      { MaBN },
      { enabled: MaBN && selected.name === "HỒ SƠ BỆNH ÁN" }
    );

  const handleDataHsba = useCallback(() => {
    console.log("dataQLyCapTheHsba =========== ", dataQLyCapTheHsba);
    if (!dataQLyCapTheHsba || isFetchingHsba || isFetchingQLyCapTheHsba) return;

    setIsFetching(isFetchingHsba || isFetchingQLyCapTheHsba);

    const data: Record<string, unknown> = {};
    const dtQLyCapThe = dataQLyCapTheHsba[0];

    data.MaBN = dtQLyCapThe.Ma;
    data.Hoten = dtQLyCapThe.Hoten;
    data.Ngaysinh = dtQLyCapThe.Ngaysinh;
    data.Thangsinh = dtQLyCapThe.Thangsinh;
    data.Namsinh = dtQLyCapThe.Namsinh;
    data.SoBHYT = dtQLyCapThe.SoBHYT;
    data.SoCMND = dtQLyCapThe.SoCMND;
    data.Gioitinh = dtQLyCapThe.Gioitinh;
    data.Tuoi = new Date().getFullYear() - (dtQLyCapThe.Namsinh || 0);
    data.products = [
      {
        title: "Duk",
        name: "DukSoftware",
        reference: "DS0",
      },
      {
        title: "Tingerloo",
        name: "Tingerlee",
        reference: "T00",
      },
    ];
    data.users = [
      {
        name: "John",
      },
      {
        name: "Mary",
      },
      {
        name: "Jane",
      },
      {
        name: "Sean",
      },
    ];

    setData(data);

    console.log("dataHsba ==== ", dataHsba);
  }, [dataHsba, isFetchingHsba, dataQLyCapTheHsba, isFetchingQLyCapTheHsba]);

  useEffect(() => {
    switch (selected.name) {
      case "HỒ SƠ BỆNH ÁN":
        handleDataHsba();
        break;
      case "PHIẾU KHÁM BỆNH VÀO VIỆN":
        break;
    }
  }, [selected, handleDataHsba]);

  return (
    <div className="flex w-full h-full overflow-hidden">
      {/* Left Sidebar - Thumbnails */}
      <div className="flex flex-col gap-2 h-full w-28 overflow-y-auto mt-2">
        {pdfs.map((pdf) => (
          <div
            key={pdf.id}
            onClick={() => setSelected(pdf)}
            className={`border w-28 overflow-hidden p-1 rounded cursor-pointer ${
              selected.id === pdf.id ? "ring-2 ring-blue-500" : ""
            }`}>
            <Label className="text-center text-xs font-semibold cursor-pointer">
              {pdf.name}
            </Label>
          </div>
        ))}
      </div>

      {/* Main PDF Viewer */}
      <div className="flex-1" ref={containerRef}>
        {!isFetching && data && (
          <DocxViewer
            title={selected.name}
            urlDocx={selected.url}
            data={data}
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
    </div>
  );
}

export default memo(PdfGallery);
