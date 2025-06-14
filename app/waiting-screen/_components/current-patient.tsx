import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { iClsData } from "@/types/cls"
import { Clock } from "lucide-react"
import { memo } from "react"

interface CurrentPatientProps {
    curPhieu?: iClsData
}

const CurrentPatient = ({ curPhieu }: CurrentPatientProps) => {

    return <Card className="border-2 border-red-500">
        <CardHeader className="bg-red-50">
            <CardTitle className="text-center text-2xl text-red-600">BỆNH NHÂN HIỆN TẠI</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
            {curPhieu ? (
                <div className="text-center">
                    <h3 className="text-3xl font-bold text-blue-800 mb-2">{curPhieu.BV_QLyCapThe.Hoten}</h3>
                    <p className="text-xl text-blue-600">Năm sinh: {curPhieu.BV_QLyCapThe.Namsinh}</p>
                </div>
            ) : (
                <div className="text-center text-gray-500">
                    <Clock className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-xl">Chưa có bệnh nhân</p>
                </div>
            )}
        </CardContent>
    </Card>
}

export default memo(CurrentPatient);