import { useEffect, useRef, useState } from "react";

// Plain IntersectionObserver replacement for framer-motion's
// `whileInView`/`viewport={{ once: true }}` pattern — fires once, then
// disconnects. Kept as a shared hook since several eagerly-loaded sections
// (not code-split, so their JS ships in the critical bundle) use the same
// scroll-triggered reveal and previously pulled in framer-motion just for it.
export function useInView<T extends HTMLElement>(threshold = 0.1) {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible] as const;
}
