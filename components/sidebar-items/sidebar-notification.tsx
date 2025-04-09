import Link from "next/link";
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import React from "react";

interface iSidebarNotificationProps {
  icon: React.ElementType;
  url: string;
  name: string;
}

const SidebarNotification = ({
  icon: Icon,
  url,
  name,
}: iSidebarNotificationProps) => {
  return (
    <SidebarMenuItem key={name}>
      <SidebarMenuButton asChild>
        <Link href={url}>
          <Icon />
          <span>{name}</span>
          <span className="bg-red-500 text-white absolute right-0 rounded-xs w-4 h-4 flex justify-center items-center text-xs">
            3
          </span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default SidebarNotification;
