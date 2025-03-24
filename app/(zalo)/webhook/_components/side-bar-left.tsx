"use client";

import { LIST_WEBHOOK, useWebhookStore } from "@/store/WebhookStore";

export function SidebarLeft() {
  const { setWebhook } = useWebhookStore();

  return (
    <div className="flex flex-col ">
      {LIST_WEBHOOK.map((item) => {
        return (
          <div
            key={item.name}
            className="flex cursor-pointer p-2 gap-1 border-b-1"
            onClick={() => setWebhook(item)}>
            <span>{item.name}</span>
          </div>
        );
      })}
    </div>
  );
}
