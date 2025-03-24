"use client";
import { Editor } from "@tiptap/react";
import { ComboboxCustom } from "../custom/combobox-custom";
import {
  Check,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Pilcrow,
} from "lucide-react";
import { CommandItem } from "../ui/command";
import { cn } from "@/lib/utils";

interface HeadingToolbarProps {
  editor: Editor | null;
}

export type Level = 1 | 2 | 3 | 4 | 5 | 6;

const HeadingData = [
  {
    value: "Paragraph",
    icon: Pilcrow,
    label: "Paragraph",
  },
  {
    value: "H1",
    icon: Heading1,
    label: "H1",
  },
  {
    value: "H2",
    icon: Heading2,
    label: "H2",
  },
  {
    value: "H3",
    icon: Heading3,
    label: "H3",
  },
  {
    value: "H4",
    icon: Heading4,
    label: "H4",
  },
  {
    value: "H5",
    icon: Heading5,
    label: "H5",
  },
  {
    value: "H6",
    icon: Heading6,
    label: "H6",
  },
];

const HeadingToolbar: React.FC<HeadingToolbarProps> = ({ editor }) => {
  if (!editor) return null;

  const onClickParagraph = () => {
    editor.commands.setParagraph();
  };

  const onClickHeading = (level: Level) => {
    editor.chain().focus().toggleHeading({ level }).run();
  };

  const onSelected = (value: string) => {
    switch (value) {
      case "Paragraph":
        onClickParagraph();
        break;
      default:
        onClickHeading(parseInt(value.replace("H", "")) as Level);
        break;
    }
  };

  return (
    <>
      <ComboboxCustom editor={editor} onSelected={onSelected}>
        {({ onSelect, value }) => {
          return HeadingData.map((d) => (
            <CommandItem key={d.value} value={d.value} onSelect={onSelect}>
              <d.icon />
              {d.label}
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
    </>
  );
};

export default HeadingToolbar;
