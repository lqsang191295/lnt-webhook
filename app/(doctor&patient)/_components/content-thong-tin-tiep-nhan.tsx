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

// Fake sample data
const listTiepNhan = [
    {
        ID: '1',
        Ngay: '2025-06-21T09:00:00',
        Loaikham: 'Khám thường',
        MaBankham: 'PK01',
        DK_Bacsi: 'BS. Nguyễn Văn A',
        DK_Hoten: 'Nguyễn Văn B',
        DK_Diachi: '123 Đường ABC',
        SoBHYT: '1234567890',
        Trangthai: 'Đang khám',
        Benhmantinh: true,
        Dathutien: true,
        CoBHYT: true,
    },
    {
        ID: '2',
        Ngay: '2025-06-20T14:30:00',
        Loaikham: 'Khám cấp cứu',
        MaBankham: 'PK02',
        DK_Bacsi: 'BS. Trần Thị C',
        DK_Hoten: 'Lê Thị D',
        DK_Diachi: '456 Đường XYZ',
        SoBHYT: '',
        Trangthai: 'Đã hoàn tất',
        Benhmantinh: false,
        Dathutien: false,
        CoBHYT: false,
    },
];

export default function ContentThongTinTiepNhan() {
    return (
        <div className="w-full h-full p-4">
            <div className="w-full h-full bg-white rounded-2xl flex flex-col">
                <header className="p-4">
                    <Label className="text-2xl"><ClipboardList /> Danh sách phiếu tiếp nhận bệnh</Label>
                </header>

                <main className="gap-2 overflow-auto p-4 h-full">
                    <Accordion type="single" collapsible className="w-full space-y-2">
                        {listTiepNhan.map((item) => (
                            <AccordionItem key={item.ID} value={item.ID}>
                                <AccordionTrigger className="text-left">
                                    <div className="flex flex-col text-sm w-full">
                                        <span className="font-semibold">🕓 {new Date(item.Ngay).toLocaleString('vi-VN')}</span>
                                        <span>🔍 {item.Loaikham} - {item.Trangthai}</span>
                                        <span>🏥 Phòng khám: {item.MaBankham}</span>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <Card className="w-full bg-muted/40 border-none shadow-none">
                                        <CardContent className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <Label className="text-muted-foreground">Bác sĩ tiếp nhận</Label>
                                                <div>{item.DK_Bacsi}</div>
                                            </div>
                                            <div>
                                                <Label className="text-muted-foreground">Tên bệnh nhân</Label>
                                                <div>{item.DK_Hoten}</div>
                                            </div>
                                            <div>
                                                <Label className="text-muted-foreground">Địa chỉ</Label>
                                                <div>{item.DK_Diachi}</div>
                                            </div>
                                            <div>
                                                <Label className="text-muted-foreground">Số BHYT</Label>
                                                <div>{item.SoBHYT || 'Không có'}</div>
                                            </div>
                                            <div>
                                                <Label className="text-muted-foreground">Bệnh mãn tính</Label>
                                                <div>{item.Benhmantinh ? 'Có' : 'Không'}</div>
                                            </div>
                                            <div>
                                                <Label className="text-muted-foreground">Đã thu tiền</Label>
                                                <div>{item.Dathutien ? '✔️ Có' : '❌ Chưa'}</div>
                                            </div>
                                            <div>
                                                <Label className="text-muted-foreground">Có BHYT</Label>
                                                <div>{item.CoBHYT ? '✔️ Có' : '❌ Không'}</div>
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
