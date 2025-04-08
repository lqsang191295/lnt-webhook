"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import Spinner from "@/components/spinner";
import { useRouter, useSearchParams } from "next/navigation";
import { getLoggedDeviceById } from "@/actions/AD_UserLogged";
import { setCookieToken } from "@/actions/auth";
import { Button } from "@/components/ui/button";

const PageWaitAccessDevice = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const deviceToken = searchParams.get("deviceToken");
  const username = searchParams.get("username");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const intervalTimeBackRef = useRef<NodeJS.Timeout | null>(null);
  const [accepted, setStatusAccepted] = useState<boolean | null>(null);
  const [time, setTime] = useState<number>(3);

  const handleCheckAcceptDevice = useCallback(async () => {
    if (!token || !username || !deviceToken) return router.push("/login");

    try {
      const data = await getLoggedDeviceById(username, deviceToken);

      setStatusAccepted(data.Accepted);

      if (!data || data.Accepted === null) {
        return;
      }

      if (!data || data.Accepted === false) {
        return;
      }

      await setCookieToken(token);

      if (intervalTimeBackRef.current) {
        clearInterval(intervalTimeBackRef.current);
      }

      intervalTimeBackRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 0) {
            router.push("/");
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } catch (ex) {
      console.log("Error wait access device ", ex);
      return router.push("/login");
    }
  }, [router, token, username, deviceToken]);

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      handleCheckAcceptDevice();
    }, 5000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (intervalTimeBackRef.current)
        clearInterval(intervalTimeBackRef.current);
    };
  }, [handleCheckAcceptDevice]);

  if (!token) {
    // router.push("/login");
    return;
  }

  return (
    <div className="w-screen h-screen flex flex-row gap-4 justify-center items-center">
      {accepted === null && (
        <div className="flex gap-4">
          <Spinner />
          <Label className="text-md text-gray-500">
            Tài khoản đã được bảo vệ 2 lớp, chờ tài khoản được chấp nhận truy
            cập trên thiết bị này!
          </Label>
        </div>
      )}

      {accepted === true && (
        <div className="flex gap-4">
          <Label className="text-md text-green-500">
            Tài khoản được chấp nhận truy cập trên thiết bị này!
          </Label>
          <Label>Chuyển hướng sau {time}s...</Label>
        </div>
      )}

      {accepted === false && (
        <div className="flex gap-4">
          <Label className="text-md text-red-500">
            Tài khoản không được chấp nhận truy cập trên thiết bị này!
          </Label>
          <Button
            className="cursor-pointer"
            variant={"outline"}
            onClick={() => router.push("/login")}>
            Back to Login
          </Button>
        </div>
      )}
    </div>
  );
};

export default memo(PageWaitAccessDevice);
