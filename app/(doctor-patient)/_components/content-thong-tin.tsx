'use client';

import { get, RequestOptions } from "@/api/client";
import Spinner from "@/components/spinner";
import { Label } from "@/components/ui/label";
import { iPatientInfo } from "@/types/patient";
import { Info } from "lucide-react";
import { useParams } from "next/navigation";
import { FC } from "react";
import useSWR from 'swr';


const InfoRow: FC<{ label: string; value: string }> = ({ label, value }) => (
    <div className="flex flex-col">
        <Label className="text-sm text-muted-foreground">{label}</Label>
        <p className="font-medium">{value || '—'}</p>
    </div>
)

const fetcher = ([url, options]: [string, RequestOptions]) => get(url, options);

export default function ContentThongTin() {
    const params = useParams()
    const id = params.patient_id as string
    const encodedWhere = encodeURIComponent(JSON.stringify({ Ma: id }));
    const url = `/his/get-BV_QLyCapThe?where=${encodedWhere}`;
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

    const info = data.data?.length > 0 ? data.data[0] as iPatientInfo : null;

    if (!info) {
        return <div className="w-full h-full flex justify-center items-center gap-1">
            No data!
        </div>;
    }

    return <div className="w-full h-full">
        <div className="w-full h-full bg-white flex flex-col">
            <header className="p-4">
                <Label className="text-2xl"><Info /> Thông tin</Label>
            </header>

            <main className="gap-2 overflow-auto p-4 h-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoRow label="Họ tên" value={info.Hoten} />
                    <InfoRow label="Giới tính" value={info.Gioitinh} />
                    <InfoRow label="Ngày sinh" value={`${info.Ngaysinh}/${info.Thangsinh}/${info.Namsinh}`} />
                    <InfoRow label="Mã bệnh nhân" value={info.Ma} />
                    <InfoRow label="Địa chỉ" value={info.Diachi} />
                    <InfoRow label="Số điện thoại" value={info.Dienthoai} />
                    <InfoRow label="Đối tượng" value={info.Doituong} />
                    <InfoRow label="Ngày giờ tiếp nhận" value={info.Ngay} />
                    <InfoRow label="Nơi giới thiệu" value={info.NguonGioithieu} />
                    <InfoRow label="Tiền sử bệnh bản thân" value={info.TTChung && JSON.parse(info.TTChung)["TienSuBenhBanThan"]} />
                    <InfoRow label="Tiền sử bệnh gia đình" value={info.TTChung && JSON.parse(info.TTChung)["TienSuBenhGiaDinh"]} />
                </div>
            </main>
        </div >
    </div >;
}
