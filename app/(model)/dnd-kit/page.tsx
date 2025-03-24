import { Loader } from "lucide-react";
import { Suspense } from "react";

const PageDndKit = () => {
  return (
    <div className="p-4">
      <Suspense
        fallback={
          <div className="flex">
            <Loader className="animate-spin mr-4" /> <span>Loading...</span>
          </div>
        }>
        PageDndKit
      </Suspense>
    </div>
  );
};

export default PageDndKit;
