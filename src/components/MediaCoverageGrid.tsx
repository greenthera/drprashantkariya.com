import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Newspaper, ZoomIn } from "lucide-react";
import { mediaCoverage } from "../lib/mediaCoverage";

export default function MediaCoverageGrid() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeIndex === null) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setActiveIndex(null);
      if (e.key === "ArrowRight") setActiveIndex((i) => (i === null ? i : (i + 1) % mediaCoverage.length));
      if (e.key === "ArrowLeft") setActiveIndex((i) => (i === null ? i : (i - 1 + mediaCoverage.length) % mediaCoverage.length));
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex]);

  const active = activeIndex !== null ? mediaCoverage[activeIndex] : null;

  return (
    <div className="relative bg-[#FAF9F6] overflow-hidden pt-24 md:pt-32 pb-20 px-6 md:px-10">

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-35"
        style={{
          backgroundImage: "radial-gradient(circle, #C7CCEE 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="absolute -top-40 -right-40 w-120 h-120 rounded-full bg-[#EAEDFB] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-20 gap-4">
          <div>
            <span className="text-[#F2B33D] font-medium uppercase tracking-[0.25em] text-[10px] block mb-3">
              In The Press
            </span>
            <h1
              className="font-display font-bold text-[#2E3A9E] tracking-tight"
              style={{ fontSize: "clamp(2.6rem, 5vw, 4.2rem)" }}
            >
              Media <span className="italic">Coverage.</span>
            </h1>
          </div>
          <p className="text-[#4F5A8A] text-sm md:max-w-70 leading-relaxed font-light">
            Newspaper features and interviews on child health, parenting, and
            adolescent care over the years.
          </p>
        </div>

        {/* Editorial masonry — each clipping keeps its real aspect ratio, no crop */}
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-5 md:gap-7">
          {mediaCoverage.map((item, index) => (
            <button
              key={item.file}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={item.publication ? `View clipping from ${item.publication}` : "View press clipping"}
              className="block w-full break-inside-avoid mb-5 md:mb-7 bg-white rounded-lg border border-[#E0E8E2] overflow-hidden text-left cursor-zoom-in group shadow-[0_8px_24px_rgba(46,58,158,0.07)] hover:shadow-[0_16px_36px_rgba(46,58,158,0.16)] hover:-translate-y-1 transition-all duration-300"
            >
              <div className="h-0.75 bg-linear-to-r from-[#F2B33D] via-[#F2B33D]/70 to-transparent" />
              <div className="relative overflow-hidden bg-[#FAF9F6]">
                <img
                  src={item.src}
                  alt={item.publication ? `Media coverage in ${item.publication}` : "Media coverage clipping"}
                  loading="lazy"
                  className="w-full h-auto block"
                />
                <div className="absolute inset-0 bg-[#171b3d]/0 group-hover:bg-[#171b3d]/25 transition-colors duration-300 flex items-center justify-center">
                  <span className="w-9 h-9 rounded-full bg-white/0 group-hover:bg-white/95 flex items-center justify-center text-[#2E3A9E] opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100">
                    <ZoomIn size={16} />
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 px-4 py-3.5">
                <Newspaper size={13} className="text-[#F2B33D] shrink-0" />
                <span className="font-display italic text-[#2E3A9E] text-[13px] truncate">
                  {item.publication ?? "Newspaper Feature"}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] bg-[#171b3d]/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
            onClick={() => setActiveIndex(null)}
          >
            <button
              onClick={() => setActiveIndex(null)}
              aria-label="Close"
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <X size={20} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex((i) => (i === null ? i : (i - 1 + mediaCoverage.length) % mediaCoverage.length));
              }}
              aria-label="Previous"
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex((i) => (i === null ? i : (i + 1) % mediaCoverage.length));
              }}
              aria-label="Next"
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <ChevronRight size={22} />
            </button>

            <motion.div
              key={active.file}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-4xl max-h-[85vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={active.src}
                alt={active.publication ? `Media coverage in ${active.publication}` : "Media coverage clipping"}
                className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl"
              />
              <div className="flex items-center gap-3 mt-4 text-white/70 text-xs font-medium uppercase tracking-[0.2em]">
                {active.publication && (
                  <span className="flex items-center gap-1.5 text-[#F2B33D]">
                    <Newspaper size={12} />
                    {active.publication}
                  </span>
                )}
                <span>{(activeIndex ?? 0) + 1} / {mediaCoverage.length}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
