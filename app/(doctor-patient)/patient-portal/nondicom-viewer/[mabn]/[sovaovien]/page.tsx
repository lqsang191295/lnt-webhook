"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { trpc } from '@/trpc/client';
import { useRouter } from 'next/router';
// Icons (ví dụ, bạn có thể cần cài thêm react-icons hoặc lucide-react)
import { FolderOpen, Calendar, User, VenusAndMars } from "lucide-react";
import { useParams } from "next/navigation";

export default function MedicalImagePage() {
  const params = useParams();
  const { mabn, sovaovien } = params;
  const { data: phieuSieuam, isLoading, isError, error } = trpc.bV_PhieuSieuam.getBy_MaBN_SoVaoVien.useQuery({
    MaBN: mabn,
    SoVaoVien: sovaovien,
  });

  console.log('zzzzzzzzzzzzzzzzzzzzzzzzzz ', params, phieuSieuam)

  const patient = {
    maBenhNhan: "727131",
    hoVaTen: "BEAN KIMSRENG",
    ngaySinh: "1/1/1969",
    gioiTinh: "Nam",
  };

  const images = [
    {
      type: "Siêu âm",
      date: "25/7/2025",
      src: "https://via.placeholder.com/400x300.png?text=Ultrasound+Image+1", // Thay bằng URL ảnh thực tế
    },
    {
      type: "Siêu âm",
      date: "25/7/2025",
      src: "https://via.placeholder.com/400x300.png?text=Ultrasound+Image+2", // Thay bằng URL ảnh thực tế
    },
  ];

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
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-gray-200">
                  <User className="h-5 w-5 text-gray-500" />
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <Label className="text-xs text-gray-500">Mã bệnh nhân</Label>
                <span className="font-medium">{patient.maBenhNhan}</span>
              </div>
            </div>
            {/* ...Các trường thông tin khác tương tự... */}
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-gray-200">
                  <User className="h-5 w-5 text-gray-500" />
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <Label className="text-xs text-gray-500">Họ và tên</Label>
                <span className="font-medium">{patient.hoVaTen}</span>
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
                <span className="font-medium">{patient.ngaySinh}</span>
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
                <span className="font-medium">{patient.gioiTinh}</span>
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
          {images.map((image, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="relative border rounded-lg overflow-hidden">
                <img
                  src={image.src}
                  alt={`${image.type} - ${image.date}`}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="text-center mt-2">
                <p className="font-medium">{image.type}</p>
                <p className="text-sm text-gray-500">{image.date}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}