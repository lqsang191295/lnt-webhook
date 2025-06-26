'use client';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { ClipboardList } from 'lucide-react';
import useSWR from 'swr';
import { useParams } from 'next/navigation';
import Spinner from '@/components/spinner';
import { get, RequestOptions } from '@/api/client';
import { iThongTinTiepNhan } from '@/types/his-data';
import { formatDateTimeCT } from '@/utils/timer';
import { formatVND } from '@/utils/number';

const fetcher = ([url, options]: [string, RequestOptions]) => get(url, options);

export default function ContentThongTinTiepNhan() {
    const params = useParams()
    const id = params.patient_id as string
    const url = `/patient/get-tiep-nhan/${id}`;
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

    const listTiepNhan = data.data?.length > 0 ? data.data as iThongTinTiepNhan[] : null;

    if (!listTiepNhan || listTiepNhan.length === 0) {
        return <div className="w-full h-full flex justify-center items-center gap-1">
            No data!
        </div>;
    }

    return (
        <div className="w-full h-full">
            <div className="w-full h-full bg-white flex flex-col">
                <header className="p-4">
                    <Label className="text-2xl"><ClipboardList /> Danh sách phiếu tiếp nhận bệnh</Label>
                </header>

                <main className="gap-2 overflow-auto p-4 h-full">
                    <Accordion type="single" collapsible className="w-full space-y-2">
                        {listTiepNhan.map((item) => (
                            <AccordionItem key={item.Sovaovien} value={item.Sovaovien}>
                                <AccordionTrigger className="text-left">
                                    <div className="flex flex-col text-sm w-full">
                                        <span className="font-semibold">🕓 {formatDateTimeCT(item.TGVao)}</span>
                                        <span>🏥 Phòng khám: {item.TenKhoa}</span>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <Card className="w-full bg-muted/40 border-none shadow-none">
                                        <CardContent className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <Label className="text-muted-foreground">Bác sĩ điều trị</Label>
                                                <div>{item.TenBsDieutri}</div>
                                            </div>
                                            <div>
                                                <Label className="text-muted-foreground">Tổng chi phí</Label>
                                                <div>{formatVND(item.Tongchiphi)}</div>
                                            </div>
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
