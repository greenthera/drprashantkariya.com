import { useRef } from "react";
import { motion, useMotionValue, useAnimationFrame, animate } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { testimonialData } from "../data/testimonials";
import { getYearsOfPractice } from "../lib/practice";

const reviews = testimonialData.filter(t => t.rating_context === "Positive");

const CARD_W = 340; // w-80 (320) + gap-5 (20)
const SPEED  = 0.038; // px per ms ≈ ~38px/s

function toTitleCase(name: string) {
  return name.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ");
}

function initials(name: string) {
  return name.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();
}

function Card({ review }: { review: typeof reviews[0] }) {
  return (
    <div className="w-80 shrink-0 bg-white/8 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex flex-col gap-4 hover:bg-white/12 transition-colors duration-300">
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={13} className="text-[#F2B33D] fill-[#F2B33D]" />
        ))}
      </div>
      <p className="font-display italic text-white/85 text-base leading-relaxed flex-1">
        "{review.feedback}"
      </p>
      <div className="flex items-center gap-3 pt-2 border-t border-white/10">
        <div className="w-9 h-9 rounded-full bg-[#F2B33D]/20 border border-[#F2B33D]/30 flex items-center justify-center shrink-0">
          <span className="text-[#F2B33D] text-[11px] font-bold tracking-wide">
            {initials(review.name)}
          </span>
        </div>
        <p className="text-white/60 text-xs font-medium tracking-wide">
          {toTitleCase(review.name)}
        </p>
      </div>
    </div>
  );
}

export default function Testimonial() {
  const TOTAL = reviews.length * CARD_W;
  const items = [...reviews, ...reviews];

  const x          = useMotionValue(0);
  const dragging   = useRef(false);
  const ptrStartX  = useRef(0);
  const xAtDragStart = useRef(0);

  /* ── Auto-scroll ── */
  useAnimationFrame((_, delta) => {
    if (dragging.current) return;
    let next = x.get() - delta * SPEED;
    if (next < -TOTAL) next += TOTAL;
    x.set(next);
  });

  /* ── Pointer drag (works on mouse + touch) ── */
  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    dragging.current = true;
    ptrStartX.current    = e.clientX;
    xAtDragStart.current = x.get();
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!dragging.current) return;
    let next = xAtDragStart.current + (e.clientX - ptrStartX.current);
    // clamp so user can't pull too far in either direction
    next = Math.max(-TOTAL * 1.2, Math.min(TOTAL * 0.2, next));
    x.set(next);
  }

  function onPointerUp() {
    if (!dragging.current) return;
    dragging.current = false;
    // Normalise back into the looping range
    let cur = x.get();
    if (cur < -TOTAL) cur += TOTAL;
    if (cur > 0)      cur -= TOTAL;
    x.set(cur);
  }

  /* ── Arrow buttons ── */
  function step(dir: 1 | -1) {
    let next = x.get() - dir * CARD_W;
    if (next < -TOTAL) next += TOTAL;
    if (next > 0)      next -= TOTAL;
    animate(x, next, { type: "spring", stiffness: 380, damping: 38 });
  }

  return (
    <section className="py-20 md:py-24 bg-[#2E3A9E] overflow-hidden">

      {/* Header */}
      <div className="px-6 md:px-10 max-w-[1400px] mx-auto mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6"
        >
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 bg-[#F2B33D]/15 border border-[#F2B33D]/25 rounded-lg flex items-center justify-center">
                <Quote size={14} className="text-[#F2B33D]" />
              </div>
              <span className="text-[#F2B33D] font-medium uppercase tracking-[0.25em] text-[10px]">
                Patient Stories
              </span>
            </div>
            <h2
              className="font-display font-bold text-[#F5E6C8] tracking-tight leading-none"
              style={{ fontSize: "clamp(2.6rem, 5vw, 4.2rem)" }}
            >
              What Clients <span className="italic text-[#F2B33D]">Say.</span>
            </h2>
          </div>

          {/* Arrow buttons — shown on all devices */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => step(-1)}
              aria-label="Previous"
              className="w-11 h-11 rounded-full border border-white/20 bg-white/8 flex items-center justify-center text-white hover:bg-white/18 active:scale-95 transition-all duration-200"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => step(1)}
              aria-label="Next"
              className="w-11 h-11 rounded-full border border-white/20 bg-white/8 flex items-center justify-center text-white hover:bg-white/18 active:scale-95 transition-all duration-200"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="relative select-none overflow-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-linear-to-r from-[#2E3A9E] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-linear-to-l from-[#2E3A9E] to-transparent pointer-events-none" />

        <motion.div
          className="flex gap-5 w-max px-5 cursor-grab active:cursor-grabbing touch-pan-y"
          style={{ x }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          {items.map((review, i) => (
            <Card key={i} review={review} />
          ))}
        </motion.div>
      </div>

      {/* Swipe hint — shows only on touch devices */}
      <p className="text-center text-white/25 text-[10px] font-medium uppercase tracking-[0.25em] mt-5 md:hidden">
        Swipe to browse
      </p>

      {/* Stat bar */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="px-6 md:px-10 max-w-[1400px] mx-auto mt-14 pt-10 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-6"
      >
        <div className="flex items-center gap-3">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={16} className="text-[#F2B33D] fill-[#F2B33D]" />
            ))}
          </div>
          <span className="font-display text-2xl font-bold italic text-[#F5E6C8]">4.8</span>
          <span className="text-[#8993CC] text-xs font-medium uppercase tracking-[0.2em]">Average Rating</span>
        </div>
        <div className="flex items-center gap-8">
          <div className="text-center">
            <p className="font-display text-3xl font-bold italic text-[#F2B33D]">500+</p>
            <p className="text-[#8993CC] text-[10px] uppercase tracking-[0.2em] font-medium mt-1">Happy Families</p>
          </div>
          <div className="w-px h-10 bg-white/10" />
          <div className="text-center">
            <p className="font-display text-3xl font-bold italic text-[#F2B33D]">{getYearsOfPractice()}</p>
            <p className="text-[#8993CC] text-[10px] uppercase tracking-[0.2em] font-medium mt-1">Years Trusted</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
