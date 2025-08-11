"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { FolderOpen, Calendar, User, VenusAndMars } from "lucide-react";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { getPhieuSieuAm } from "@/actions/bv_phieusieuam";
import { formatDateToDDMMYYYY } from "@/utils/timer";
import { MedicalImageSkeleton } from "./skeleton";
import { ImageDialog } from "@/components/image-dialog";

// Giả định kiểu dữ liệu của ảnh
interface ImageItem {
  Path: string;
  type?: string;
  date?: string;
}

// Giả định kiểu dữ liệu của API trả về
interface PhieuSieuAmData {
  MaBN: string;
  Hoten: string;
  TgSinhFull: string;
  Gioitinh: string;
  Phanloai: string;
  Ngay: string;
  DsHinh: string; // JSON string
}

export default function MedicalImagePage() {
  const params = useParams();
  const { mabn, sovaovien } = params;
  const [data, setData] = useState<PhieuSieuAmData | null>(null);

  // Loại bỏ các state liên quan đến lightbox cũ
  // const [lightboxOpen, setLightboxOpen] = useState(false);
  // const [photoIndex, setPhotoIndex] = useState(0);

  const maBenhNhan = Array.isArray(mabn) ? mabn[0] : mabn;
  const soVaoVien = Array.isArray(sovaovien) ? sovaovien[0] : sovaovien;

  const getData = useCallback(async () => {
    try {
      if (!maBenhNhan || !soVaoVien) return;

      const res = await getPhieuSieuAm(maBenhNhan, soVaoVien);
      if (res && res.data) {
        setData(res.data);
      }
    } catch (ex) {
      console.error(ex);
    }
  }, [maBenhNhan, soVaoVien]);

  const getLoai = () => {
    if (!data) return "";
    switch (data.Phanloai) {
      case "Siêu_âm":
        return "Siêu âm";
      case "SoiCTC":
        return "Soi cổ tử cung";
      case "Siêu_âm_Mắt":
        return "Siêu âm mắt";
      default:
        return data.Phanloai;
    }
  };

  useEffect(() => {
    getData();
  }, [getData]);

  if (!data) {
    return <MedicalImageSkeleton />;
  }

  const images: ImageItem[] = data.DsHinh ? JSON.parse(data.DsHinh) : [];

  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 rounded-t-lg">
        <h1 className="text-2xl font-bold">Xem Hình Ảnh Y Tế</h1>
        <p className="text-sm opacity-80">Hệ thống xem hình ảnh không DICOM</p>
      </div>

      {/* Thông Tin Bệnh Nhân */}
      <Card className="mt-4 shadow-md">
        <CardHeader>
          <div className="flex items-center space-x-2 text-blue-600">
            <FolderOpen className="h-5 w-5" />
            <CardTitle className="text-lg font-semibold">
              Thông Tin Bệnh Nhân
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-gray-700">
            {/* Các trường thông tin bệnh nhân */}
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-gray-200">
                  <User className="h-5 w-5 text-gray-500" />
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <Label className="text-xs text-gray-500">Mã bệnh nhân</Label>
                <span className="font-medium">{data.MaBN}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-gray-200">
                  <User className="h-5 w-5 text-gray-500" />
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <Label className="text-xs text-gray-500">Họ và tên</Label>
                <span className="font-medium">{data.Hoten}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-gray-200">
                  <Calendar className="h-5 w-5 text-gray-500" />
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <Label className="text-xs text-gray-500">Ngày sinh</Label>
                <span className="font-medium">{data.TgSinhFull}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-gray-200">
                  <VenusAndMars className="h-5 w-5 text-gray-500" />
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <Label className="text-xs text-gray-500">Giới tính</Label>
                <span className="font-medium">{data.Gioitinh}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hình Ảnh Y Tế */}
      <Card className="mt-6 shadow-md">
        <CardHeader>
          <div className="flex items-center space-x-2 text-blue-600">
            <FolderOpen className="h-5 w-5" />
            <CardTitle className="text-lg font-semibold">
              Hình Ảnh Y Tế ({images.length} ảnh)
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ImageDialog
            images={images}
            phanLoai={getLoai()}
            ngay={formatDateToDDMMYYYY(data.Ngay)}
          />
        </CardContent>
      </Card>
    </div>
  );
}