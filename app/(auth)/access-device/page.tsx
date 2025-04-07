"use client";

import { memo } from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const PageAccessDevice = () => {
  return (
    <div className="w-screen h-screen flex flex-col gap-4 justify-center items-center">
      <Label className="mt-4 text-2xl text-red-500">Cảnh báo</Label>
      <Label className="mt-4 text-md text-gray-500">
        Có người đang cố tình đăng nhập tài khoản của bạn
      </Label>

      <Button variant={"outline"} className="cursor-pointer mt-4">
        <Check className="text-green-500" />
        <span>Cho phép đăng nhập</span>
      </Button>

      <Button variant={"ghost"} className="cursor-pointer mt-4">
        <X className="text-red-500" />
        <span>Từ chối đăng nhập</span>
      </Button>
    </div>
  );
};

export default memo(PageAccessDevice);
