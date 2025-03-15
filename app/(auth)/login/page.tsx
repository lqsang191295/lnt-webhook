import { LoginForm } from "@/components/login-form";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex gap-x-2 justify-center">
          <div className="flex aspect-square size-8 items-center justify-center text-sidebar-primary-foreground border border-gray-400 rounded-xs">
            <Image src={"/imgs/logo.png"} width={36} height={36} alt="Logo" />
          </div>
          <div className="grid text-left text-sm leading-tight">
            <span className="truncate text-[10px]">BỆNH VIỆN ĐA KHOA</span>
            <span className="truncate text-base font-semibold">
              LÊ NGỌC TÙNG
            </span>
          </div>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
