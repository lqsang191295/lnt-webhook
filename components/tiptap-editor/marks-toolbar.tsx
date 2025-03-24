"use client";
import { Editor } from "@tiptap/react";
import { ToggleGroupCustom } from "../custom/toggle-group-custom";
import {
  Bold,
  Code,
  Italic,
  Link,
  Paintbrush,
  Strikethrough,
  Subscript,
  Superscript,
  Underline,
} from "lucide-react";

interface MarksToolbarProps {
  editor: Editor | null;
}

const markData1 = [
  {
    icon: Bold,
    value: "Bold",
  },
  {
    icon: Italic,
    value: "Italic",
  },
  {
    icon: Underline,
    value: "Underline",
  },
];

const markData2 = [
  {
    icon: Code,
    value: "Code",
  },
  {
    icon: Link,
    value: "Link",
  },
  {
    icon: Strikethrough,
    value: "Strike",
  },
];

const markData3 = [
  {
    icon: Subscript,
    value: "Subscript",
  },
  {
    icon: Superscript,
    value: "Superscript",
  },
  {
    icon: Paintbrush,
    value: "Link",
  },
];

const MarksToolbar: React.FC<MarksToolbarProps> = ({ editor }) => {
  if (!editor) return null;

  const onClick = (value: string) => {
    switch (value) {
      case "Bold":
        editor.chain().focus().toggleBold().run();
        break;
      case "Italic":
        editor.chain().focus().toggleItalic().run();
        break;
      case "Underline":
        editor.chain().focus().toggleUnderline().run();
      case "Code":
        editor.chain().focus().toggleCode().run();
        break;
      case "Link":
        // editor.chain().focus().toggleLink().run();
        break;
      case "Strike":
        editor.chain().focus().toggleStrike().run();
        break;
      case "Subscript":
        editor.chain().focus().toggleSubscript().run();
        break;
      case "Superscript":
        editor.chain().focus().toggleSuperscript().run();
        break;
    }
  };

  return (
    <>
      <ToggleGroupCustom editor={editor} data={markData1} onClick={onClick} />
      <ToggleGroupCustom editor={editor} data={markData2} onClick={onClick} />
      <ToggleGroupCustom editor={editor} data={markData3} onClick={onClick} />
    </>
  );
};

export default MarksToolbar;
