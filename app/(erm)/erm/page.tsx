"use client";

import React from "react";
import dynamic from "next/dynamic";
import LoadingPage from "../_components/loading";

const ErmContentReload = dynamic(() => import("./content"), {
  ssr: false,
  loading: () => <LoadingPage />,
});

export default function ErmPage() {
  return <ErmContentReload />;
}
