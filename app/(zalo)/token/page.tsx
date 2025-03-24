"use client"; // Nếu dùng Next.js 13+ (app router)

import { post } from "@/api/client";
import { useAlertDialog } from "@/components/global-alert-dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ToastError, ToastSuccess } from "@/lib/toast";
import { getZaloToken } from "@/store/action/zalo";
import { useGlobalLoadingStore } from "@/store/GlobalStoreLoading";
import { useZaloData } from "@/store/ZaloDataStore";
import { Copy, Loader } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

const PageToken = () => {
  // const [accessToken, setAccessToken] = useState<string>("");
  // const [refreshToken, setRefreshToken] = useState<string>("");

  const [accessTokenCopy, setAccessTokenCopy] = useState<boolean>(false);
  const [refreshTokenCopy, setRefreshTokenCopy] = useState<boolean>(false);

  const [loadingToken, setLoadingToken] = useState<boolean>(true);
  const setLoadingGlobal = useGlobalLoadingStore((state) => state.setLoading);

  const { access_token, refresh_token, setAccessToken, setRefreshToken } =
    useZaloData();

  const { showAlert } = useAlertDialog();

  const copyAccessToken = () => {
    setAccessTokenCopy(true);
    copyValueToTempMemory(access_token);

    setTimeout(() => {
      setAccessTokenCopy(false);
    }, 3000);
  };

  const copyRefreshToken = () => {
    setRefreshTokenCopy(true);
    copyValueToTempMemory(refresh_token);

    setTimeout(() => {
      setRefreshTokenCopy(false);
    }, 3000);
  };

  const copyValueToTempMemory = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied!");
    } catch (err) {
      console.error("Failed to copy:", err);
      toast.error("Copy failed!");
    }
  };

  // const handleAuthenticationZalo = () => {
  //   console.log(
  //     "process.env.NEXT_PUBLIC_ZALO_APP_ID ==",
  //     process.env.NEXT_PUBLIC_ZALO_APP_ID,
  //     process.env.NEXT_PUBLIC_REDIRECT_URI
  //   );
  //   // Phải expose biến môi trường trong Next.js
  //   const URI_AUTH_ZALO = `https://oauth.zaloapp.com/v4/oa/permission?app_id=${
  //     process.env.NEXT_PUBLIC_ZALO_APP_ID
  //   }&redirect_uri=${encodeURIComponent(
  //     process.env.NEXT_PUBLIC_REDIRECT_URI || ""
  //   )}`;

  //   console.log("URI_AUTH_ZALO === ", URI_AUTH_ZALO);
  //   window.open(
  //     URI_AUTH_ZALO,
  //     "_blank",
  //     "width=500,height=600,noopener,noreferrer"
  //   );
  // };

  const handleGrantNewToken = async () => {
    try {
      setLoadingGlobal(true);
      const result = await post(
        "/webhook/refresh-token",
        {
          refresh_token,
        },
        {
          credentials: "include",
        }
      );

      if (!result || result.error || !result.data) {
        ToastError("Tạo mới token không thành công");
        return;
      }
      setAccessToken(result.data.accessToken);
      setRefreshToken(result.data.refreshToken);
      ToastSuccess("Tạo mới token thành công");
    } catch (ex) {
      console.log("ex", ex);
      ToastError("Tạo mới token không thành công");
    } finally {
      setLoadingGlobal(false);
    }
  };

  const getToken = useCallback(async () => {
    try {
      if (access_token && refresh_token) return;

      setLoadingToken(true);

      const result = await getZaloToken();

      if (!result) return;

      const {
        access_token: res_access_token,
        refresh_token: res_refresh_token,
      } = result;

      setAccessToken(res_access_token);
      setRefreshToken(res_refresh_token);
    } catch (ex) {
      console.log("ex", ex);
      ToastError("ex.message");
    } finally {
      setLoadingToken(false);
    }
  }, [access_token, refresh_token, setAccessToken, setRefreshToken]);

  useEffect(() => {
    getToken();
  }, [getToken]);

  return (
    <div className="mx-4">
      {/* <div className="mb-4">
        <Button
          className="bg-blue-500 cursor-pointer"
          onClick={handleAuthenticationZalo}>
          Authentication Zalo
        </Button>
      </div> */}

      <div className="flex flex-col gap-4 overflow-hidden">
        <Label className="font-semibold">
          Access Token
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Copy
                  className="size-4 cursor-pointer"
                  onClick={copyAccessToken}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {accessTokenCopy ? "Đã sao chép vào bộ nhớ tạm " : "Sao chép"}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Label>

        <Label className="max-w-3xs font-normal">
          {loadingToken ? (
            <Loader className="animate-spin" />
          ) : (
            access_token || "Không có dữ liệu"
          )}
        </Label>

        <Label className="font-semibold">
          Refresh Token
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Copy
                  className="size-4 cursor-pointer"
                  onClick={copyRefreshToken}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {refreshTokenCopy
                    ? "Đã sao chép vào bộ nhớ tạm "
                    : "Sao chép"}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Label>

        <Label className="max-w-3xs font-normal">
          {loadingToken ? (
            <Loader className="animate-spin" />
          ) : (
            refresh_token || "Không có dữ liệu"
          )}
        </Label>
      </div>

      <div className="mt-4">
        <Button
          className="cursor-pointer"
          variant={"outline"}
          onClick={() =>
            showAlert(
              "Xác nhận",
              "Bạn có chắc chắn muốn tạo lại token mới không?",
              handleGrantNewToken
            )
          }>
          Grant & save new token
        </Button>
      </div>
    </div>
  );
};

export default PageToken;
