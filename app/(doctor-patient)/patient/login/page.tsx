import { Suspense } from "react";
import LoginContent from "./content";

export default function Page() {
  return (
    <Suspense fallback={<div>Đang tải...</div>}>
      <LoginContent />
    </Suspense>
  );
}
