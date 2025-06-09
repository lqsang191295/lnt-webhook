"use client";

import { post } from "@/api/client";
import { useGlobalVariables } from "@/components/global-variables";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ToastSuccess } from "@/lib/toast";
import { isSupported } from "@/utils/firebase";
import { registerServiceWorker } from "@/utils/service-worker";
import { Copy } from "lucide-react";
import { memo, useEffect, useState } from "react";

const Home = () => {
  const [isSupport, setIsSupport] = useState<string>("");
  const { deviceToken } = useGlobalVariables();

  const getIsSuported = async () => {
    const isss = await isSupported();
    console.log("isSupport ==== ", isss);
    setIsSupport(String(isss));
  };

  useEffect(() => {
    registerServiceWorker();
    getIsSuported();
  }, []);

  const handleSendToken = async () => {
    try {
      const res = await post("/push-notification/subscribe", {
        token: deviceToken,
      });

      if (res) {
        ToastSuccess("Send success!");
      }
    } catch (ex) {
      console.log("ex === ", ex);
      ToastSuccess("Send Fail!");
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(deviceToken);
    } catch {}
  };
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div>
        <h1>Device Approval Demo</h1>
        <Button onClick={handleSendToken}>Gửi Thông Báo Test</Button>
        <Label>Token: </Label>
        <Label>{deviceToken}</Label>
        <Button variant={"outline"} onClick={handleCopy}>
          <Copy />
        </Button>
        <Label>isSupported: {isSupport}</Label>
      </div>
    </div>
  );
};

export default memo(Home);
