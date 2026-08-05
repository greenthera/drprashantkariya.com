import { lazy, Suspense } from "react";
const PublicationsGrid = lazy(() => import("../components/PublicationsGrid"));

export default function Publications() {
  return (
    <Suspense fallback={null}>
      <PublicationsGrid />
    </Suspense>
  );
}
