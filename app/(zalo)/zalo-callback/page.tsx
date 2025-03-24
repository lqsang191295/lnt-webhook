"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { post } from "@/api/client";
import { Loader } from "lucide-react";

enum Status {
  Processing,
  ProcessSuccess,
  ProcessFail,
}

const ZaloCallback = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<Status>(Status.Processing);
  const [time, setTime] = useState<number>(3);

  const getMessStatus = () => {
    switch (status) {
      case Status.Processing:
        return "Đang xử lý đăng nhập Zalo...";
      case Status.ProcessSuccess:
        return "Đăng nhập Zalo thành công.";
      case Status.ProcessFail:
        return "Đăng nhập Zalo thất bại.";
    }

    return "";
  };

  useEffect(() => {
    if (!status) return;

    if (time <= 0) {
      router.push("/token");
      return;
    }

    const timer = setTimeout(() => {
      setTime((prev) => prev - 1); // Giảm time đi 1 mỗi giây
    }, 1000);

    return () => clearTimeout(timer);
  }, [status, time, router]);

  useEffect(() => {
    const code = searchParams.get("code");
    const oaId = searchParams.get("oaId");

    console.log("Zalo Authorization Code:", code);

    if (!code || !oaId) {
      setStatus(Status.ProcessFail);
      return;
    }

    // Gửi code về backend để lấy Access Token
    post("/webhook", {
      code,
      oaId,
    })
      .then((res) => res)
      .then((data) => {
        setStatus(Status.ProcessSuccess);
        console.log("Access Token:", data);
      })
      .catch((err) => {
        setStatus(Status.ProcessFail);
        console.error("Lỗi khi lấy token:", err);
      });
  }, [searchParams]);

  return (
    <h2 className="flex">
      <Loader className="animate-spin mr-4" />
      <span>{getMessStatus()}</span>
      {(status === Status.ProcessFail || status === Status.ProcessSuccess) &&
        ` Chuyển hướng sau ${time} giây...`}
    </h2>
  );
};

export default function ZaloCallbackPage() {
  return (
    <div className="mx-4">
      <Suspense
        fallback={
          <div className="flex">
            <Loader className="animate-spin mr-4" /> <span>Loading...</span>
          </div>
        }>
        <ZaloCallback />
      </Suspense>
    </div>
  );
}
