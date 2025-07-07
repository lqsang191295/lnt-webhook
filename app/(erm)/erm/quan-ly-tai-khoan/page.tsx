"use client";

import React from "react";
import dynamic from "next/dynamic";
import LoadingPage from "../../_components/loading";

const ErmTaiKhoanReload = dynamic(() => import("./content"), {
  ssr: false,
  loading: () => <LoadingPage />,
});

export default function ErmTaiKhoanPage() {
  return <ErmTaiKhoanReload />;
}
