import React from "react";

type FilePreviewProps = {
  url: string;
};

export default function FilePreview({ url }: FilePreviewProps) {
  const getFileType = (url: string): "image" | "pdf" | "other" => {
    const ext = url.split(".").pop()?.toLowerCase();
    if (!ext) return "other";
    if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) return "image";
    if (ext === "pdf") return "pdf";
    return "other";
  };

  const fileType = getFileType(url);

  if (fileType === "image") {
    return (
      <div
        className="bg-no-repeat bg-contain bg-center w-full h-full"
        style={{ backgroundImage: `url(${url})` }}
      />
    );
  }

  if (fileType === "pdf") {
    return (
      <iframe
        src={url}
        className="w-full h-full border-none pointer-events-none"
        title="PDF Preview"
      />
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center text-muted">
      Không hỗ trợ hiển thị định dạng này.
    </div>
  );
}