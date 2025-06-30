'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Calendar as CalendarIcon, FileText } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { trpc } from '@/trpc/client';
import { useParams } from 'next/navigation';
import Spinner from "@/components/spinner";
import { formatDateTimeCT, formatDateToDDMMYYYY } from '@/utils/timer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { iPhieuChidinhDV } from '@/types/his-data';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";

export default function ContentLichSuKham() {
  const params = useParams();
  const maBN = params.patient_id as string;

  const today = new Date();
  const [fromDate, setFromDate] = useState<Date>(today);
  const [toDate, setToDate] = useState<Date>(today);
  const [selected, setSelected] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [queryInput, setQueryInput] = useState<any>(null);
  const [queryPcdDVInput, setQueryPcdDVInput] = useState<any>(null);

  const { data, refetch, isFetching, isFetched } = trpc.BV_Master.getByMaBN.useQuery(queryInput!, {
    enabled: !!queryInput, // chỉ chạy nếu có input
  });

  const { data: dataPcdDV, refetch: refetchPcdDV, isFetching: isFetchingPcdDV, isFetched: isFetchedPcdDV } = trpc.BV_PhieuChidinhDV.getByMaBN.useQuery(queryPcdDVInput!, {
    enabled: !!queryPcdDVInput, // chỉ chạy nếu có input
  });

  console.log('data ==== ', data)
  console.log('dataPcdDV ==== ', dataPcdDV)

  const handleFilter = () => {
    const from = new Date(format(fromDate, 'yyyy-MM-dd'));
    const to = new Date(format(toDate, 'yyyy-MM-dd'));
    setQueryInput({ maBN, TuNgay: from.toISOString(), DenNgay: to.toISOString() });
  };

  const handleGetAll = () => {
    setQueryInput({ maBN }); // không lọc theo ngày
  };

  const openDetail = (item: any) => {
    setSelected(item);
    setOpen(true);

    setQueryPcdDVInput({
      maBN,
      Ngay: item.Ngay
    })

    console.log('asdasd ', {
      maBN,
      Ngay: item.Ngay
    })
  };

  return (
    <div className="w-full h-full bg-white flex flex-col">
      <header className="p-4">
        <Label className="text-2xl font-semibold">Lịch sử khám</Label>
      </header>

      <main className="overflow-auto p-4 w-full h-full space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className='w-full flex gap-2'>
            <div className="flex flex-col flex-1 space-y-1">
              <Label>Từ ngày</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {fromDate ? format(fromDate, 'dd/MM/yyyy') : <span>Chọn ngày</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={fromDate}
                    onSelect={setFromDate}
                    locale={vi}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex flex-col flex-1 space-y-1">
              <Label>Đến ngày</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {toDate ? format(toDate, 'dd/MM/yyyy') : <span>Chọn ngày</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={toDate}
                    onSelect={setToDate}
                    locale={vi}
                    varia
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleFilter}>Lấy dữ liệu</Button>
            <Button variant="secondary" onClick={handleGetAll}>Lấy toàn bộ</Button>
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
                {data.map((item) => (
                  <TableRow key={item.Sovaovien}>
                    <TableCell>{item.Sovaovien}</TableCell>
                    <TableCell>{formatDateTimeCT(item.TGVao || '')}</TableCell>
                    <TableCell>{item.TTPhongKham?.Ten}</TableCell>
                    <TableCell>{item.TTBacsi?.Ten}</TableCell>
                    <TableCell>{item.LydoVV}</TableCell>
                    <TableCell>{item.TTChanDoanChinh?.VVIET}</TableCell>
                    <TableCell>{item.TTChanDoanPhu?.VVIET}</TableCell>
                    <TableCell>{item.ChandoanKhac}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => openDetail(item)}>
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
        <DialogContent className="w-full">
          <DialogHeader>
            <DialogTitle>Chi tiết lần khám</DialogTitle>
          </DialogHeader>
          {/* Chi tiết dữ liệu selected nếu cần */}
            <Tabs defaultValue="canlamsang" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="canlamsang">Cận lâm sàng</TabsTrigger>
                <TabsTrigger value="toathuoc">Toa thuốc</TabsTrigger>
              </TabsList>

              {/* Tab: Cận lâm sàng */}
              <TabsContent value="canlamsang">
                <Accordion type="multiple" className="w-full space-y-2">
                  {dataPcdDV?.map((phieu: iPhieuChidinhDV) => (
                    <AccordionItem value={phieu.ID} key={phieu.ID} className="border rounded-lg !border-b">
                      <AccordionTrigger className="px-4 py-2 text-left">
                        <div className="flex flex-col">
                          <span className="font-medium">Mã phiếu: {phieu.ID}</span>
                          <span className="text-sm text-muted-foreground">
                            Ngày chỉ định: {formatDateToDDMMYYYY(phieu.Ngay)} • Bác sĩ: {phieu.TenBsKham} • Khoa: {phieu.TenKhoa}
                          </span>
                          <span className="text-sm text-orange-500 italic">Ghi chú: {phieu.Ghichu}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4">
                        <Card className="border-none shadow-none p-0">
                          <CardContent className="p-0 space-y-3">
                            {/* Show chi tiết từng dịch vụ trong phiếu */}
                            <div></div>
                            {/* {phieu.phieuDVCT.map((ct) => (
                              <div
                                key={ct.ID}
                                className="flex justify-between items-center border p-3 rounded-lg"
                              >
                                <div>
                                  <div className="font-medium">{ct.TenDV}</div>
                                </div>
                                <Badge variant={ct.Dathuchien ? 'default' : 'outline'}>
                                  {ct.Dathuchien ? 'Đã thực hiện' : "Chưa thực hiện"}
                                </Badge>
                              </div>
                            ))} */}
                          </CardContent>
                        </Card>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>

              {/* Tab: Toa thuốc */}
              <TabsContent value="toathuoc">
                <div className="text-muted-foreground italic">Đang phát triển hoặc chưa có dữ liệu.</div>
              </TabsContent>
            </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
}
