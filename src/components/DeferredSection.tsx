import { Suspense, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type DeferredSectionProps = {
  // The lazy component itself (not pre-wrapped in Suspense) — this owns the
  // Suspense boundary so its fallback can reserve the same height as the
  // pre-intersection placeholder, with no gap between the two.
  children: ReactNode;
  // Real measured height at the two extremes (mobile / lg+ desktop), so
  // nothing ever shifts layout — neither before the section has mounted,
  // nor during the moment its lazy chunk is still loading.
  minHeight: { base: number; lg: number };
};

// Suspense + React.lazy alone still fires every section's import() the
// moment Home mounts, not when the user actually scrolls near it — on a
// page with this many code-split sections, that means all of their JS
// (and the shared framer-motion chunk they pull in) loads and executes
// during the critical initial-load window regardless of scroll position.
// Gating the mount on IntersectionObserver defers that cost to when it's
// actually needed, with enough rootMargin that real scrolling users never
// see it pop in.
//
// Only wrap sections with no direct nav-link entry point here. SectionLink
// scrolls straight to `document.getElementById(id)` when already on "/" —
// a section a nav link can target (or one sitting between two such targets,
// which an in-between scroll would pass straight over) must stay eagerly
// rendered via plain Suspense instead.
export default function DeferredSection({ children, minHeight }: DeferredSectionProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const style = {
    "--mh-base": `${minHeight.base}px`,
    "--mh-lg": `${minHeight.lg}px`,
  } as CSSProperties;
  const placeholderClassName = "min-h-(--mh-base) lg:min-h-(--mh-lg)";

  if (!visible) {
    return <div ref={ref} style={style} className={placeholderClassName} />;
  }

  // Same reserved height as the fallback while the lazy chunk is still
  // loading, so becoming visible never causes a brief collapse-then-pop-in.
  return (
    <Suspense fallback={<div style={style} className={placeholderClassName} />}>
      {children}
    </Suspense>
  );
}
