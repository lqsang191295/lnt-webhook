"use client";

import useFetch from "@/hooks/use-fecth";
import { layDanhSachTemplate } from "../_actions/danh-sach-template";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useZaloData } from "@/store/zalo-data-store";

export function DanhSachTemplate() {
  const {
    loading: tLoading,
    fn: tGetData,
    data: tData,
  } = useFetch(layDanhSachTemplate);
  const { access_token } = useZaloData();

  useEffect(() => {
    if (tLoading) return;

    tGetData({ access_token, offset: 0, limit: 100 });
  }, [access_token, tGetData, tLoading]);

  if (!tData || tLoading) {
    return (
      <div className="w-full h-full">
        <Loader className="animate-spin mr-4" /> <span>Loading...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>templateId</TableHead>
            <TableHead>templateName</TableHead>
            <TableHead>status</TableHead>
            <TableHead>templateQuality</TableHead>
            <TableHead>createdTime</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tData &&
            tData.map((tD: Record<string, unknown>, idx: number) => {
              return (
                <TableRow
                  key={tD ? (tD["templateId"] as string) : `ktd-${idx}`}>
                  <TableCell className="font-medium">
                    {tD["templateId"] as string}
                  </TableCell>
                  <TableCell>{tD["templateName"] as string}</TableCell>
                  <TableCell>{tD["status"] as string}</TableCell>
                  <TableCell>{tD["templateQuality"] as string}</TableCell>
                  <TableCell>{tD["createdTime"] as string}</TableCell>
                  <TableCell>
                    <Button variant={"outline"}>View</Button>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
}
