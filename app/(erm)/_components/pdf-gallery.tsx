"use client";

import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import DocxViewer from "./docx-viewer";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const pdfs = [
  {
    id: 1,
    name: "Hợp đồng A",
    url: "https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf",
  },
  {
    id: 2,
    name: "Báo cáo B",
    url: "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf",
  },
  {
    id: 3,
    name: "Hóa đơn C",
    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    id: 4,
    name: "Tài liệu D",
    url: "https://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf",
  },
  { id: 5, name: "PDF khác", url: "	https://www.orimi.com/pdf-test.pdf" },
];

const MAX_VISIBLE = 4;

export default function PdfGallery() {
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

  return (
    <div className="flex w-full h-full overflow-hidden">
      {/* Left Sidebar - Thumbnails */}
      <div className="flex flex-col gap-2 h-full w-28 overflow-y-auto mt-2">
        {pdfs.slice(0, MAX_VISIBLE).map((pdf) => (
          <div
            key={pdf.id}
            onClick={() => setSelected(pdf)}
            className={`border w-28 h-28 overflow-hidden p-1 rounded cursor-pointer ${
              selected.id === pdf.id ? "ring-2 ring-blue-500" : ""
            }`}>
            <Document file={pdf.url}>
              <Page pageNumber={1} width={80} />
            </Document>
          </div>
        ))}
      </div>

      {/* Main PDF Viewer */}
      <div className="flex-1" ref={containerRef}>
        {/* <Document
          file={selected.url}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}>
          {Array.from(new Array(numPages), (_, i) => (
            <Page
              key={i + 1}
              pageNumber={i + 1}
              width={800} // Adjust width based on container size
              className="mb-4"
            />
          ))}
        </Document> */}
        <DocxViewer
          title="Hồ sơ bệnh án"
          urlDocx="/hsba/hsba_trang-bia.docx"
          data={{
            MaBN: "BA123456",
            Ten: "Nguyễn Văn A",
            NgaySinh: "01/01/1990",
            GioiTinh: "Nam",
            SoCMND: "123456789",
            MaBenhAn: "BA123456",
            NgayVaoVien: "01/01/2023",
            LoaiBenhAn: "Nội trú",
          }}
        />
      </div>
    </div>
  );
}
