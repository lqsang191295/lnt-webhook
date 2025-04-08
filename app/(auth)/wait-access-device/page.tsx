"use client";

import { memo, useCallback, useEffect, useRef } from "react";
import { Label } from "@/components/ui/label";
import Spinner from "@/components/spinner";
import { useRouter, useSearchParams } from "next/navigation";
import { getLoggedDeviceById } from "@/actions/AD_UserLogged";
import { setCookieToken } from "@/actions/auth";

const PageWaitAccessDevice = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const deviceToken = searchParams.get("deviceToken");
  const username = searchParams.get("username");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleCheckAcceptDevice = useCallback(async () => {
    if (!token || !username || !deviceToken) return router.push("/login");

    try {
      const data = await getLoggedDeviceById(username, deviceToken);

      console.log("data === ", data);

      if (!data || data.Accepted === null) {
        return;
      }

      if (!data || data.Accepted === false) {
        return router.push("/login");
      }

      await setCookieToken(token);

      return router.push("/");
    } catch (ex) {
      console.log("Error wait access device ", ex);
      return router.push("/");
    }
  }, [router, token, username, deviceToken]);

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      handleCheckAcceptDevice();
    }, 5000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [handleCheckAcceptDevice]);

  if (!token) {
    router.push("/login");
    return;
  }

  return (
    <div className="w-screen h-screen flex flex-row gap-4 justify-center items-center">
      <div className="flex gap-4">
        <Spinner />
        <Label className="text-md text-gray-500">
          Tài khoản đã được bảo vệ 2 lớp, chờ tài khoản được chấp nhận truy cập
          trên thiết bị này!
        </Label>
      </div>
    </div>
  );
};

export default memo(PageWaitAccessDevice);
