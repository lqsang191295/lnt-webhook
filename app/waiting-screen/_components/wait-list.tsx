import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { iClsData } from "@/types/cls"
import { Patient } from "@/types/patient"
import { Users } from "lucide-react"
import { memo } from "react"

interface WaitListProps {
    waitingList: iClsData[]
}

const WaitList = ({ waitingList }: WaitListProps) => {

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
                    <TableRow className="border-b border-green-200">
                        <TableCell className="text-center py-2">4078</TableCell>
                        <TableCell className="py-2 pl-5">TRẦN THỊ KIM THOA</TableCell>
                        <TableCell className="text-center py-2">1985</TableCell>
                    </TableRow>
                    <TableRow className="border-b border-green-200">
                        <TableCell className="text-center py-2">4077</TableCell>
                        <TableCell className="py-2 pl-5">PHẠM THỊ QUÝ</TableCell>
                        <TableCell className="text-center py-2">1990</TableCell>
                    </TableRow>
                    <TableRow className="border-b border-green-200">
                        <TableCell className="text-center py-2">4076</TableCell>
                        <TableCell className="py-2 pl-5">HUỲNH THANH TÂM</TableCell>
                        <TableCell className="text-center py-2">1987</TableCell>
                    </TableRow>
                    <TableRow className="border-b border-green-200">
                        <TableCell className="text-center py-2">4075</TableCell>
                        <TableCell className="py-2 pl-5">NGUYỄN THỊ THÚY</TableCell>
                        <TableCell className="text-center py-2">1978</TableCell>
                    </TableRow>
                    <TableRow className="border-b border-green-200">
                        <TableCell className="text-center py-2">4074</TableCell>
                        <TableCell className="py-2 pl-5">ĐẶNG THỊ THU</TableCell>
                        <TableCell className="text-center py-2">1982</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="text-center py-2">4073</TableCell>
                        <TableCell className="py-2 pl-5">LÊ THỊ THANH TÂM</TableCell>
                        <TableCell className="text-center py-2">1993</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </CardContent>
    </Card>
}

export default memo(WaitList);