"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { post } from "@/api/client";
import { Loader } from "lucide-react";

export default function ZaloCallback() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const code = searchParams.get("code");
    const oaId = searchParams.get("oaId");

    console.log("Zalo Authorization Code:", code);

    if (!code || !oaId) {
      return;
    }

    // Gửi code về backend để lấy Access Token
    post("/webhook", {
      code,
      oaId,
    })
      .then((res) => res)
      .then((data) => {
        console.log("Access Token:", data);
        router.push("/token"); // Chuyển hướng sau khi login thành công
      })
      .catch((err) => console.error("Lỗi khi lấy token:", err));
  }, [searchParams, router]);

  return (
    <h2 className="flex">
      <Loader className="animate-spin mr-4" />
      <span>Đang xử lý đăng nhập Zalo...</span>
    </h2>
  );
}
