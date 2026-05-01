import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import DoctorAnimation from "./DoctorAnimation";
import review1 from "../assets/review-1.png";
import review2 from "../assets/review-2.png";
import review3 from "../assets/review-3.png";

export default function Hero() {
  const { scrollY } = useScroll();
  const blobY = useTransform(scrollY, [0, 800], [0, -80]);

  return (
    <section id="hero" className="relative bg-[#FAF9F6] overflow-hidden">

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-35"
        style={{
          backgroundImage: "radial-gradient(circle, #B5CEC6 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Blobs */}
      <motion.div style={{ y: blobY }} className="absolute -top-40 -left-40 w-120 h-120 rounded-full bg-[#E8F4EE] pointer-events-none" />
      <motion.div style={{ y: useTransform(scrollY, [0, 800], [0, 50]) }} className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-[#E8F4EE]/50 pointer-events-none" />

      {/* PK monogram */}
      <div
        className="absolute bottom-10 left-6 font-display font-bold italic text-[#063322]/4 select-none pointer-events-none leading-none hidden lg:block"
        style={{ fontSize: "14rem" }}
      >
        PK
      </div>

      {/* Main grid */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center pt-28 pb-16 md:pt-30 md:pb-20 lg:pt-30 lg:pb-24">

        {/* ── LEFT ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="order-2 lg:order-1 flex flex-col"
        >
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="flex items-center gap-2.5 mb-6 bg-[#E8F4EE] border border-[#C5DDD3] w-fit px-4 py-2.5 rounded-full"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#C4973A] shrink-0 animate-pulse" />
            <span className="text-[#0A4B38] font-medium uppercase tracking-[0.22em] text-[10px]">
              Pediatrician & Adolescent Health Expert
            </span>
          </motion.div>

          {/* Gold rule */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.22, duration: 0.5, ease: "easeOut" }}
            className="origin-left w-14 h-px bg-[#C4973A]/60 mb-6"
          />

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.9, ease: "easeOut" }}
            className="font-display font-bold text-[#063322] leading-[0.82] tracking-tight mb-7"
            style={{ fontSize: "clamp(3.6rem, 6vw, 6.5rem)" }}
          >
            Nurturing <br />
            <span className="italic text-[#0A4B38]">Futures.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.7 }}
            className="text-[#4A5E54] text-base md:text-[17px] mb-10 leading-relaxed max-w-sm font-light"
          >
            Advanced Level III NICU precision meets the warmth of a doctor who
            treats every child like their own.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.48, duration: 0.6 }}
            className="flex flex-col sm:flex-row sm:items-center gap-4 mb-10"
          >
            <Link
              to="/contact"
              className="w-full sm:w-auto bg-[#0A4B38] text-[#F5E6C8] px-8 py-3.5 rounded-xl font-semibold text-sm hover:bg-[#063322] hover:shadow-xl hover:shadow-[#063322]/25 hover:-translate-y-0.5 transition-all duration-250 flex items-center justify-center gap-2.5 tracking-wide"
            >
              Book Appointment <ArrowRight size={15} />
            </Link>
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2.5">
                {[review1, review2, review3].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt=""
                    className="w-12 h-12 rounded-full border-2 border-[#FAF9F6] object-cover"
                  />
                ))}
              </div>
              <p className="text-[12px] font-medium text-[#4A5E54] leading-tight">
                Trusted by <span className="font-semibold text-[#063322]">5,000+</span> parents
              </p>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65, duration: 0.6 }}
            className="flex items-center gap-8 pt-8 border-t border-[#E0E8E2]"
          >
            {[
              { val: "15+", label: "Years" },
              { val: "5K+", label: "Families" },
              { val: "4.8★", label: "Rating" },
            ].map((s, i) => (
              <div key={i}>
                <p className="font-display text-2xl font-bold italic text-[#0A4B38] leading-none">{s.val}</p>
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#6B7B6A] mt-1">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── RIGHT: Image ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.95, delay: 0.1, ease: "easeOut" }}
          className="order-1 lg:order-2 relative"
        >
          {/* Animation */}
          <div className="h-80 sm:h-96 md:h-125 lg:h-140">
            <DoctorAnimation />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
