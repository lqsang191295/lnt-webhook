"use client";

import useFetch from "@/hooks/use-fecth";
import { layDanhSachTemplate } from "../_actions/danh-sach-template";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export function DanhSachTemplate() {
  const {
    loading: tLoading,
    fn: tGetData,
    data: tData,
  } = useFetch(layDanhSachTemplate);

  useEffect(() => {
    if (tLoading) return;

    const token =
      "c6nJ2f440YsVRrKDa084AvjdKmYL57Df-HCfCu8BEnJIDsfig2DRBDCNR52727jnppfo8w4FH7NiA6i9karNBDyfV6s302W9ynaOGOrr7HVqKHzMks4s3ka96M-I32qTdYO3D9ea9LFJ8tTqtozj4O0BTaJORYnYYLiQ7S0m0q6NA2myt2yRSerAD2tTTY1FabCc3vfA5d_uGIGQW5uiVyHH01QnHoX3eI80OyWcEW2vJYvfq69r79b8HZ_B849FmpOPA8SqDMdTNM0nitHWSy9vMYEOSNTwwtjcFFjqQrMdNq0ir7jjHBXMP6R9Ua0qpKHyL9WqS72MMN89ycvmOfLB82oR9YLvy0aqHRGEC3t7QtvBYM9yAkrwPccWLN8dzZ5JSwmdN1UdFM1Dhb9QBQ8sK6mqGprTOn6H7m4f";
    tGetData({ access_token: token, offset: 0, limit: 100 });
  }, []);

  if (!tData || tLoading) {
    return (
      <div className="w-full h-full">
        <Loader className="animate-spin mr-4" /> <span>Loading...</span>
      </div>
    );
  }

  console.log("tData ==== ", tData);

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
          {tData.map((tD: Record<string, unknown>, idx: number) => {
            return (
              <TableRow key={tD["templateId"] || `ktd-${idx}`}>
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
