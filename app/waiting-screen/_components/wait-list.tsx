import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Patient } from "@/types/patient"
import { Users } from "lucide-react"
import { memo } from "react"

interface WaitListProps {
    count: number,
    patients: Patient[]
}

const WaitList = ({ count, patients }: WaitListProps) => {

    return <Card className="flex-1 overflow-hidden pt-6">
        <CardHeader className="bg-blue-50">
            <CardTitle className="text-center text-xl text-blue-800">
                BỆNH NHÂN TIẾP THEO ({count})
            </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
            <div className="max-h-96 overflow-y-auto">
                <table className="w-full">
                    <thead className="bg-gray-100 sticky top-0">
                        <tr>
                            <th className="px-4 py-3 text-left font-bold text-blue-800">STT</th>
                            <th className="px-4 py-3 text-left font-bold text-blue-800">HỌ VÀ TÊN</th>
                            <th className="px-4 py-3 text-left font-bold text-blue-800">NĂM SINH</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patients.map((patient, index) => (
                            <tr
                                key={index}
                                className={`border-b hover:bg-blue-50 ${index === 0 ? "bg-yellow-50" : ""}`}
                            >
                                <td className="px-4 py-3 font-semibold text-blue-800">{index + 1}</td>
                                <td className="px-4 py-3 font-semibold text-blue-800">{patient.Hoten}</td>
                                <td className="px-4 py-3 text-blue-600">{patient.Namsinh}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {patients.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg">Không còn bệnh nhân chờ</p>
                    </div>
                )}
            </div>
        </CardContent>
    </Card>
}

export default memo(WaitList);