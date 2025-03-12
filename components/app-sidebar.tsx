"use client";

import { ChevronRight, LifeBuoy, Radio, Webhook } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Menu items.
export const menuItems = [
  {
    title: "Home",
    url: "/",
    icon: Radio,
  },
  {
    title: "Zalo",
    url: "#",
    icon: Radio,
    items: [
      {
        title: "Webhook",
        url: "/webhook",
        icon: Webhook,
      },
      {
        title: "Token",
        url: "/token",
        icon: LifeBuoy,
      },
    ],
  },
];

export function AppSidebar({
  onSelect,
}: {
  onSelect: (items: string[]) => void;
}) {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment);

  const autoGetBreadcrumb = () => {
    console.log("pathSegments ========== ", pathSegments);
    if (!pathSegments || !pathSegments.length) {
      return onSelect([menuItems[0].title]);
    }

    const item = menuItems.find((i) => {
      return i.items?.find((ii) => {
        return ii.url === `/${pathSegments[0]}`;
      });
    });

    if (!item) return;

    onSelect([item.title, pathSegments[0]]);
  };

  useEffect(() => {
    autoGetBreadcrumb();
  }, []);

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarContent className="gap-0">
        {menuItems.map((item) => (
          <Collapsible
            key={item.title}
            title={item.title}
            defaultOpen
            className="group/collapsible ">
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                <CollapsibleTrigger>
                  <item.icon />{" "}
                  <a className="mx-2 cursor-pointer" href={item.url}>
                    {item.title}
                  </a>
                  {item.items && (
                    <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                  )}
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {item.items?.map((it) => (
                      <SidebarMenuItem key={it.title}>
                        <SidebarMenuButton asChild>
                          <a href={it.url}>
                            <it.icon />
                            <span>{it.title}</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
