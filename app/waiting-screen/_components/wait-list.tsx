import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { iClsGroupData } from "@/types/cls";
import { memo } from "react";

interface WaitListProps {
  patients: iClsGroupData[];
  title: string;
}

const WaitList = ({ title, patients }: WaitListProps) => {
  return (
    <Card className="w-full h-full rounded-none shadow-none border-green-600 lg:border-l flex flex-col overflow-auto p-0 gap-0">
      <CardHeader className="p-0 gap-0">
        <CardTitle className="border-b border-green-600 text-green-900 font-extrabold text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-center tracking-wide py-1 sm:py-2 lg:py-3">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="overflow-hidden p-0 flex-grow min-h-0">
        <div className="overflow-hidden">
          <Table className="w-full min-w-0 text-green-800 text-xs sm:text-sm md:text-base lg:text-lg font-semibold leading-relaxed sm:min-w-[300px]">
            <TableHeader>
              <TableRow className="border-b-2 border-green-400 bg-green-100">
                <TableHead className="w-1/6 text-center py-1 sm:py-2 lg:py-3 text-green-900 text-xs sm:text-sm md:text-base font-black">
                  STT
                </TableHead>
                <TableHead className="w-3/6 text-left py-1 sm:py-2 lg:py-3 pl-2 sm:pl-3 lg:pl-5 text-green-900 text-xs sm:text-sm md:text-base font-black">
                  HỌ VÀ TÊN
                </TableHead>
                <TableHead className="w-2/6 text-center py-1 sm:py-2 lg:py-3 text-green-900 text-xs sm:text-sm md:text-base font-black">
                  NĂM SINH
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.map((patient, index) => (
                <TableRow key={index} className="border-b border-green-200">
                  <TableCell className="text-center py-1 sm:py-2 text-xs sm:text-sm md:text-base">
                    {patient.STT}
                  </TableCell>
                  <TableCell className="py-1 sm:py-2 pl-1 sm:pl-2 lg:pl-4 text-xs sm:text-sm md:text-base truncate max-w-0">
                    {patient.Hoten}
                  </TableCell>
                  <TableCell className="text-center py-1 sm:py-2 text-xs sm:text-sm md:text-base">
                    {patient.Namsinh}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default memo(WaitList);
