"use client";

import { post } from "@/api/client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ToastSuccess } from "@/lib/toast";
import { getMessagingClient, getToken, isSupported } from "@/utils/firebase";
import { registerServiceWorker } from "@/utils/service-worker";
import { Copy } from "lucide-react";
import { memo, useEffect, useState } from "react";

const Home = () => {
  const [token, setToken] = useState<string>("");
  const [isSupport, setIsSupport] = useState<boolean>();

  const getIsSuported = async () => {
    const isSupport = await isSupported();
    setIsSupport(isSupport);
  };

  useEffect(() => {
    registerServiceWorker();
    getIsSuported();

    Notification.requestPermission().then(async (permission) => {
      console.log("permission === ", permission);
      if (permission === "granted") {
        try {
          const messaging = await getMessagingClient();

          if (!messaging) {
            return;
          }

          const token = await getToken(messaging, {
            vapidKey:
              "BJRnJOsD5C6hxbK3DAVdzKFwebsi2sh36UakE4qRHALicyQ6mm_5t4npYD1TvzAjSGaRZNxvvkhlNlfEhHaeJPo",
          });
          console.log("FCM Token:", token);

          // Lưu token này về backend (NestJS) để sau này gửi
          setToken(token);
        } catch (ex) {
          console.log("aaaaaaa ", ex);
        }
      }
    });
  }, []);

  const handleSendToken = async () => {
    try {
      const res = await post("/push-notification/subscribe", {
        token,
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
      await navigator.clipboard.writeText(token);
    } catch {}
  };
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div>
        <h1>Device Approval Demo</h1>
        <Button onClick={handleSendToken}>Gửi Thông Báo Test</Button>
        <Label>Token: </Label>
        <Label>{token}</Label>
        <Button variant={"outline"} onClick={handleCopy}>
          <Copy />
        </Button>
        <Label>isSupported: {isSupport}</Label>
        <Label>Window: {typeof window}</Label>
      </div>
    </div>
  );
};

export default memo(Home);
