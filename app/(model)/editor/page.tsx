import TiptapEditor from "@/components/tiptap";
import { Loader } from "lucide-react";
import { Suspense } from "react";

const PageEditor = () => {
  return (
    <div className="p-4">
      <Suspense
        fallback={
          <div className="flex">
            <Loader className="animate-spin mr-4" /> <span>Loading...</span>
          </div>
        }>
        <TiptapEditor></TiptapEditor>
      </Suspense>
    </div>
  );
};

export default PageEditor;
