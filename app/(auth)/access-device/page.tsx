"use client";

import { memo, useCallback } from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter, useSearchParams } from "next/navigation";
import { approveDevice, rejectDevice } from "@/actions/auth";
import { ToastSuccess } from "@/lib/toast";

const PageAccessDevice = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const username = searchParams.get("username");
  const deviceToken = searchParams.get("deviceToken");

  const handleApproveDevice = useCallback(async () => {
    if (!token || !username || !deviceToken) return router.push("/login");

    try {
      await approveDevice(username, token, deviceToken);

      ToastSuccess("Thành công");
    } catch (ex) {
      console.log("Error wait access device ", ex);
      ToastSuccess("Có lỗi xảy ra");
    }
  }, [router, token, username, deviceToken]);

  const handleRejectDevice = useCallback(async () => {
    if (!token || !username || !deviceToken) return router.push("/login");

    try {
      await rejectDevice(username, token, deviceToken);
      ToastSuccess("Thành công");
    } catch (ex) {
      console.log("Error wait access device ", ex);
      ToastSuccess("Có lỗi xảy ra");
    }
  }, [router, token, username, deviceToken]);

  return (
    <div className="w-screen h-screen flex flex-col gap-4 justify-center items-center">
      <Label className="mt-4 text-2xl text-red-500">Cảnh báo</Label>
      <Label className="mt-4 text-md text-gray-500">
        Có người đang cố tình đăng nhập tài khoản của bạn
      </Label>

      <Button
        variant={"outline"}
        className="cursor-pointer mt-4"
        onClick={handleApproveDevice}>
        <Check className="text-green-500" />
        <span>Cho phép đăng nhập</span>
      </Button>

      <Button
        variant={"ghost"}
        className="cursor-pointer mt-4"
        onClick={handleRejectDevice}>
        <X className="text-red-500" />
        <span>Từ chối đăng nhập</span>
      </Button>
    </div>
  );
};

export default memo(PageAccessDevice);
