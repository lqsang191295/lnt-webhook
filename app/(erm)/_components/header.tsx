"use client";

import React from "react";
import { Label, ShellBar, ShellBarItem } from "@ui5/webcomponents-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Header({ bearcums }: { bearcums?: string }) {
  const router = useRouter();

  return (
    <ShellBar className="px-2" onLogoClick={() => router.push("/erm")}>
      <div slot="startButton" className="flex items-center gap-2">
        <Link href={"/erm"} className="">
          <Label className="font-semibold cursor-pointer text-blue-500 underline">
            Hồ sơ bệnh án
          </Label>
        </Link>
        {bearcums && (
          <>
            <Label className="text-gray-500 text-xs">{`>`}</Label>
            <Label className="text-gray-700 text-xs">{bearcums}</Label>
          </>
        )}
      </div>
      <ShellBarItem icon="bell" text="Thông báo" />
    </ShellBar>
  );
}
