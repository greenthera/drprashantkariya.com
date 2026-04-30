import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Award } from "lucide-react";
import drImage from "../assets/dr-image.png"

export default function Hero() {
  const { scrollY } = useScroll();
  const arcY = useTransform(scrollY, [0, 800], [0, -140]);
  const arc2Y = useTransform(scrollY, [0, 800], [0, 90]);
  const imageY = useTransform(scrollY, [0, 800], [0, 45]);

  return (
    <section
      id="hero"
      className="relative pt-24 pb-16 md:pt-36 md:pb-32 px-6 md:px-10 bg-[#FAF9F6] overflow-hidden min-h-screen flex items-center"
    >
      {/* Parallax emerald arcs */}
      <motion.div
        style={{ y: arcY }}
        className="absolute -top-48 -right-48 w-[700px] h-[700px] rounded-full bg-[#E8F4EE] pointer-events-none"
      />
      <motion.div
        style={{ y: arc2Y }}
        className="absolute -bottom-40 -left-40 w-[480px] h-[480px] rounded-full bg-[#E8F4EE]/70 pointer-events-none"
      />
      {/* Gold accent ring */}
      <motion.div
        style={{ y: useTransform(scrollY, [0, 800], [0, -60]) }}
        className="absolute top-[15%] right-[8%] w-24 h-24 rounded-full border-2 border-[#C4973A]/20 pointer-events-none hidden lg:block"
      />
      <motion.div
        style={{ y: useTransform(scrollY, [0, 800], [0, 40]) }}
        className="absolute bottom-[20%] left-[5%] w-16 h-16 rounded-full border border-[#0A4B38]/15 pointer-events-none hidden lg:block"
      />

      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 relative z-10 w-full">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: "easeOut" }}
          className="order-2 lg:order-1 lg:col-span-6 flex flex-col justify-center"
        >
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex items-center gap-2.5 mb-7 bg-[#E8F4EE] border border-[#C5DDD3] w-fit px-4 py-2.5 rounded-full"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#C4973A] shrink-0" />
            <span className="text-[#0A4B38] font-medium uppercase tracking-[0.22em] text-[10px]">
              Surat's Premier Pediatrician
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.9, ease: "easeOut" }}
            className="font-display font-bold text-[#063322] leading-[0.82] tracking-tight mb-7"
            style={{ fontSize: "clamp(3.8rem, 8vw, 7rem)" }}
          >
            Nurturing <br />
            <span className="italic text-[#0A4B38]">Futures.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="text-[#4A5E54] text-base md:text-[17px] mb-9 leading-relaxed max-w-md font-light"
          >
            Advanced Level III NICU precision meets the warmth of a doctor who
            treats every child like their own.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row sm:items-center gap-4"
          >
            <Link
              to="/contact"
              className="w-full sm:w-auto bg-[#0A4B38] text-[#F5E6C8] px-8 py-3.5 rounded-xl font-semibold text-[14px] hover:bg-[#063322] hover:shadow-xl hover:shadow-[#063322]/25 hover:-translate-y-0.5 transition-all duration-250 flex items-center justify-center gap-2.5 tracking-wide"
            >
              Book Appointment <ArrowRight size={15} />
            </Link>

            <div className="flex items-center gap-3">
              <div className="flex -space-x-2.5">
                {["bg-[#C5DDD3]", "bg-[#D4E8E0]", "bg-[#C8DCCA]"].map(
                  (c, i) => (
                    <div
                      key={i}
                      className={`w-8 h-8 rounded-full border-2 border-[#FAF9F6] ${c}`}
                    />
                  )
                )}
              </div>
              <p className="text-[12px] font-medium text-[#4A5E54] leading-tight">
                Trusted by{" "}
                <span className="font-semibold text-[#063322]">5,000+</span>{" "}
                parents
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.95, delay: 0.12, ease: "easeOut" }}
          className="order-1 lg:order-2 lg:col-span-6 relative"
        >
          <motion.div style={{ y: imageY }} className="relative">
            {/* Gold tinted frame behind image */}
            <div className="absolute inset-4 bg-[#C4973A]/8 rounded-3xl transform rotate-[2deg] scale-[1.02]" />
            <div className="absolute inset-4 bg-[#E8F4EE] rounded-3xl transform -rotate-[1.5deg] scale-[1.01]" />

            <div className="relative rounded-3xl overflow-hidden shadow-[0_32px_80px_rgba(6,51,34,0.18)] min-h-[400px] sm:min-h-[500px] lg:h-[620px]">
              <img
                src={drImage}
                className="w-full h-full object-cover hover:scale-[1.04] transition-transform duration-800"
                alt="Doctor caring for a child"
              />
              {/* Subtle gradient overlay for stat card readability */}
              <div className="absolute inset-0 bg-linear-to-t from-[#063322]/35 via-transparent to-transparent" />

              {/* Stat overlay */}
              <div className="absolute bottom-5 left-5 right-5 bg-white/96 backdrop-blur-sm p-4 rounded-2xl shadow-md flex items-center justify-between">
                <div>
                  <p className="font-display text-3xl font-bold italic text-[#0A4B38] leading-none">
                    15+
                  </p>
                  <p className="text-[9px] font-medium uppercase tracking-widest text-[#6B7B6A] mt-0.5">
                    Years Exp.
                  </p>
                </div>
                <div className="w-px h-9 bg-[#E0E8E2]" />
                <div className="text-right">
                  <p className="font-display text-base font-semibold text-[#063322] leading-none">
                    PARAM
                  </p>
                  <p className="text-[9px] font-medium uppercase tracking-widest text-[#6B7B6A] mt-0.5">
                    Hospital
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Level III badge */}
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
              className="absolute -top-4 -left-4 bg-white border border-[#C5DDD3] px-4 py-3 rounded-2xl shadow-lg shadow-[#063322]/10 z-10"
            >
              <div className="flex items-center gap-2.5">
                <Award size={15} className="text-[#C4973A]" />
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-wider text-[#0A4B38]">
                    Level III
                  </p>
                  <p className="text-[9px] font-medium text-[#6B7B6A]">
                    NICU Certified
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
