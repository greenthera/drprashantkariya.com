import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Newspaper } from "lucide-react";
import type { MediaCoverageItem } from "../lib/mediaCoverage";

type MediaCoverageLightboxProps = {
  items: MediaCoverageItem[];
  activeIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

// Shared full-screen viewer for a press clipping — used by both the home
// page teaser (a 6-item preview) and the full Media Coverage gallery (all
// clippings), so clicking an image behaves identically everywhere.
export default function MediaCoverageLightbox({ items, activeIndex, onClose, onNavigate }: MediaCoverageLightboxProps) {
  const active = activeIndex !== null ? items[activeIndex] : null;

  useEffect(() => {
    if (activeIndex === null) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate((activeIndex! + 1) % items.length);
      if (e.key === "ArrowLeft") onNavigate((activeIndex! - 1 + items.length) % items.length);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, items.length]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[200] bg-[#171b3d]/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
          onClick={onClose}
        >
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#171b3d]/80 backdrop-blur-md border border-white/15 shadow-lg flex items-center justify-center text-white hover:bg-[#171b3d] transition-colors z-10"
          >
            <X size={18} />
          </button>

          {/* Solid dark glass background (not translucent white) so the arrow
              stays visible against light clippings — most are white-background
              newspaper scans that fill nearly the full width on mobile. */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((activeIndex! - 1 + items.length) % items.length);
            }}
            aria-label="Previous"
            className="absolute left-1.5 sm:left-6 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-[#171b3d]/80 backdrop-blur-md border border-white/15 shadow-lg flex items-center justify-center text-white hover:bg-[#171b3d] transition-colors z-10"
          >
            <ChevronLeft className="w-4.5 h-4.5 sm:w-5.5 sm:h-5.5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((activeIndex! + 1) % items.length);
            }}
            aria-label="Next"
            className="absolute right-1.5 sm:right-6 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-[#171b3d]/80 backdrop-blur-md border border-white/15 shadow-lg flex items-center justify-center text-white hover:bg-[#171b3d] transition-colors z-10"
          >
            <ChevronRight className="w-4.5 h-4.5 sm:w-5.5 sm:h-5.5" />
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
              <span>{(activeIndex ?? 0) + 1} / {items.length}</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
