"use client";

import Link from "next/link";
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import React, { memo, useCallback, useEffect, useId, useState } from "react";
import { useNotificationStore } from "@/store/notification-store";
import NotificationItem from "./notification-item";
import { cn } from "@/lib/utils";
import { getNotifications } from "@/actions/notificatiton";
import { EventSourcePolyfill } from "event-source-polyfill";

const getCookie = () => {
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InF1YW5nc2FuZyIsInVzZXJJZCI6InF1YW5nc2FuZyIsInJvbGVzIjoiUXXhuqNuX1Ry4buLIiwiZW1wSWQiOiJOVjI1XzAwNyIsImlhdCI6MTc0NDAxODQ4NywiZXhwIjoxNzQ0NjIzMjg3fQ.rcgMp5Ud6SXNpp6ec-DEP7VQdgjCAXUBmDFocskrEuM";
};

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
  const id = useId();
  const [open, setOpen] = useState<boolean>(false);
  const { data, setData } = useNotificationStore();
  const [eventSource, setEventSource] = useState<EventSourcePolyfill>();

  const handleOpen = () => {
    setOpen(!open);
  };

  const getData = useCallback(async () => {
    try {
      const res = await getNotifications();

      setData(res.data);
    } catch (ex) {
      console.log("Error get notifications", ex);
    }
  }, [setData]);

  const handleNotificationSse = useCallback(async () => {
    console.log("eventSource ==== ", eventSource);
    if (eventSource) return;

    const token = getCookie();

    const event = new EventSourcePolyfill(
      `${process.env.NEXT_PUBLIC_API}/notification/sse`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    event.onmessage = (e) => {
      const res = JSON.parse(e.data);
      console.log("Received notification:", res);
      // TODO: Hiển thị thông báo trong UI
      if (res.event === "create") {
        setData(res.data);
      }
    };

    setEventSource(event);
  }, [eventSource, setData]);

  useEffect(() => {
    handleNotificationSse();

    // return () => {
    //   eventSource?.close();
    // };
  }, [eventSource, handleNotificationSse]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <SidebarMenuItem key={name} className="relative">
      <SidebarMenuButton asChild onClick={handleOpen}>
        <Link href={url}>
          <Icon />
          <span>{name}</span>
          <span className="bg-red-500 text-white absolute right-0 rounded-xs w-4 h-4 flex justify-center items-center text-xs">
            {data.filter((item) => !item.readed).length}
          </span>
        </Link>
      </SidebarMenuButton>
      <div
        className={cn(
          "fixed w-64 h-screen bg-gray-100 top-0 left-64 overflow-y-scroll",
          open ? "block" : "hidden"
        )}>
        {data.map((item) => {
          return <NotificationItem key={`${id}-${item.id}`} item={item} />;
        })}
      </div>
    </SidebarMenuItem>
  );
};

export default memo(SidebarNotification);
