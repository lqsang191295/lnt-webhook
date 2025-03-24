"use client";

import { LIST_TAB, useGuiZnsStore } from "../_store";

export function SidebarLeft() {
  const { setTab } = useGuiZnsStore();

  return (
    <div className="flex flex-col ">
      {LIST_TAB.map((item) => {
        return (
          <div
            key={item.name}
            className="flex cursor-pointer p-2 gap-1 border-b-1"
            onClick={() => setTab(item)}>
            <span>{item.name}</span>
          </div>
        );
      })}
    </div>
  );
}
