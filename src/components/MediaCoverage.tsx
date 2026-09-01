import { useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { ArrowRight, Newspaper } from "lucide-react";
import { mediaCoverage } from "../lib/mediaCoverage";
import { useImagesPreloaded } from "../hooks/useImagesPreloaded";

// Same portrait aspect ratio across the teaser so it reads as one clean row —
// the full editorial masonry lives on the dedicated page.
const preview = mediaCoverage.slice(0, 6);

export default function MediaCoverage() {
  const srcs = useMemo(() => preview.map((item) => item.src), []);
  const { ready } = useImagesPreloaded(srcs);

  return (
    <section className="relative py-20 md:py-24 px-6 md:px-10 bg-[#FAF9F6] overflow-hidden">
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#EAEDFB] pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-[#F2B33D]/8 pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-4"
        >
          <div>
            <span className="text-[#F2B33D] font-medium uppercase tracking-[0.25em] text-[10px] block mb-3">
              In The Press
            </span>
            <h2
              className="font-display font-bold text-[#2E3A9E] tracking-tight"
              style={{ fontSize: "clamp(2.6rem, 5vw, 4.2rem)" }}
            >
              Media <span className="italic">Coverage.</span>
            </h2>
          </div>
          <p className="text-[#4F5A8A] text-sm md:max-w-70 leading-relaxed font-light">
            Newspaper features and interviews on child health, parenting, and
            adolescent care over the years.
          </p>
        </motion.div>

        {ready ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 md:gap-6"
          >
            {preview.map((item) => (
              <div
                key={item.file}
                className="bg-white rounded-lg border border-[#E0E8E2] overflow-hidden group shadow-[0_8px_24px_rgba(46,58,158,0.07)] hover:shadow-[0_16px_36px_rgba(46,58,158,0.16)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="h-0.75 bg-linear-to-r from-[#F2B33D] via-[#F2B33D]/70 to-transparent" />
                <div className="relative aspect-3/4 overflow-hidden bg-[#FAF9F6]">
                  <img
                    src={item.src}
                    alt={item.publication ? `Media coverage in ${item.publication}` : "Media coverage clipping"}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center gap-1.5 px-3 py-2.5">
                  <Newspaper size={11} className="text-[#F2B33D] shrink-0" />
                  <span className="font-display italic text-[#2E3A9E] text-[11px] truncate">
                    {item.publication ?? "Newspaper Feature"}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 md:gap-6">
            {preview.map((item) => (
              <div
                key={item.file}
                className="aspect-3/4 rounded-lg border border-[#E0E8E2] bg-white flex items-center justify-center"
              >
                <span className="w-6 h-6 rounded-full border-2 border-[#E0E8E2] border-t-[#4353CF] animate-spin" />
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-center mt-12 md:mt-14">
          <Link
            to="/media-coverage"
            className="inline-flex items-center gap-2 bg-[#4353CF] text-[#F5E6C8] px-6 py-3 rounded-xl text-xs font-semibold uppercase tracking-[0.15em] hover:bg-[#2E3A9E] hover:shadow-lg hover:shadow-[#2E3A9E]/20 hover:-translate-y-px transition-all duration-250"
          >
            View More <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
