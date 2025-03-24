"use client";

import { ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Item } from "@/store/types/menu";
import { useDispatch } from "react-redux";
import { setSelectedMenu } from "@/store/action/menu";
import { useCallback, useEffect } from "react";
import { usePathname } from "next/navigation";

export function NavMain({ items }: { items: Item[] }) {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment);

  const handleClickMenu = (
    item: Item,
    subItem: { title: string; url: string }
  ) => {
    dispatch(
      setSelectedMenu({ title: item.title, url: item.url, items: [subItem] })
    );
  };

  const handleDetectBreadcum = useCallback(() => {
    if (!pathSegments || !pathSegments.length) {
      dispatch(setSelectedMenu({ title: " Trang chủ", url: "" }));

      return;
    }

    let subItem: { title: string; url: string } = { title: "", url: "" };

    const item = items.find((i) => {
      return i.items?.find((si) => {
        if (si.url === `/${pathSegments[0]}`) {
          subItem = si;
          return si;
        }
      });
    });

    if (!item) {
      return;
    }

    dispatch(
      setSelectedMenu({
        title: item.title,
        url: item.url,
        items: [subItem],
      })
    );
  }, [dispatch, items, pathSegments]);

  useEffect(() => {
    handleDetectBreadcum();
  }, [handleDetectBreadcum]);

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <Link
                          href={subItem.url}
                          onClick={() => handleClickMenu(item, subItem)}>
                          <span>{subItem.title}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
