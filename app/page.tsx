"use client";

import { post } from "@/api/client";
import { Button } from "@/components/ui/button";
import { ToastSuccess } from "@/lib/toast";
import { messaging, getToken } from "@/utils/firebase";
import { registerServiceWorker } from "@/utils/service-worker";
import { memo, useEffect, useState } from "react";

const Home = () => {
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    registerServiceWorker();

    Notification.requestPermission().then(async (permission) => {
      console.log("permission === ", permission);
      if (permission === "granted") {
        try {
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
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div>
        <h1>Device Approval Demo</h1>
        <Button onClick={handleSendToken}>Gửi Thông Báo Test</Button>
      </div>
    </div>
  );
};

export default memo(Home);
