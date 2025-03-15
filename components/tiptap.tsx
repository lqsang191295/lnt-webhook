"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import Heading from "@tiptap/extension-heading";
import Paragraph from "@tiptap/extension-paragraph";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Code from "@tiptap/extension-code";
import Link from "@tiptap/extension-link";
import Strike from "@tiptap/extension-strike";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Highlight from "@tiptap/extension-highlight";
import History from "@tiptap/extension-history";
import FontFamily from "@tiptap/extension-font-family";
import TextStyle from "@tiptap/extension-text-style";

import HeadingToolbar from "./tiptap-editor/heading-toolbar";
import MarksToolbar from "./tiptap-editor/marks-toolbar";
import HighlightToolbar from "./tiptap-editor/highlight-toolbar";
import HistoryToolbar from "./tiptap-editor/history-toolbar";
import FontToolbar from "./tiptap-editor/font-toolbar";

const TiptapEditor = () => {
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
      Bold,
      Italic,
      Underline,
      Code,
      Link,
      Strike,
      Subscript,
      Superscript,
      Highlight,
      History,
      FontFamily,
      TextStyle,
    ],
    content: "<p>Nhập nội dung ở đây...</p>",
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="border rounded-md p-4">
      {/* Toolbar */}
      <div className="flex space-x-2 mb-4">
        <HistoryToolbar editor={editor} />
        <FontToolbar editor={editor} />
        <HeadingToolbar editor={editor} />
        <MarksToolbar editor={editor} />
        <HighlightToolbar editor={editor} />
      </div>

      {/* Editor */}
      <EditorContent editor={editor} className="border p-4 min-h-[200px]" />
    </div>
  );
};

export default TiptapEditor;
