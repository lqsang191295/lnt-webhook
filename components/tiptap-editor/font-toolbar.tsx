"use client";
import { Editor } from "@tiptap/react";
import { Check } from "lucide-react";
import { ComboboxCustom } from "../custom/combobox-custom";
import { CommandItem } from "../ui/command";
import { cn } from "@/lib/utils";

interface FontToolbarProps {
  editor: Editor | null;
}

const FontData = [
  {
    value: "Inter",
    label: "Inter",
  },
  {
    value: "Comic Sans MS, Comic Sans",
    label: "Comic Sans MS, Comic Sans",
  },
  {
    value: "serif",
    label: "Serif",
  },
  {
    value: "monospace",
    label: "Monospace",
  },
  {
    value: "cursive",
    label: "Cursive",
  },
  {
    value: "Exo 2",
    label: "Exo 2",
  },
];

const FontToolbar: React.FC<FontToolbarProps> = ({ editor }) => {
  if (!editor) return null;

  const onSelected = (value: string) => {
    editor.chain().focus().setFontFamily(value).run();
  };

  return (
    <div className="font-toolbar">
      <ComboboxCustom editor={editor} onSelected={onSelected}>
        {({ onSelect, value }) => {
          return FontData.map((d) => (
            <CommandItem key={d.value} value={d.value} onSelect={onSelect}>
              <span
                className="overflow-hidden whitespace-nowrap text-ellipsis"
                style={{
                  fontFamily: d.value,
                }}>
                {d.label}
              </span>

              <Check
                className={cn(
                  "ml-auto",
                  value === d.value ? "opacity-100" : "opacity-0"
                )}
              />
            </CommandItem>
          ));
        }}
      </ComboboxCustom>
    </div>
  );
};

export default FontToolbar;
