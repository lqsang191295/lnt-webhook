import Tiptap from "@/components/tiptap";

export default function Page() {
  console.log("Page Model Render");
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div>Model</div>
      <Tiptap></Tiptap>
    </div>
  );
}
