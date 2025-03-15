"use client";
import { Editor } from "@tiptap/react";
import { Button } from "../ui/button";
import { Redo, Undo } from "lucide-react";

interface HistoryToolbarProps {
  editor: Editor | null;
}

const HistoryToolbar: React.FC<HistoryToolbarProps> = ({ editor }) => {
  if (!editor) return null;

  const onClickUndo = () => {
    editor.chain().focus().undo().run();
  };

  const onClickRedo = () => {
    editor.chain().focus().redo().run();
  };

  return (
    <div className="history-toolbar flex gap-2">
      <Button
        variant="outline"
        onClick={onClickUndo}
        className="cursor-pointer">
        <Undo />
      </Button>

      <Button
        variant="outline"
        onClick={onClickRedo}
        className="cursor-pointer">
        <Redo />
      </Button>
    </div>
  );
};

export default HistoryToolbar;
