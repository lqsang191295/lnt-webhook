'use client';

import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Spinner from "@/components/spinner";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { get, RequestOptions } from "@/api/client";
import { iToaThuoc } from "@/types/his-data";
import { formatDateToDDMMYYYY } from "@/utils/timer";

const fetcher = ([url, options]: [string, RequestOptions]) => get(url, options);

export default function ContentToaThuoc() {
  const params = useParams()
  const id = params.patient_id as string
  const url = `/patient/get-toa-thuoc/${id}`;
  const { data, error, isLoading } = useSWR([url, {}], fetcher);

  if (!data || isLoading) {
    return <div className="w-full h-full flex justify-center items-center gap-1">
      <Spinner /> Loading...
    </div>;
  }

  if (error) {
    return <div className="w-full h-full flex justify-center items-center gap-1">
      Has error...
    </div>;
  }

  const toaThuocData = data.data?.length > 0 ? data.data as iToaThuoc[] : null;

  if (!toaThuocData || toaThuocData.length === 0) {
    return <div className="w-full h-full flex justify-center items-center gap-1">
      No data!
    </div>;
  }

  return (
    <div className="w-full h-full p-4">
      <div className="w-full h-full bg-white rounded-2xl flex flex-col">
        <header className="p-4">
          <Label className="text-2xl">Toa thuốc</Label>
        </header>

        <main className="overflow-auto p-4 h-full">
          <Accordion type="multiple" className="w-full space-y-2">
            {toaThuocData.map((toa) => (
              <AccordionItem value={toa.ID} key={toa.ID} className="border rounded-lg !border-b">
                <AccordionTrigger className="px-4 py-2 text-left">
                  <div className="flex flex-col">
                    <span className="font-medium">Mã toa: {toa.ID}</span>
                    <span className="text-sm text-muted-foreground">
                      Ngày kê: {formatDateToDDMMYYYY(toa.Ngay)} • Bác sĩ: {toa.TenBsKeToa} • Khoa: {toa.TenKhoa}
                    </span>
                    {toa.Ghichu && (
                      <span className="text-sm text-orange-500 italic">Ghi chú: {toa.Ghichu}</span>
                    )}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <Card className="border-none shadow-none p-0">
                    <CardContent className="p-0 space-y-3">
                      {toa.toaThuocCT.map((thuoc) => (
                        <div
                          key={thuoc.ID}
                          className="flex flex-col border p-3 rounded-lg "
                        >
                          <div className="flex justify-between items-center mb-1">
                            <div className="font-semibold">{thuoc.Ten}</div>
                            <Badge variant="secondary"> Hàm lượng: {thuoc.Hamluong} - Hoạt chất: {thuoc.Hoatchat} - Số lượng: {thuoc.Soluong} - Đơn vị: {thuoc.Donvi}</Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Sáng: {thuoc.SLSang || 0} - Trưa: {thuoc.SLTrua || 0} - Chiều: {thuoc.SLChieu || 0} - Tối: {thuoc.SLToi || 0}
                          </div>
                          {thuoc.Ghichu && (
                            <div className="text-sm text-orange-600 mt-1">Ghi chú: {thuoc.Ghichu}</div>
                          )}
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </main>
      </div>
    </div>
  );
}
