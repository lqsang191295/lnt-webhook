"use client";
import { Editor } from "@tiptap/react";
import { useState } from "react";
import { GradientPicker } from "../gradient-picker";
import { Button } from "../ui/button";
import { PencilLine } from "lucide-react";
import { cn } from "@/lib/utils";

interface HighlightToolbarProps {
  editor: Editor | null;
}

const HighlightToolbar: React.FC<HighlightToolbarProps> = ({ editor }) => {
  const [background, setBackground] = useState("");

  // editor.chain().focus().toggleHighlight().run();

  if (!editor) return null;

  const onApply = () => {
    editor.chain().focus().toggleHighlight({ color: "#8ce99a" }).run();
  };

  return (
    <GradientPicker
      background={background}
      setBackground={setBackground}
      onApply={onApply}>
      <Button
        variant={"outline"}
        className={cn(
          "max-w-[140px] justify-start text-left font-normal",
          !background && "text-muted-foreground"
        )}>
        <div className="w-full flex items-center gap-2">
          <PencilLine className="h-4 w-4" />
          {background && (
            <div
              className="h-4 w-4 rounded !bg-center !bg-cover transition-all"
              style={{ background }}></div>
          )}
          <div className="truncate flex-1">
            {background ? background : "Pick a color"}
          </div>
        </div>
      </Button>
    </GradientPicker>
  );
};

export default HighlightToolbar;
