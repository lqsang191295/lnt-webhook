"use client";

import { useEffect, useRef, useState, memo } from "react";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { Button } from "@ui5/webcomponents-react";
import { saveAs } from "file-saver";
import "@ui5/webcomponents-icons/dist/doc-attachment.js";
import "@ui5/webcomponents-icons/dist/pdf-attachment.js";
import { convertHtmlToPdf } from "../_actions";
import { ToastError } from "@/lib/toast";

// Kiểu rõ ràng cho PizZipUtils
let PizZipUtils: {
  getBinaryContent: (
    url: string,
    callback: (error: Error | null, content: string) => void
  ) => void;
} | null = null;

if (typeof window !== "undefined") {
  import("pizzip/utils/index.js").then((r) => {
    const getBinaryContent =
      (r as { default?: { getBinaryContent?: typeof loadFile } }).default
        ?.getBinaryContent ||
      (r as { getBinaryContent?: typeof loadFile }).getBinaryContent;

    if (getBinaryContent) {
      PizZipUtils = { getBinaryContent };
    } else {
      console.error("Cannot find getBinaryContent in pizzip/utils");
    }
  });
}

type DocxViewerProps = {
  title: string;
  urlDocx: string;
  data: Record<string, unknown>;
};

// Khai báo kiểu cho loadFile
function loadFile(
  url: string,
  callback: (error: Error | null, content: string) => void
) {
  if (!PizZipUtils) {
    console.error("PizZipUtils is not loaded yet.");
    return;
  }
  PizZipUtils.getBinaryContent(url, callback);
}

function DocxViewer({ title, urlDocx, data }: DocxViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [docxBlob, setDocxBlob] = useState<Blob | null>(null);

  useEffect(() => {
    const renderDocx = () => {
      loadFile(urlDocx, (error, content) => {
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

          doc.render(data);
          const blob = doc.getZip().generate({
            type: "blob",
            mimeType:
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          });

          setDocxBlob(blob);
        } catch (err) {
          console.error("Render error:", err);
        }
      });
    };

    renderDocx();
  }, [urlDocx, data]);

  useEffect(() => {
    const container = containerRef.current; // 👈 Ghi lại ref

    const loadDocxPreview = async () => {
      if (docxBlob && container) {
        const { renderAsync } = await import("docx-preview");

        container.innerHTML = "";

        try {
          await renderAsync(docxBlob, container, undefined, {
            className: "docx-wrapper",
            inWrapper: true,
            ignoreWidth: false,
            ignoreHeight: false,
            ignoreFonts: false,
            breakPages: true,
          });
        } catch (error) {
          console.error("Error rendering DOCX:", error);
          container.innerHTML = "<p>Không thể hiển thị tài liệu.</p>";
        }
      }
    };

    loadDocxPreview();

    return () => {
      if (container) {
        container.innerHTML = "";
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
      const content = containerRef.current?.querySelector(
        ".docx-wrapper"
      ) as HTMLElement | null;

      if (!content) {
        return ToastError("Không có nội dung để xuất PDF");
      }

      const base64Pdf: string = await convertHtmlToPdf(content.innerHTML);
      const byteCharacters = atob(base64Pdf);
      const byteNumbers = new Uint8Array(byteCharacters.length);

      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }

      const pdfBlob = new Blob([byteNumbers], { type: "application/pdf" });
      const url = URL.createObjectURL(pdfBlob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "export.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error exporting PDF:", error);
    }
  };

  return (
    <div className="px-4 w-full h-full">
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
      <div
        ref={containerRef}
        id="wrap-container"
        className="w-full h-full overflow-auto"
      />
    </div>
  );
}

export default memo(DocxViewer);
