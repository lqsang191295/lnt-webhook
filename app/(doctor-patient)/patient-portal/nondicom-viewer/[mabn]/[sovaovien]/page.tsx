"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { FolderOpen, Calendar, User, VenusAndMars } from "lucide-react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getPhieuSieuAm } from "@/actions/bv_phieusieuam";
import { formatDateToDDMMYYYY } from "@/utils/timer";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Download, Zoom } from "yet-another-react-lightbox/plugins";

export default function MedicalImagePage() {
  const params = useParams();
  const { mabn, sovaovien } = params;
  const [data, setData] = useState();
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const getData = async () => {
    try {
      if(!mabn || !sovaovien) return;

      const {data} = await getPhieuSieuAm(mabn, sovaovien);

      console.log('aaaaaaaaaaaa ', data)
      setData(data);
    } catch(ex) {
      console.log(ex)
    }
  }

  const getLoai = () => {
    if(!data) return;
    switch (data.Phanloai) {
      case 'Siêu_âm':
        return "Siêu âm";
      case 'SoiCTC':
        return "Soi cổ tử cung";
      case 'SoiCTC':
        return "Soi cổ tử cung";
    }
  }

  useEffect(() => {
    getData();
  }, []);

  if(!data) return;

  const images = data.DsHinh ? JSON.parse(data.DsHinh) : [];
  console.log(' images ==== ', images)
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
                <span className="font-medium">{data.MaBN}</span>
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
          {images.map((image, index) => (
            (image && <div key={index} className="flex flex-col items-center">
              <div
                className="relative border rounded-lg overflow-hidden w-full"
                onClick={() => {
                  setLightboxOpen(true);
                }}
              >
                <Image
                  src={`/api/images/${image.Path}`}
                  alt={`${image.type} - ${image.date}`}
                  width={300} // Thay đổi thành chiều rộng mong muốn
                  height={200} // Thay đổi thành chiều cao mong muốn
                  className="object-cover w-full h-auto cursor-pointer"
                />
              </div>
              <div className="text-center mt-2">
                <p className="font-medium">{getLoai()}</p>
                <p className="text-sm text-gray-500">{formatDateToDDMMYYYY(data.Ngay)}</p>
              </div>
            </div>)
          ))}
        </CardContent>
      </Card>

      {lightboxOpen && (
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={images.map(img => ({ src: `/api/images/${img.Path}` }))}
          plugins={[Download, Zoom]}
          styles={{ container: { backgroundColor: "rgba(0, 0, 0, .8)" } }}
        />
      )}
    </div>
  );
}