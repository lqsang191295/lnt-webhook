import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { SidebarLeft } from "./side-bar-left";
import { SidebarRight } from "./side-bar-right";

export function SidebarPanel() {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="rounded-lg border h-full w-full">
      <ResizablePanel defaultSize={20}>
        <SidebarLeft />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={80}>
        <SidebarRight />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
