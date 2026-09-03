import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Newspaper, ZoomIn } from "lucide-react";
import { mediaCoverage } from "../lib/mediaCoverage";
import { useImagesPreloaded } from "../hooks/useImagesPreloaded";
import MediaCoverageLightbox from "./MediaCoverageLightbox";

export default function MediaCoverageGrid() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const srcs = useMemo(() => mediaCoverage.map((item) => item.src), []);
  const { ready, loadedCount, total } = useImagesPreloaded(srcs);

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
        {ready ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="columns-2 sm:columns-3 lg:columns-4 gap-5 md:gap-7"
          >
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
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-5 py-32">
            <span className="w-10 h-10 rounded-full border-2 border-[#E0E8E2] border-t-[#4353CF] animate-spin" />
            <p className="font-display italic text-[#2E3A9E] text-sm">
              Loading press clippings…
            </p>
            <div className="w-56 h-1.5 rounded-full bg-[#E0E8E2] overflow-hidden">
              <div
                className="h-full bg-[#F2B33D] transition-all duration-200"
                style={{ width: `${total === 0 ? 0 : (loadedCount / total) * 100}%` }}
              />
            </div>
            <p className="text-[#6670A0] text-[11px] font-medium uppercase tracking-[0.15em]">
              {loadedCount} / {total}
            </p>
          </div>
        )}
      </div>

      <MediaCoverageLightbox
        items={mediaCoverage}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={setActiveIndex}
      />
    </div>
  );
}
