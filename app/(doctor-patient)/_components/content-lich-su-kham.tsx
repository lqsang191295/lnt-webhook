"use client";

import { useState } from "react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Calendar as CalendarIcon, FileText } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { trpc } from "@/trpc/client";
import { useParams } from "next/navigation";
import Spinner from "@/components/spinner";
import { formatDateTimeCT, formatDateToDDMMYYYY } from "@/utils/timer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { formatVND } from "@/utils/number";

interface iQueryInput {
  maBN: string;
  TuNgay?: string;
  DenNgay?: string;
}

interface iQueryPcdDVInput {
  maBN: string;
  Ngay: string;
}

interface iData {
  Sovaovien: string;
  TGVao: string;
  TTPhongKham?: { Ten: string };
  TTBacsi?: { Ten: string };
  LydoVV: string;
  TTChanDoanChinh?: { VVIET: string };
  TTChanDoanPhu?: { VVIET: string };
  ChandoanKhac: string;
  Ngay: string;
  ID: string;
}

interface iDataPcdDV {
  ID: string;
  Ngay: string;
  TTBacsiKham?: { Ten: string };
  TTPhongKham?: { Ten: string };
  Chandoan: string;
  BV_PhieuChidinhDVCT: Array<iDataPcdDVCT>;
}

interface iDataPcdDVCT {
  ID: string;
  MaDV: string;
  TenDV: string;
  TTNguoiChiDinh?: { Ten: string };
  TTNguoithuchien?: { Ten: string };
  Soluong: number;
  Dongia: number;
  DongiaBH: number;
  Tongchiphi: number;
  Ketqua: string;
  Dathuchien: boolean;
}

interface iDataToaThuoc {
  ID: string;
  Ngay: string;
  TTBacsiKeToa?: { Ten: string };
  TTPhongKham?: { Ten: string };
  Ghichu: string;
  BV_ToathuocCT: Array<iDataToaThuocCT>;
}

interface iDataToaThuocCT {
  ID: string;
  Ma: string;
  Ten: string;
  Hoatchat: string;
  Hamluong: string;
  TTBsKetoa?: { Ten: string };
  Soluong: number;
  Dongia: number;
  DongiaBH: number;
  Ghichu: string;
}
export default function ContentLichSuKham() {
  const params = useParams();
  const maBN = params.patient_id as string;

  const today = new Date();
  const [fromDate, setFromDate] = useState<Date | undefined>(today);
  const [toDate, setToDate] = useState<Date | undefined>(today);
  // const [selected, setSelected] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [queryInput, setQueryInput] = useState<iQueryInput | null>(null);
  const [queryPcdDVInput, setQueryPcdDVInput] =
    useState<iQueryPcdDVInput | null>(null);

  const { data, isFetching } = trpc.BV_Master.getByMaBN.useQuery(queryInput!, {
    enabled: !!queryInput, // chỉ chạy nếu có input
  });
  const { data: dataPcdDV } = trpc.BV_PhieuChidinhDV.getByMaBN.useQuery(
    queryPcdDVInput!,
    {
      enabled: !!queryPcdDVInput, // chỉ chạy nếu có input
    }
  );
  const { data: dataToaThuoc } = trpc.BV_Toathuoc.getByMaBN.useQuery(
    queryPcdDVInput!,
    {
      enabled: !!queryPcdDVInput, // chỉ chạy nếu có input
    }
  );

  console.log("data ==== ", data);
  console.log("dataPcdDV ==== ", dataPcdDV);
  console.log("dataToaThuoc ===== ", dataToaThuoc);

  const handleFilter = () => {
    if (!fromDate || !toDate) {
      alert("Vui lòng chọn cả hai ngày");
      return;
    }

    const from = new Date(format(fromDate, "yyyy-MM-dd"));
    const to = new Date(format(toDate, "yyyy-MM-dd"));
    setQueryInput({
      maBN,
      TuNgay: from.toISOString(),
      DenNgay: to.toISOString(),
    });
  };

  const handleGetAll = () => {
    setQueryInput({ maBN }); // không lọc theo ngày
  };

  const openDetail = (item: iData) => {
    // setSelected(item);
    setOpen(true);

    setQueryPcdDVInput({
      maBN,
      Ngay: item.Ngay,
    });

    console.log("asdasd ", {
      maBN,
      Ngay: item.Ngay,
    });
  };

  return (
    <div className="w-full h-full bg-white flex flex-col">
      <header className="p-4">
        <Label className="text-2xl font-semibold">Lịch sử khám</Label>
      </header>

      <main className="overflow-auto p-4 w-full h-full space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="w-full flex gap-2">
            <div className="flex flex-col flex-1 space-y-1">
              <Label>Từ ngày</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {fromDate ? (
                      format(fromDate, "dd/MM/yyyy")
                    ) : (
                      <span>Chọn ngày</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={fromDate}
                    onSelect={setFromDate}
                    locale={vi}
                    required={false}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex flex-col flex-1 space-y-1">
              <Label>Đến ngày</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {toDate ? (
                      format(toDate, "dd/MM/yyyy")
                    ) : (
                      <span>Chọn ngày</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={toDate}
                    onSelect={setToDate}
                    locale={vi}
                    required={false}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleFilter}>Lấy dữ liệu</Button>
            <Button variant="secondary" onClick={handleGetAll}>
              Lấy toàn bộ
            </Button>
          </div>
        </div>

        <div className="border rounded-lg overflow-auto">
          {isFetching && (
            <div className="w-full h-full flex justify-center items-center gap-1">
              <Spinner /> Loading...
            </div>
          )}
          {!isFetching && data && data.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Số vào viện</TableHead>
                  <TableHead>Ngày khám</TableHead>
                  <TableHead>Phòng khám</TableHead>
                  <TableHead>Bác sĩ</TableHead>
                  <TableHead>Lý do vào viện</TableHead>
                  <TableHead>Chẩn đoán chính</TableHead>
                  <TableHead>Chẩn đoán phụ</TableHead>
                  <TableHead>Chẩn đoán khác</TableHead>
                  <TableHead className="text-right">Chi tiết</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item: iData) => (
                  <TableRow key={item.ID}>
                    <TableCell>{item.Sovaovien}</TableCell>
                    <TableCell>{formatDateTimeCT(item.TGVao || "")}</TableCell>
                    <TableCell>{item.TTPhongKham?.Ten}</TableCell>
                    <TableCell>{item.TTBacsi?.Ten}</TableCell>
                    <TableCell>{item.LydoVV}</TableCell>
                    <TableCell>{item.TTChanDoanChinh?.VVIET}</TableCell>
                    <TableCell>{item.TTChanDoanPhu?.VVIET}</TableCell>
                    <TableCell>{item.ChandoanKhac}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openDetail(item)}>
                        <FileText className="w-4 h-4 mr-1" /> Xem chi tiết
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {!isFetching && data && data.length === 0 && (
            <div className="flex justify-center items-center p-4">
              <Label>Không có dữ liệu</Label>
            </div>
          )}
        </div>
      </main>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-full h-full flex flex-col md:!max-w-9/12 md:h-9/12 !max-w-full p-2 md:p-6">
          <DialogHeader>
            <DialogTitle>Chi tiết lần khám</DialogTitle>
          </DialogHeader>
          {/* Chi tiết dữ liệu selected nếu cần */}
          <Tabs
            defaultValue="canlamsang"
            className="w-full overflow-hidden flex-1">
            <TabsList className="mb-4">
              <TabsTrigger value="canlamsang">Cận lâm sàng</TabsTrigger>
              <TabsTrigger value="toathuoc">Toa thuốc</TabsTrigger>
            </TabsList>

            {/* Tab: Cận lâm sàng */}
            <TabsContent value="canlamsang" className="overflow-auto">
              <Accordion
                type="multiple"
                className="w-full space-y-2 overflow-auto">
                {dataPcdDV &&
                  dataPcdDV.length > 0 &&
                  dataPcdDV?.map((phieu: iDataPcdDV) => (
                    <AccordionItem
                      value={phieu.ID}
                      key={phieu.ID}
                      className="border rounded-lg !border-b ">
                      <AccordionTrigger className="px-4 py-2 text-left">
                        <div className="flex flex-col">
                          <span className="font-medium">
                            Mã phiếu: {phieu.ID}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            Ngày chỉ định: {formatDateToDDMMYYYY(phieu.Ngay)} •
                            Bác sĩ: {phieu.TTBacsiKham?.Ten} • Khoa:{" "}
                            {phieu.TTPhongKham?.Ten}
                          </span>
                          <span className="text-sm text-orange-500 italic">
                            Chẩn đoán: {phieu.Chandoan}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4 ">
                        <Card className="border-none shadow-none p-0 ">
                          <CardContent className="p-0 space-y-3">
                            {/* Show chi tiết từng dịch vụ trong phiếu */}
                            <Table key="">
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Mã dịch vụ</TableHead>
                                  <TableHead>Tên dịch vụ</TableHead>
                                  <TableHead>Người chỉ định</TableHead>
                                  <TableHead>Người thực hiện</TableHead>
                                  <TableHead>Số lượng</TableHead>
                                  <TableHead>Đơn giá</TableHead>
                                  <TableHead>Đơn giá BH</TableHead>
                                  <TableHead>Tổng chi phí</TableHead>
                                  <TableHead>Kết quả</TableHead>
                                  <TableHead>Trạng thái</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {phieu.BV_PhieuChidinhDVCT.map(
                                  (item: iDataPcdDVCT) => (
                                    <TableRow key={item.ID}>
                                      <TableCell>{item.MaDV}</TableCell>
                                      <TableCell>{item.TenDV}</TableCell>
                                      <TableCell>
                                        {item.TTNguoiChiDinh?.Ten}
                                      </TableCell>
                                      <TableCell>
                                        {item.TTNguoithuchien?.Ten}
                                      </TableCell>
                                      <TableCell>{item.Soluong}</TableCell>
                                      <TableCell>
                                        {formatVND(item.Dongia)}
                                      </TableCell>
                                      <TableCell>
                                        {formatVND(item.DongiaBH)}
                                      </TableCell>
                                      <TableCell>
                                        {formatVND(item.Tongchiphi)}
                                      </TableCell>
                                      <TableCell>{item.Ketqua}</TableCell>
                                      <TableCell>
                                        <Badge
                                          variant={
                                            item.Dathuchien
                                              ? "default"
                                              : "outline"
                                          }>
                                          {item.Dathuchien
                                            ? "Đã thực hiện"
                                            : "Chưa thực hiện"}
                                        </Badge>
                                      </TableCell>
                                    </TableRow>
                                  )
                                )}
                              </TableBody>
                            </Table>
                          </CardContent>
                        </Card>
                      </AccordionContent>
                    </AccordionItem>
                  ))}

                {dataPcdDV && dataPcdDV.length === 0 && (
                  <div className="w-full h-full flex justify-center items-center">
                    Không có dữ liệu
                  </div>
                )}
              </Accordion>
            </TabsContent>

            {/* Tab: Toa thuốc */}
            <TabsContent value="toathuoc" className="overflow-auto">
              <Accordion
                type="multiple"
                className="w-full space-y-2 overflow-auto">
                {dataToaThuoc &&
                  dataToaThuoc.length > 0 &&
                  dataToaThuoc.map((phieu: iDataToaThuoc) => (
                    <AccordionItem
                      value={phieu.ID}
                      key={phieu.ID}
                      className="border rounded-lg !border-b ">
                      <AccordionTrigger className="px-4 py-2 text-left">
                        <div className="flex flex-col">
                          <span className="font-medium">
                            Mã phiếu: {phieu.ID}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            Ngày chỉ định: {formatDateToDDMMYYYY(phieu.Ngay)} •
                            Bác sĩ: {phieu.TTBacsiKeToa?.Ten} • Khoa:{" "}
                            {phieu.TTPhongKham?.Ten}
                          </span>
                          <span className="text-sm text-orange-500 italic">
                            Ghi chú: {phieu.Ghichu}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4 ">
                        <Card className="border-none shadow-none p-0 ">
                          <CardContent className="p-0 space-y-3">
                            {/* Show chi tiết từng dịch vụ trong phiếu */}
                            <Table key="">
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Mã dịch vụ</TableHead>
                                  <TableHead>Tên dịch vụ</TableHead>
                                  <TableHead>Hoạt chất</TableHead>
                                  <TableHead>Hàm lượng</TableHead>
                                  <TableHead>Bác sĩ kê toa</TableHead>
                                  <TableHead>Số lượng</TableHead>
                                  <TableHead>Đơn giá</TableHead>
                                  <TableHead>Đơn giá BH</TableHead>
                                  <TableHead>Ghi chú</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {phieu.BV_ToathuocCT.map(
                                  (item: iDataToaThuocCT) => (
                                    <TableRow key={item.ID}>
                                      <TableCell>{item.Ma}</TableCell>
                                      <TableCell>{item.Ten}</TableCell>
                                      <TableCell>{item.Hoatchat}</TableCell>
                                      <TableCell>{item.Hamluong}</TableCell>
                                      <TableCell>
                                        {item.TTBsKetoa?.Ten}
                                      </TableCell>
                                      <TableCell>{item.Soluong}</TableCell>
                                      <TableCell>
                                        {formatVND(item.Dongia)}
                                      </TableCell>
                                      <TableCell>
                                        {formatVND(item.DongiaBH)}
                                      </TableCell>
                                      <TableCell>{item.Ghichu}</TableCell>
                                    </TableRow>
                                  )
                                )}
                              </TableBody>
                            </Table>
                          </CardContent>
                        </Card>
                      </AccordionContent>
                    </AccordionItem>
                  ))}

                {dataToaThuoc && dataToaThuoc.length === 0 && (
                  <div className="w-full h-full flex justify-center items-center">
                    Không có dữ liệu
                  </div>
                )}
              </Accordion>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
}
