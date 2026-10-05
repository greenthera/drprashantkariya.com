import { LazyMotion, domAnimation } from "framer-motion";
import type { ReactNode } from "react";

// The existing lazy section owns its animation features. Keep them synchronous
// with that section so all triggers and timings stay the same, while the hero
// and navigation no longer import the animation runtime through Layout.
export default function MotionFeatures({ children }: { children: ReactNode }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}
