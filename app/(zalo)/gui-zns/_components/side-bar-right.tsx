"use client";

import { eTab, useGuiZnsStore } from "../_store";
import { GuiZns } from "./gui-zns";
import { GuiZnsDev } from "./gui-zns-dev";
import { GuiZnsHashPhone } from "./gui-zns-hash-phone";
import { GuiZnsJourney } from "./gui-zns-journey";
import { GuiZnsRsa } from "./gui-zns-rsa";

export function SidebarRight() {
  const { tab } = useGuiZnsStore();

  switch (tab.id) {
    case eTab.GuiZns:
      return <GuiZns />;
    case eTab.GuiZnsSuDungHashPhone:
      return <GuiZnsHashPhone />;
    case eTab.GuiZnsSuDungDevMode:
      return <GuiZnsDev />;
    case eTab.GuiZnsMaHoaRsa:
      return <GuiZnsRsa />;
    case eTab.GuiZnsJourney:
      return <GuiZnsJourney />;
  }

  return <div className="flex flex-col">SidebarRight</div>;
}
