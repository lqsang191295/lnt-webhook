"use client";

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { tUser, useUserStore } from "@/store/user-store";
import { jwtVerify } from "jose";
import { GetServerSideProps } from "next";
import { useEffect } from "react";
import { verifyUser } from "@/actions/auth";
import Link from "next/link";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies.authToken; // Lấy token từ cookie

  console.log("aaaaaaaaaa 123123123", token);

  if (!token) {
    return { redirect: { destination: "/login", permanent: false } };
  }

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET!)
    );
    return { props: { user: payload } }; // Trả về dữ liệu người dùng vào props
  } catch (error) {
    console.log("error ", error);
    return { redirect: { destination: "/login", permanent: false } };
  }
};

export default function NavUser() {
  const { user, setUser } = useUserStore();
  const { isMobile } = useSidebar();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await verifyUser(); // Gọi action từ server

        if (result) {
          setUser(result as tUser);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={""} alt={user?.username} />
                <AvatarFallback className="rounded-lg uppercase">
                  {user?.username.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user?.username}</span>
                <span className="truncate text-xs">{user?.userId}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}>
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={""} alt={user?.username} />
                  <AvatarFallback className="rounded-lg uppercase">
                    {user?.username.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {user?.username}
                  </span>
                  <span className="truncate text-xs">{user?.userId}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                <Link href={"/profile"}>Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
