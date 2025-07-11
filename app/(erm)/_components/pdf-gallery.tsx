"use client";

import { useState, memo } from "react";
import {
  // Document, Page,
  pdfjs,
} from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import DocViewerHsba from "./doc-viewer-hsba";
import DocViewerPkbvv from "./doc-viewer-phieu-kham-benh-vao-vien";
import DocViewerTomTatHsba from "./doc-viewer-tom-tat-hsba";
import { Label } from "@ui5/webcomponents-react";

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
  Sovaovien: string;
}

function PdfGallery({ MaBN, Sovaovien }: PdfGalleryProps) {
  const [selected, setSelected] = useState(pdfs[0]);

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
      <div className="flex-1">
        {selected.name === "HỒ SƠ BỆNH ÁN" && (
          <DocViewerHsba
            selected={selected}
            MaBN={MaBN}
            Sovaovien={Sovaovien}
          />
        )}
        {selected.name === "PHIẾU KHÁM BỆNH VÀO VIỆN" && (
          <DocViewerPkbvv
            selected={selected}
            MaBN={MaBN}
            Sovaovien={Sovaovien}
          />
        )}
        {selected.name === "BẢN TÓM TẮT HỒ SƠ BỆNH ÁN" && (
          <DocViewerTomTatHsba
            selected={selected}
            MaBN={MaBN}
            Sovaovien={Sovaovien}
          />
        )}
        {selected.name === "PHIẾU CHỈ ĐỊNH CHUẨN ĐOÁN CLS" && (
          <DocViewerTomTatHsba
            selected={selected}
            MaBN={MaBN}
            Sovaovien={Sovaovien}
          />
        )}
        {selected.name === "KẾT QUẢ XQUANG KỸ THUẬT SỐ" && (
          <DocViewerTomTatHsba
            selected={selected}
            MaBN={MaBN}
            Sovaovien={Sovaovien}
          />
        )}
      </div>
    </div>
  );
}

export default memo(PdfGallery);
