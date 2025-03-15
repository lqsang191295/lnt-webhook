"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";

export function TeamSwitcher() {
  return (
    <Link className="flex gap-x-2" href={"/"}>
      <div className="flex aspect-square size-8 items-center justify-center text-sidebar-primary-foreground border border-gray-400 rounded-xs">
        <Image src={"/imgs/logo.png"} width={36} height={36} alt="Logo" />
      </div>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate text-[10px]">BỆNH VIỆN ĐA KHOA</span>
        <span className="truncate text-base font-semibold">LÊ NGỌC TÙNG</span>
      </div>
    </Link>
  );
}
