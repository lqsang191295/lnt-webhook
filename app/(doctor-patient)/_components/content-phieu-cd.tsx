'use client';

import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Spinner from "@/components/spinner";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { get, RequestOptions } from "@/api/client";
import { iPhieuChidinhDV } from "@/types/his-data";
import { formatDateToDDMMYYYY } from "@/utils/timer";

const fetcher = ([url, options]: [string, RequestOptions]) => get(url, options);

export default function ContentPhieuCD() {
    const params = useParams()
    const id = params.patient_id as string
    const url = `/patient/get-phieu-cd/${id}`;
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

    const info = data.data?.length > 0 ? data.data as iPhieuChidinhDV[] : null;

    if (!info || info.length === 0) {
        return <div className="w-full h-full flex justify-center items-center gap-1">
            No data!
        </div>;
    }

    return (
        <div className="w-full h-full p-4">
            <div className="w-full h-full bg-white rounded-2xl flex flex-col">
                <header className="p-4">
                    <Label className="text-2xl">Phiếu chỉ định</Label>
                </header>

                <main className="overflow-auto p-4 h-full">
                    <Accordion type="multiple" className="w-full space-y-2">
                        {info.map((phieu: iPhieuChidinhDV) => (
                            <AccordionItem value={phieu.ID} key={phieu.ID} className="border rounded-lg !border-b">
                                <AccordionTrigger className="px-4 py-2 text-left">
                                    <div className="flex flex-col">
                                        <span className="font-medium">Mã phiếu: {phieu.ID}</span>
                                        <span className="text-sm text-muted-foreground">
                                            Ngày chỉ định: {formatDateToDDMMYYYY(phieu.Ngay)} • Bác sĩ: {phieu.TenBsKham} • Khoa: {phieu.TenKhoa}
                                        </span>
                                        {phieu.Ghichu && (
                                            <span className="text-sm text-orange-500 italic">Ghi chú: {phieu.Ghichu}</span>
                                        )}
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="px-4 pb-4">
                                    <Card className="border-none shadow-none p-0">
                                        <CardContent className="p-0 space-y-3">
                                            {phieu.phieuDVCT.map((ct) => (
                                                <div
                                                    key={ct.ID}
                                                    className="flex justify-between items-center border p-3 rounded-lg"
                                                >
                                                    <div>
                                                        <div className="font-medium">{ct.TenDV}</div>
                                                    </div>
                                                    <Badge
                                                        variant={
                                                            ct.Dathuchien ? 'default' : 'outline'
                                                        }
                                                    >
                                                        {ct.Dathuchien ? 'Đã thực hiện' : "Chưa thực hiện"}
                                                    </Badge>
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
