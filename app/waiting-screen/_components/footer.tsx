import { Card, CardContent } from "@/components/ui/card"
import { iClsData } from "@/types/cls"
import { memo } from "react"

interface FooterProps {
    activePatient: iClsData[],
    count: number
}

const Footer = () => {

    return <div className="bg-green-900 text-white text-center py-3 text-base font-extrabold rounded-b-md flex-shrink-0 tracking-wider select-none">
        Hotline hỗ trợ tải &amp; sử dụng App: 0276 3836 991 - 0941 696 939
    </div>
}

export default memo(Footer);