"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import MainContent from "../../_components/main-content";
import Navbar from "../../_components/nav-bar";
import NavbarMobile from "../../_components/nav-bar-mobile";
import { sidebarItems } from "@/constant/nav-bar";
import { iNavbarItemType } from "@/types/nav-bar";
import { usePatientStore } from "@/store/patient-store";

export default function Page() {
  const router = useRouter();
  const params = useParams();
  const maBN = params.patient_id as string;

  const [navbarItem, setNavbarItem] = useState<iNavbarItemType>(
    sidebarItems[0]
  );

  const logged = usePatientStore((state) => state.patient?.logged);
  const setData = usePatientStore((state) => state.setData);

  console.log("logged === ", logged);

  useEffect(() => {
    const tokenPatient = localStorage.getItem("token-patient");

    if (tokenPatient) {
      try {
        const parsedToken = JSON.parse(atob(tokenPatient));
        if (parsedToken?.phone) {
          setData({ maBN, phone: parsedToken.phone, logged: true });
        }
      } catch {
        setData({ maBN, phone: null, logged: false });
      }
    } else {
      setData({ maBN, phone: null, logged: false });
    }
  }, [maBN, setData]);

  useEffect(() => {
    if (logged === false) {
      router.push(`/patient/login?id=${maBN}`);
    }
  }, [logged, maBN, router]);

  if (!logged) return;

  return (
    <div className="flex h-screen flex-col md:flex-row">
      <Navbar
        navbarData={sidebarItems}
        navbarItem={navbarItem}
        onClick={setNavbarItem}
      />
      <NavbarMobile
        navbarData={sidebarItems}
        navbarItem={navbarItem}
        onClick={setNavbarItem}
      />
      <MainContent navbarItem={navbarItem} />
    </div>
  );
}
