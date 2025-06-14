import { Card, CardContent } from "@/components/ui/card"
import { iClsData } from "@/types/cls"
import { memo } from "react"

interface FooterProps {
    activePatient: iClsData[],
    count: number
}

const Footer = ({ activePatient, count }: FooterProps) => {

    return <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
            <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{activePatient ? 1 : 0}</div>
                <div className="text-sm text-gray-600">Đang khám</div>
            </CardContent>
        </Card>
        <Card>
            <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">{count}</div>
                <div className="text-sm text-gray-600">Đang chờ</div>
            </CardContent>
        </Card>
        <Card>
            <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">
                    {count + (activePatient ? 1 : 0)}
                </div>
                <div className="text-sm text-gray-600">Tổng bệnh nhân</div>
            </CardContent>
        </Card>
    </div>
}

export default memo(Footer);