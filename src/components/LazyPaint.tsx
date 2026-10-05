import type { CSSProperties, ReactNode } from "react";

type LazyPaintProps = {
  children: ReactNode;
  // Real measured height at the two extremes (mobile / lg+ desktop) — the
  // browser reserves this via contain-intrinsic-size so nothing shifts
  // layout once it actually renders the section.
  height: { base: number; lg: number };
};

// Tells the browser to skip layout/paint work for this section while it's
// off-screen (native `content-visibility: auto`), WITHOUT changing when its
// JS mounts, any animation, or loading-state behavior — React still renders
// everything eagerly and in order, exactly as before. This is deliberately
// NOT a JS-driven mount gate (that approach — conditionally rendering based
// on IntersectionObserver — broke header nav-link scrolling twice: once
// because a clicked section's target didn't exist in the DOM yet, and once
// because an in-flight smooth-scroll passed over a section that was still
// collapsing/expanding mid-animation). content-visibility defers only the
// expensive rendering work the browser already knows how to resume
// seamlessly, so `document.getElementById` and `scrollIntoView` keep
// working exactly as they always have.
export default function LazyPaint({ children, height }: LazyPaintProps) {
  const style = {
    "--civ-base": `${height.base}px`,
    "--civ-lg": `${height.lg}px`,
  } as CSSProperties;

  return (
    <div
      style={style}
      className="[content-visibility:auto] [contain-intrinsic-block-size:var(--civ-base)] lg:[contain-intrinsic-block-size:var(--civ-lg)]"
    >
      {children}
    </div>
  );
}
