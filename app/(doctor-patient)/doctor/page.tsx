'use client';

import { useState } from "react";
import MainContent from "../_components/main-content";
import Navbar from "../_components/nav-bar";
import { sidebarDoctorItems } from "@/constant/nav-bar";
import { iNavbarItemType } from "@/types/nav-bar";
import NavbarMobile from "../_components/nav-bar-mobile";

export default function Page() {
  const [navbarItem, setNavbarItem] = useState<iNavbarItemType>(sidebarDoctorItems[0])

  return <div className="flex h-screen">
    <Navbar navbarData={sidebarDoctorItems} navbarItem={navbarItem} onClick={setNavbarItem} />
    <NavbarMobile navbarData={sidebarDoctorItems} navbarItem={navbarItem} onClick={setNavbarItem} />

    <MainContent navbarItem={navbarItem} />
  </div>;
}
