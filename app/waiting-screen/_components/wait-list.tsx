import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { iClsGroupData } from "@/types/cls"
import { memo } from "react"

interface WaitListProps {
    patients: iClsGroupData[]
}

const WaitList = ({ patients }: WaitListProps) => {

    return <Card className="w-2/5 rounded-none shadow-none border-green-600 border-l flex flex-col overflow-auto">
        <CardHeader className="border-b border-green-600">
            <CardTitle className="text-green-900 font-extrabold text-xl text-center tracking-wide">
                BỆNH NHÂN TIẾP THEO
            </CardTitle>
        </CardHeader>
        <CardContent className="overflow-auto p-0">
            <Table className="w-full text-green-800 text-lg font-semibold leading-relaxed">
                <TableHeader>
                    <TableRow className="border-b border-green-300">
                        <TableHead className="w-1/6 text-center py-3 text-green-1200">STT</TableHead>
                        <TableHead className="w-3/6 text-left py-3 pl-5 text-green-1200">HỌ VÀ TÊN</TableHead>
                        <TableHead className="w-2/6 text-center py-3 text-green-1200">NĂM SINH</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {patients.map((patient, index) => (
                        <TableRow key={`cls-${index}`} className="border-b border-green-200">
                            <TableCell className="text-center py-2">{patient.STT}</TableCell>
                            <TableCell className="py-2 pl-5">{patient.Hoten}</TableCell>
                            <TableCell className="text-center py-2">{patient.Namsinh}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
    </Card>
}

export default memo(WaitList);