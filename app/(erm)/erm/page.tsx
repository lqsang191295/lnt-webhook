"use client";

import React from "react";
import dynamic from "next/dynamic";

const ErmContentReload = dynamic(() => import("./content"), {
  ssr: false,
});

export default function ErmPage() {
  return <ErmContentReload />;
}
