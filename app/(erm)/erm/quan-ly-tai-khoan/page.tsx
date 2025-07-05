"use client";

import React from "react";
import dynamic from "next/dynamic";

const ErmTaiKhoanReload = dynamic(() => import("./content"), {
  ssr: false,
});

export default function ErmTaiKhoanPage() {
  return <ErmTaiKhoanReload />;
}
