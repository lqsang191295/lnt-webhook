"use client";

// import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MainLayout from "./_components/main-layout";
import StoreProvider from "@/store/provider";
import { GloabalAlertDialogProvider } from "@/components/global-alert-dialog";
import { Toaster } from "sonner";
import GlobalLoading from "@/components/global-loading";
import { usePathname } from "next/navigation";
import { getZaloDsTemplate, getZaloToken } from "@/store/action/zalo";
import { useZaloData } from "@/store/ZaloDataStore";
import { useEffect } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log("Layout renderrrrrrrrrrrrrrr");

  const pathname = usePathname();
  const pathnameNotUseLayout = [
    "/login",
    "/terms-of-service",
    "/privacy-policy",
  ];
  const { setAccessToken, setDsTempalte, setRefreshToken } = useZaloData();
  const loadZaloDataAsync = () => {
    getZaloToken().then((resZalo) => {
      if (!resZalo) return;

      const { access_token, refresh_token } = resZalo;

      setAccessToken(access_token);
      setRefreshToken(refresh_token);

      getZaloDsTemplate({ access_token, offset: 0, limit: 100 }).then(
        (data) => {
          setDsTempalte(data);
        }
      );
    });
  };

  useEffect(() => {
    loadZaloDataAsync();
  }, []);

  if (pathnameNotUseLayout.includes(pathname)) {
    return (
      <html lang="en">
        <body>
          {children}
          <Toaster />
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <StoreProvider>
          <GloabalAlertDialogProvider>
            <MainLayout>{children}</MainLayout>
          </GloabalAlertDialogProvider>
        </StoreProvider>

        <Toaster />
        <GlobalLoading />
      </body>
    </html>
  );
}
