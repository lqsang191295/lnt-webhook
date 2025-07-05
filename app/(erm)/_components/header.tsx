import React from "react";
import { ShellBar, ShellBarItem } from "@ui5/webcomponents-react";

export default function Header() {
  return (
    <ShellBar primaryTitle="Hồ sơ bệnh án">
      <ShellBarItem icon="bell" text="Thông báo" />
    </ShellBar>
  );
}
