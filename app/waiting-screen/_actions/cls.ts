import { get } from "@/api/client";
import { eTrangthai } from "@/enum/status";

function formatDateToLocalSQLString(date: Date): string {
    const pad = (n: number) => n.toString().padStart(2, '0');
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hour = pad(date.getHours());
    const minute = pad(date.getMinutes());
    const second = pad(date.getSeconds());
    const ms = date.getMilliseconds().toString().padStart(3, '0');

    return `${year}-${month}-${day} ${hour}:${minute}:${second}.${ms}`;
}

export const getDataPhieuTiepNhanCLS = async (loaicls: string, ip: string) => {
    try {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
        const formatted = formatDateToLocalSQLString(today);
        const encodedWhere = encodeURIComponent(`Ngay=='${formatted}'&&LoaiCLS=='${loaicls}'&&IP=='${ip}'&&TrangThai!='${eTrangthai[eTrangthai.Đã_thực_hiện]}'`);
        console.log('zzzzzzzzzzzzz ', `Ngay=='${formatted}'&&LoaiCLS=='${loaicls}'&&IP=='${ip}'&&TrangThai!='${eTrangthai[eTrangthai.Đã_thực_hiện]}'`, encodedWhere)

        const response = await get(`/his/get-BV_PhieuTiepNhanCLS?where=${encodedWhere}&orderBy=Ngay`);

        if (response.error) {
            return [];
        }

        return response.data;
    } catch (ex) {
        console.log('getDataPhieuTiepNhanCLS Error = ', ex)
        return [];
    }
}

export const getDataPhieuChidinhDVCT = async (nhom: string, phong?: string) => {
    try {
        const response = await get(`/his/get-BV_PhieuChidinhDVCT-by-nhom/${nhom}${phong ? '/' + phong : ''}`);

        if (response.error) {
            return [];
        }

        return response.data;
    } catch (ex) {
        console.log('getDataPhieuTiepNhanCLS Error = ', ex)
        return [];
    }
}