"use client";

import { LIST_POPULAR_AI, useModelAIStore } from "@/store/model-ai-store";
import { TypeModelAI } from "@/store/types/model-ai";
import Image from "next/image";

export function SidebarLeft() {
  const setModelAI = useModelAIStore((state) => state.setModelAI);

  const chooseAI = (ai: TypeModelAI) => {
    setModelAI(ai);
  };

  return (
    <div className="flex flex-col ">
      {LIST_POPULAR_AI.map((item) => {
        return (
          <div
            key={item.name}
            className="flex cursor-pointer p-2 gap-1 border-b-1"
            onClick={() => {
              chooseAI(item);
            }}>
            {item.icon && (
              <Image src={item.icon} width={24} height={24} alt={item.name} />
            )}
            <span>{item.name}</span>
          </div>
        );
      })}
    </div>
  );
}
