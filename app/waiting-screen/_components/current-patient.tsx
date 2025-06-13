import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock } from "lucide-react"
import { memo } from "react"

interface CurrentPatientProps {
    activePatient: {
        HoTen: string
        NamSinh: string
        Sovaovien: string
    } | null
}

const CurrentPatient = ({ activePatient }: CurrentPatientProps) => {

    return <Card className="border-2 border-red-500">
        <CardHeader className="bg-red-50">
            <CardTitle className="text-center text-2xl text-red-600">BỆNH NHÂN HIỆN TẠI</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
            {activePatient ? (
                <div className="text-center">
                    <h3 className="text-3xl font-bold text-blue-800 mb-2">{activePatient.HoTen}</h3>
                    <p className="text-xl text-blue-600">Năm sinh: {activePatient.NamSinh}</p>
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