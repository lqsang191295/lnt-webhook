'use client';

import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ContentThongTinTiepNhan() {
    // const params = useParams()
    // const patient_id = params.patient_id as string
    // const [loading, setLoading] = useState<boolean>(false);
    // const [data, setData] = useState<iFileOfPatientData[]>([]);

    // const fetchData = useCallback(async () => {
    //     try {
    //         setLoading(true);

    //         const filesData = await getFilePatientData(patient_id);

    //         console.log('filesData----------- ', filesData)

    //         setData(filesData)
    //     } catch (err) {
    //         console.error('Lỗi khi tải dữ liệu:', err)
    //     }
    //     finally {
    //         setLoading(false);
    //     }
    // }, [patient_id])

    // useEffect(() => {
    //     fetchData();
    // }, [fetchData])

    const data = {
        ngayGioKham: '21/06/2025 09:00',
        loaiKham: 'Khám thường',
        khoaPhong: 'Khoa Nội Tổng quát',
        bacSi: 'BS. Nguyễn Văn A',
    }

    return <div className="w-full h-full p-4">
        <div className="w-full h-full bg-white rounded-2xl flex flex-col">
            <header className="p-4">
                <Label className="text-2xl">🔍 Thông tin</Label>
            </header>

            <main className="gap-2 overflow-auto p-4 h-full">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle className="text-lg">2. Thông tin hành chính - Tiếp nhận</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label className="text-muted-foreground">Ngày giờ khám</Label>
                                <div className="mt-1">{data.ngayGioKham}</div>
                            </div>

                            <div>
                                <Label className="text-muted-foreground">Hình thức khám</Label>
                                <div className="mt-1">{data.loaiKham}</div>
                            </div>

                            <div>
                                <Label className="text-muted-foreground">Khoa phòng tiếp nhận</Label>
                                <div className="mt-1">{data.khoaPhong}</div>
                            </div>

                            <div>
                                <Label className="text-muted-foreground">Bác sĩ tiếp nhận</Label>
                                <div className="mt-1">{data.bacSi}</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div >
    </div >;
}
