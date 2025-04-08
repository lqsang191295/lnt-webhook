"use client";

import { memo, ReactNode } from "react";
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
        <main className="w-full h-full">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default memo(MainLayout);
