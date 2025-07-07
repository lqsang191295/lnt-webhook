"use client";

import React from "react";
import dynamic from "next/dynamic";
import LoadingPage from "../../_components/loading";

const ErmChuKySoContentReload = dynamic(() => import("./content"), {
  ssr: false,
   loading: () => <LoadingPage />,
});

export default function ErmChuKySoPage() {
  return <ErmChuKySoContentReload />;
}
