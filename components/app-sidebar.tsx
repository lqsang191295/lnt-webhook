"use client";

import * as React from "react";
import {
  BellRing,
  BookOpen,
  Bot,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import NavUser from "./nav-user";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Zalo",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Token",
          url: "/token",
        },
        {
          title: "Gửi ZNS",
          url: "/gui-zns",
        },
        {
          title: "Truy xuất thông tin",
          url: "/truy-xuat-thong-tin",
        },
      ],
    },
    {
      title: "Manager",
      url: "#",
      icon: Bot,
      isActive: true,
      items: [
        {
          title: "Cron Jobs",
          url: "/cron-jobs",
        },
        {
          title: "Editor",
          url: "/editor",
        },
        {
          title: "Dnd Kit",
          url: "/dnd-kit",
        },
        {
          title: "AI GPT",
          url: "/ai-gpt",
        },
        {
          title: "Quiz",
          url: "/quiz",
        },
        {
          title: "Cây kiến thức",
          url: "/cay-kien-thuc",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Notifications",
      url: "#",
      icon: BellRing,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
