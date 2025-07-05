"use client";

import React from "react";
import dynamic from "next/dynamic";

const ErmHsbaCanKyContentReload = dynamic(() => import("./content"), {
  ssr: false,
});

export default function ErmHsbaCanKyPage() {
  return <ErmHsbaCanKyContentReload />;
}
