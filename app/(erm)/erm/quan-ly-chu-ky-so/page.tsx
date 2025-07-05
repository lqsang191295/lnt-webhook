"use client";

import React from "react";
import dynamic from "next/dynamic";

const ErmChuKySoContentReload = dynamic(() => import("./content"), {
  ssr: false,
});

export default function ErmChuKySoPage() {
  return <ErmChuKySoContentReload />;
}
