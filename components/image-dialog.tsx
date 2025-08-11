"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Download, ZoomIn, ZoomOut, X } from "lucide-react";

interface ImageItem {
  Path: string;
}

interface ImageDialogProps {
  images: ImageItem[];
  phanLoai?: string;
  ngay?: string;
}

export function ImageDialog({ images, phanLoai, ngay }: ImageDialogProps) {
  const [open, setOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
   const [zoomLevel, setZoomLevel] = useState(0.5);

  const handleOpen = (index: number) => {
    setCurrentImageIndex(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNext = () => {
    setCurrentImageIndex((currentImageIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentImageIndex((currentImageIndex - 1 + images.length) % images.length);
  };

  const handleDownload = () => {
    if (images.length > 0) {
      const imageUrl = `/api/images/${encodeURIComponent(images[currentImageIndex].Path)}`;
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = images[currentImageIndex].Path.split('/').pop() || 'image.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleZoomIn = () => {
    setZoomLevel(prevZoom => Math.min(prevZoom + 0.1, 1)); 
  };

  const handleZoomOut = () => {
    setZoomLevel(prevZoom => Math.max(prevZoom - 0.1, 0.1)); 
  };

  return (
    <>
    {images.map((image, index) => (
        image && <div key={index} className="flex flex-col items-center">
          <div
            className="relative border rounded-lg overflow-hidden w-full cursor-pointer"
            onClick={() => handleOpen(index)}
          >
            <Image
              src={`/api/images/${encodeURIComponent(image.Path)}`}
              alt={`${phanLoai || "Ảnh y tế"} - ${ngay || "N/A"}`}
              width={300}
              height={200}
              className="object-cover w-full h-auto"
            />
          </div>
          <div className="text-center mt-2">
            <p className="font-medium">{phanLoai}</p>
            <p className="text-sm text-gray-500">{ngay}</p>
          </div>
        </div>
      ))}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-full h-full p-4 [&>button.absolute.top-4.right-4]:hidden" style={{ maxWidth: 'unset', background: '#00000050' }} >
          <div className="relative flex-grow flex items-center justify-center bg-opacity-75 rounded-lg overflow-hidden">
            <Image
              src={`/api/images/${encodeURIComponent(images[currentImageIndex]?.Path || '')}`}
              alt={`Image ${currentImageIndex + 1}`}
              fill // Sử dụng prop fill để hình ảnh lấp đầy container
              className="object-contain transition-transform duration-200"
              style={{ transform: `scale(${zoomLevel})` }} // Áp dụng mức zoom
            />
            {/* Navigation buttons */}
            <Button
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-40 text-white"
              onClick={handlePrev}
            >
              <ChevronLeft size={24} />
            </Button>
            <Button
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-40 text-white"
              onClick={handleNext}
            >
              <ChevronRight size={24} />
            </Button>
            
            {/* Action buttons (Download, Zoom, Close) */}
            <div className="absolute top-4 right-4 flex space-x-2">
              <Button onClick={handleDownload} className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-40 text-white">
                <Download size={20} />
              </Button>
              {/* Thêm nút Zoom nếu cần */}
               <Button onClick={handleZoomIn} className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-40 text-white">
                <ZoomIn size={20} />
              </Button>
              <Button onClick={handleZoomOut} className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-40 text-white">
                <ZoomOut size={20} />
              </Button>
              <Button onClick={handleClose} className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-40 text-white">
                <X size={20} />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}