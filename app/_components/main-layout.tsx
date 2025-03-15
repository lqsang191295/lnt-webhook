"use client";

import { ReactNode } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import HeaderLayout from "./header";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <HeaderLayout />
        <main>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default MainLayout;
