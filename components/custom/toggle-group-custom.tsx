import { LucideProps } from "lucide-react";
import { Editor } from "@tiptap/react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Separator } from "../ui/separator";

type ToggleGroupType = {
  value: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
};

interface ComboboxProps {
  data: ToggleGroupType[];
  onClick: (value: string) => void;
  editor: Editor | null;
}

export function ToggleGroupCustom({ editor, data, onClick }: ComboboxProps) {
  if (!editor) return;

  return (
    <ToggleGroup type="multiple" className="border">
      {data.map((item) => {
        return (
          <>
            <ToggleGroupItem
              key={item.value}
              value={item.value}
              aria-label={item.value}
              onClick={() => onClick(item.value)}
              data-state={
                editor.isActive(item.value.toLowerCase()) ? "on" : "off"
              }>
              <item.icon />
            </ToggleGroupItem>
            <Separator key={`separator-${item.value}`} orientation="vertical" />
          </>
        );
      })}
    </ToggleGroup>
  );
}
