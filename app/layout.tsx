"use client";
import "./globals.css";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useState } from "react";
import { Toaster } from "sonner";
import GlobalLoading from "@/components/global-loading";
import { Loader } from "lucide-react";
import { GloabalAlertDialogProvider } from "@/components/global-alert-dialog";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [breadcrumb, setBreadcrumb] = useState<string[]>([]);

  console.log("breadcrumb === ", breadcrumb);

  return (
    <html lang="en">
      <body className={`antialiased`}>
        <GloabalAlertDialogProvider>
          <SidebarProvider>
            <AppSidebar onSelect={setBreadcrumb} />
            <SidebarInset>
              <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                <div className="flex items-center gap-2 px-4">
                  <SidebarTrigger className="-ml-1" />
                  <div className="mr-2 h-4">
                    <Separator orientation="vertical" />
                  </div>
                  {(!breadcrumb || !breadcrumb.length) && (
                    <div>
                      <Loader className="animate-spin" />
                    </div>
                  )}
                  {breadcrumb && breadcrumb.length > 0 && (
                    <Breadcrumb>
                      <BreadcrumbList>
                        <BreadcrumbItem className="hidden md:block">
                          <BreadcrumbLink>
                            {breadcrumb.length >= 1 && breadcrumb[0]}
                          </BreadcrumbLink>
                        </BreadcrumbItem>
                        {breadcrumb.length > 1 && (
                          <BreadcrumbSeparator className="hidden md:block" />
                        )}
                        <BreadcrumbItem>
                          <BreadcrumbPage>
                            {breadcrumb.length >= 2 && breadcrumb[1]}
                          </BreadcrumbPage>
                        </BreadcrumbItem>
                      </BreadcrumbList>
                    </Breadcrumb>
                  )}
                </div>
              </header>
              <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                {children}
              </div>
            </SidebarInset>
          </SidebarProvider>
        </GloabalAlertDialogProvider>

        <Toaster />
        <GlobalLoading />
      </body>
    </html>
  );
}
