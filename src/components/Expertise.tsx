import { motion } from "framer-motion";
import { Baby, Activity, Heart, Shield } from "lucide-react";

export default function Expertise() {
  return (
    <section id="expertise" className="py-20 md:py-24 px-6 md:px-10 bg-[#FAF9F6]">
      <div className="max-w-[1400px] mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-4"
        >
          <div>
            <span className="text-[#C4973A] font-medium uppercase tracking-[0.25em] text-[10px] block mb-3">
              Our Specializations
            </span>
            <h2 className="font-display font-bold text-[#063322] tracking-tight"
              style={{ fontSize: "clamp(2.6rem, 5vw, 4.2rem)" }}>
              Specialized <span className="italic">Services</span>
            </h2>
          </div>
          <p className="text-[#4A5E54] text-sm max-w-[240px] leading-relaxed font-light">
            Advanced care across four critical medical disciplines.
          </p>
        </motion.div>

        {/* Asymmetric bento — NICU featured large, 3 smaller cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

          {/* NICU — dark emerald feature card, spans 2 rows on lg */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="lg:row-span-2 bg-[#0A4B38] text-white rounded-2xl p-8 md:p-10 flex flex-col justify-between min-h-[380px] lg:min-h-0 relative overflow-hidden group cursor-default"
          >
            {/* Watermark number */}
            <div className="absolute top-0 right-0 font-display text-[11rem] leading-none font-bold text-white/4 select-none pointer-events-none translate-x-4 -translate-y-4">
              01
            </div>

            <div className="relative z-10">
              <div className="w-12 h-12 bg-[#C4973A]/15 rounded-xl flex items-center justify-center mb-7 group-hover:bg-[#C4973A]/25 transition-colors duration-300">
                <Baby size={22} className="text-[#C4973A]" />
              </div>
              <h3 className="font-display text-4xl md:text-5xl font-bold italic text-white mb-4">
                NICU
              </h3>
              <p className="text-white/75 text-base leading-relaxed mb-5 font-light">
                Level III Newborn Intensive Care for premature and high-risk
                infants.
              </p>
              <div className="border-l-2 border-[#C4973A]/35 pl-4">
                <p className="text-white/50 text-sm italic leading-relaxed font-light">
                  Advanced ventilation, total parenteral nutrition, and 24/7
                  monitoring.
                </p>
              </div>
            </div>

            <div className="relative z-10 mt-8 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C4973A]" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C4973A]">
                Primary Expertise
              </span>
            </div>
          </motion.div>

          {/* Pediatrics */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="bg-white rounded-2xl p-7 border border-[#E0E8E2] hover:border-[#C5DDD3] hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 group cursor-default relative overflow-hidden"
          >
            <div className="absolute top-0 right-2 font-display text-[8rem] leading-none font-bold text-[#063322]/4 select-none pointer-events-none">
              02
            </div>
            <div className="w-11 h-11 bg-[#E8F4EE] rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
              <Heart size={20} className="text-[#0A4B38]" />
            </div>
            <h3 className="font-display text-2xl font-bold italic text-[#063322] mb-2">
              Pediatrics
            </h3>
            <p className="text-[#4A5E54] text-sm leading-relaxed mb-4 font-light">
              Complete child development, growth, and general wellness tracking.
            </p>
            <div className="border-l-2 border-[#C5DDD3] pl-3">
              <p className="text-xs text-[#6B7B6A] italic leading-relaxed">
                Routine checkups, nutritional guidance, and physical
                assessments.
              </p>
            </div>
          </motion.div>

          {/* Critical Care */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="bg-white rounded-2xl p-7 border border-[#E0E8E2] hover:border-[#C5DDD3] hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 group cursor-default relative overflow-hidden"
          >
            <div className="absolute top-0 right-2 font-display text-[8rem] leading-none font-bold text-[#063322]/4 select-none pointer-events-none">
              03
            </div>
            <div className="w-11 h-11 bg-[#E8F4EE] rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
              <Activity size={20} className="text-[#0A4B38]" />
            </div>
            <h3 className="font-display text-2xl font-bold italic text-[#063322] mb-2">
              Critical Care
            </h3>
            <p className="text-[#4A5E54] text-sm leading-relaxed mb-4 font-light">
              Emergency pediatric response and complex medical management.
            </p>
            <div className="border-l-2 border-[#C5DDD3] pl-3">
              <p className="text-xs text-[#6B7B6A] italic leading-relaxed">
                High-dependency care units and acute illness intervention.
              </p>
            </div>
          </motion.div>

          {/* Vaccination — spans 2 cols on lg to fill the row */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.3 }}
            className="bg-white rounded-2xl p-7 border border-[#E0E8E2] hover:border-[#C5DDD3] hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 group cursor-default relative overflow-hidden lg:col-span-2"
          >
            <div className="absolute top-0 right-4 font-display text-[8rem] leading-none font-bold text-[#063322]/4 select-none pointer-events-none">
              04
            </div>
            <div className="flex flex-col md:flex-row md:items-start gap-6 relative z-10">
              <div className="w-11 h-11 bg-[#E8F4EE] rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                <Shield size={20} className="text-[#0A4B38]" />
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold italic text-[#063322] mb-2">
                  Vaccination
                </h3>
                <p className="text-[#4A5E54] text-sm leading-relaxed mb-3 font-light max-w-lg">
                  Safe immunization following global painless protocol
                  standards.
                </p>
                <div className="border-l-2 border-[#C5DDD3] pl-3">
                  <p className="text-xs text-[#6B7B6A] italic leading-relaxed">
                    International vaccine tracking and safe injection practices.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
