'use client';

import { Label } from "@/components/ui/label";
import { FC, useCallback, useEffect, useState } from "react";
import { iFileOfPatientData } from "@/types/patient";
import { getFilePatientData } from "../_actions";
import { useParams } from "next/navigation";

const InfoRow: FC<{ label: string; value: string }> = ({ label, value }) => (
    <div className="flex flex-col">
        <Label className="text-sm text-muted-foreground">{label}</Label>
        <p className="font-medium">{value || '—'}</p>
    </div>
)

export default function ContentThongTin() {
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
        hoTen: 'Nguyễn Văn A',
        gioiTinh: 'Nam',
        ngaySinh: '1980-05-12',
        maBenhNhan: 'BN123456',
        maVaoVien: 'VV20240621',
        diaChi: '123 Đường ABC, Quận 1',
        soDienThoai: '0901234567',
        doiTuong: 'BHYT',
        ngayGioTiepNhan: '2025-06-21T08:30',
        noiGioiThieu: 'Phòng khám Đa Khoa ABC',
        soVaoVien: 'SVV456789',
        soHoSo: 'HS20240621'
    }

    return <div className="w-full h-full p-4">
        <div className="w-full h-full bg-white rounded-2xl flex flex-col">
            <header className="p-4">
                <Label className="text-2xl">🔍 Thông tin</Label>
            </header>

            <main className="gap-2 overflow-auto p-4 h-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoRow label="Họ tên" value={data.hoTen} />
                    <InfoRow label="Giới tính" value={data.gioiTinh} />
                    <InfoRow label="Ngày sinh" value={data.ngaySinh} />
                    <InfoRow label="Mã bệnh nhân" value={data.maBenhNhan} />
                    <InfoRow label="Mã vào viện" value={data.maVaoVien} />
                    <InfoRow label="Địa chỉ" value={data.diaChi} />
                    <InfoRow label="Số điện thoại" value={data.soDienThoai} />
                    <InfoRow label="Đối tượng" value={data.doiTuong} />
                    <InfoRow label="Ngày giờ tiếp nhận" value={data.ngayGioTiepNhan} />
                    <InfoRow label="Nơi giới thiệu" value={data.noiGioiThieu} />
                    <InfoRow label="Số vào viện" value={data.soVaoVien} />
                    <InfoRow label="Số hồ sơ" value={data.soHoSo} />
                </div>
            </main>
        </div >
    </div >;
}
