"use client";

import { useEffect, useRef, useState, memo } from "react";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { Button } from "@ui5/webcomponents-react";
import { saveAs } from "file-saver";
import "@ui5/webcomponents-icons/dist/doc-attachment.js";
import "@ui5/webcomponents-icons/dist/pdf-attachment.js";
import { convertHtmlToPdf, convertHtmlToPdfAction } from "../_actions";

let PizZipUtils = null;
if (typeof window !== "undefined") {
  import("pizzip/utils/index.js").then(function (r) {
    PizZipUtils = r;
  });
}
type DocxViewerProps = {
  title: string;
  urlDocx: string; // ví dụ: /hsba/bia.docx
  data: Record<string, any>; // dữ liệu để đổ vào {{ }}
};

function loadFile(url, callback) {
  PizZipUtils.getBinaryContent(url, callback);
}

function DocxViewer({ title, urlDocx, data }: DocxViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [docxBlob, setDocxBlob] = useState<Blob | null>(null);

  useEffect(() => {
    const renderDocx = () => {
      loadFile(urlDocx, async (error: any, content: any) => {
        if (error) {
          console.error("Failed to load .docx file:", error);
          return;
        }

        try {
          const zip = new PizZip(content);
          const doc = new Docxtemplater(zip, {
            linebreaks: true,
            paragraphLoop: true,
          });
          // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
          doc.render(data);
          const blob = doc.getZip().generate({
            type: "blob",
            mimeType:
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          });
          // Output the document using Data-URI

          setDocxBlob(blob);
        } catch (err) {
          console.error("Render error:", err);
        }
      });
    };

    renderDocx();
  }, [urlDocx, data]);

  useEffect(() => {
    const loadDocxPreview = async () => {
      if (docxBlob && containerRef.current) {
        // Import động thư viện chỉ khi cần thiết và trên client
        const { renderAsync } = await import("docx-preview");

        // Xóa nội dung cũ trong container trước khi render mới
        containerRef.current.innerHTML = "";

        try {
          await renderAsync(docxBlob, containerRef.current, null, {
            className: "docx-wrapper", // Thêm class cho container
            inWrapper: true, // Bao bọc nội dung trong một div
            ignoreWidth: false, // Tôn trọng chiều rộng của tài liệu
            ignoreHeight: false, // Tôn trọng chiều cao của tài liệu
            ignoreFonts: false, // Tôn trọng font của tài liệu
            breakPages: true, // Chia trang nếu cần
            // Các tùy chọn khác...
          });
        } catch (error) {
          console.error("Error rendering DOCX:", error);
          containerRef.current.innerHTML =
            "<p>Không thể hiển thị tài liệu.</p>";
        }
      }
    };

    loadDocxPreview();

    // Cleanup: Khi component unmount, xóa nội dung
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [docxBlob]);

  const downloadDocx = () => {
    if (docxBlob) {
      saveAs(docxBlob, `${title}.docx`);
    }
  };

  const downloadPdf = async () => {
    try {
      const html = containerRef.current?.outerHTML || "";
      if (!html) return alert("Không có nội dung");

      const url = await convertHtmlToPdfAction(html);
      const response = await fetch(url);
      const blob = await response.blob();

      saveAs(blob, "exported.pdf");
    } catch (error) {
      console.error("Error exporting PDF:", error);
    } finally {
    }
  };

  return (
    <div className="p-4 w-full h-full">
      <div className="flex items-center justify-between w-full mb-2">
        <h2 className="font-semibold text-lg mb-2">{title}</h2>
        <div className="flex gap-2">
          <Button
            design="Default"
            icon="doc-attachment"
            className="border"
            onClick={downloadDocx}>
            Download docx
          </Button>
          <Button
            design="Default"
            icon="pdf-attachment"
            className="border"
            onClick={downloadPdf}>
            Download pdf
          </Button>
        </div>
      </div>
      <div ref={containerRef} className="w-full h-full overflow-auto" />
    </div>
  );
}

export default memo(DocxViewer);
