import { useEffect, useState } from "react";

// Preloads a list of image URLs and reports progress, so a gallery can hold
// a loading state until every image is actually in the browser cache —
// avoids the "captions/cards show up before their images" flash, especially
// on slow mobile connections.
//
// Handles both a static list (known at mount) and a list that starts empty
// and arrives later (e.g. Courses, fetched from an API) — the src list is
// re-tracked whenever its contents actually change.
export function useImagesPreloaded(srcs: string[]) {
  const key = srcs.join("\n");
  const [trackedKey, setTrackedKey] = useState(key);
  const [loadedCount, setLoadedCount] = useState(0);
  const [ready, setReady] = useState(srcs.length === 0);

  // Reset progress synchronously during render when the src list actually
  // changes, rather than in an effect — the React-recommended way to adjust
  // state in response to changed input (avoids an extra committed render
  // showing stale "ready" state from a previous, different list).
  if (key !== trackedKey) {
    setTrackedKey(key);
    setLoadedCount(0);
    setReady(srcs.length === 0);
  }

  useEffect(() => {
    if (srcs.length === 0) return;

    let cancelled = false;
    let count = 0;

    for (const src of srcs) {
      const img = new Image();
      const onDone = () => {
        if (cancelled) return;
        count += 1;
        setLoadedCount(count);
        if (count === srcs.length) setReady(true);
      };
      img.onload = onDone;
      img.onerror = onDone; // a broken image shouldn't block the rest forever
      img.src = src;
    }

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return { loadedCount, total: srcs.length, ready };
}
