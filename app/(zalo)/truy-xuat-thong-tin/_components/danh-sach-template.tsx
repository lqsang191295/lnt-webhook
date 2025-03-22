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
      "8j6pIc2YTdGbqhLDOQHmSY7QiqXaiZm3GyUEPnYsCbyQYEWyAufkOJkbh0C7cmGwHvYiUMMVFHrZZODNG_eYRLRmkITlrojMRARhA6gGHX5DZi11Me5ECtcTy6yui4OW7BN6NW2-Go0Gglzz88bmG3AB_NWsz6Kq8-FRIZtkRYm6tknrFDbzA7_op798mnP8KhQs65APAqD0kEKEOuuhCLkVhseSz2a8FlljLYplOnCkvlrqQCfW6b_lma5_pta0NF7lJHBcO1LLyzrUJFvQ9cZ2wXjmpcLdLDgZC76n1GnhdhTZNhKfCckovsvEk5mUMQpZV5kG9H1iaFzxTfbUC7Quo59tbNiFDAhzDYsB9tnlchuMN9v_TaQGq2T8W1D92w6F03JMFLmMuB8s0SLzLXxhp38cs0ztSNP6zmXWkNLm";
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
