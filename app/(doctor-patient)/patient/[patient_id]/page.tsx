'use client';

import { useState } from "react";
import MainContent from "../../_components/main-content";
import Navbar from "../../_components/nav-bar";
import { sidebarItems } from "@/constant/nav-bar";
import { iNavbarItemType } from "@/types/nav-bar";

export default function Page() {
  const [navbarItem, setNavbarItem] = useState<iNavbarItemType>(sidebarItems[0])

  return <div className="flex h-screen">
    <Navbar navbarData={sidebarItems} navbarItem={navbarItem} onClick={setNavbarItem} />

    <MainContent navbarItem={navbarItem} />
  </div>;
}
