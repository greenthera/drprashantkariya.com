import { motion } from "framer-motion";
import { Scissors, Activity, Droplet, Microscope, Shield, Heart } from "lucide-react";

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
          <p className="text-[#4A5E54] text-sm max-w-60 leading-relaxed font-light">
            Advanced care across six critical paediatric disciplines.
          </p>
        </motion.div>

        {/*
          Bento grid (lg):
          [Surgery tall]  [PICU wide............]
          [Surgery tall]  [Haematology] [Endocrin]
          [Well Baby wide............] [PhysTherapy]
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-3 gap-5">

          {/* 1. Paediatric & Neonatal Surgery — tall dark featured */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="lg:row-span-2 bg-[#0A4B38] text-white rounded-2xl p-8 md:p-10 flex flex-col justify-between min-h-72 relative overflow-hidden group"
          >
            <div className="absolute -top-6 -right-6 w-40 h-40 rounded-full border border-[#C4973A]/10 pointer-events-none" />
            <div className="absolute -top-3 -right-3 w-24 h-24 rounded-full border border-[#C4973A]/8 pointer-events-none" />
            <div className="absolute bottom-0 right-0 font-display text-[9rem] leading-none font-bold text-white/4 select-none pointer-events-none translate-x-2 translate-y-4">
              01
            </div>

            <div className="relative z-10">
              <div className="w-12 h-12 bg-[#C4973A]/15 rounded-xl flex items-center justify-center mb-7 group-hover:bg-[#C4973A]/25 transition-colors duration-300">
                <Scissors size={22} className="text-[#C4973A]" />
              </div>
              <h3 className="font-display font-bold italic text-white leading-tight mb-4"
                style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}>
                Paediatric &amp; Neonatal Surgery
              </h3>
              <p className="text-white/65 text-sm leading-relaxed font-light">
                Surgical care for newborns and children, covering congenital and acquired conditions with precision.
              </p>
            </div>

            <div className="relative z-10 mt-8 pt-6 border-t border-white/10 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C4973A]" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C4973A]">
                Primary Expertise
              </span>
            </div>
          </motion.div>

          {/* 2. PICU — wide horizontal card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="md:col-span-1 lg:col-span-2 bg-white rounded-2xl p-7 md:p-8 border border-[#E0E8E2] hover:border-[#C5DDD3] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden flex flex-col sm:flex-row items-start gap-6"
          >
            <div className="absolute bottom-0 right-4 font-display text-[7rem] leading-none font-bold text-[#063322]/4 select-none pointer-events-none translate-y-2">
              02
            </div>
            <div className="w-12 h-12 bg-[#E8F4EE] rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 mt-1">
              <Activity size={22} className="text-[#0A4B38]" />
            </div>
            <div className="relative z-10">
              <h3 className="font-display text-2xl md:text-3xl font-bold italic text-[#063322] mb-2 leading-tight">
                Paediatric Intensive Care Unit
              </h3>
              <p className="text-[#4A5E54] text-sm leading-relaxed font-light max-w-md">
                Round-the-clock critical monitoring and life-support intervention for acutely ill children requiring complex medical management.
              </p>
            </div>
          </motion.div>

          {/* 3. Haematology & Oncology */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="bg-white rounded-2xl p-7 border border-[#E0E8E2] hover:border-[#C5DDD3] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
          >
            <div className="absolute top-0 right-2 font-display text-[7rem] leading-none font-bold text-[#063322]/4 select-none pointer-events-none -translate-y-2">
              03
            </div>
            <div className="w-11 h-11 bg-[#E8F4EE] rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
              <Droplet size={20} className="text-[#0A4B38]" />
            </div>
            <h3 className="font-display text-xl md:text-2xl font-bold italic text-[#063322] mb-2 leading-tight">
              Haematology &amp; Oncology
            </h3>
            <p className="text-[#4A5E54] text-sm leading-relaxed font-light">
              Diagnosis and treatment of blood disorders and childhood cancers.
            </p>
          </motion.div>

          {/* 4. Paediatric Endocrinology */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="bg-white rounded-2xl p-7 border border-[#E0E8E2] hover:border-[#C5DDD3] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
          >
            <div className="absolute top-0 right-2 font-display text-[7rem] leading-none font-bold text-[#063322]/4 select-none pointer-events-none -translate-y-2">
              04
            </div>
            <div className="w-11 h-11 bg-[#E8F4EE] rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
              <Microscope size={20} className="text-[#0A4B38]" />
            </div>
            <h3 className="font-display text-xl md:text-2xl font-bold italic text-[#063322] mb-2 leading-tight">
              Paediatric Endocrinology
            </h3>
            <p className="text-[#4A5E54] text-sm leading-relaxed font-light">
              Management of hormonal and metabolic conditions including diabetes and thyroid disorders.
            </p>
          </motion.div>

          {/* 5. Well Baby Clinic — wide with emerald tint */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.25 }}
            className="md:col-span-2 lg:col-span-2 bg-white lg:bg-[#E8F4EE] rounded-2xl p-7 md:p-8 border border-[#C5DDD3] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden flex flex-col sm:flex-row items-start gap-6"
          >
            <div className="absolute bottom-0 right-4 font-display text-[7rem] leading-none font-bold text-[#0A4B38]/8 select-none pointer-events-none translate-y-2">
              05
            </div>
            <div className="w-12 h-12 bg-[#E8F4EE] lg:bg-[#0A4B38] rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 mt-1 shadow-md shadow-[#063322]/15">
              <Shield size={22} className="text-[#0A4B38] lg:text-[#C4973A]" />
            </div>
            <div className="relative z-10">
              <h3 className="font-display text-2xl md:text-3xl font-bold italic text-[#063322] mb-2 leading-tight">
                Well Baby Clinic &amp; Immunization
              </h3>
              <p className="text-[#4A5E54] text-sm leading-relaxed font-light max-w-md">
                Preventive care, growth monitoring, and painless vaccination programmes following international immunization standards.
              </p>
            </div>
          </motion.div>

          {/* 6. Paediatric Physical Therapy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.3 }}
            className="bg-white rounded-2xl p-7 border border-[#E0E8E2] hover:border-[#C5DDD3] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
          >
            <div className="absolute top-0 right-2 font-display text-[7rem] leading-none font-bold text-[#063322]/4 select-none pointer-events-none -translate-y-2">
              06
            </div>
            <div className="w-11 h-11 bg-[#E8F4EE] rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
              <Heart size={20} className="text-[#0A4B38]" />
            </div>
            <h3 className="font-display text-xl md:text-2xl font-bold italic text-[#063322] mb-2 leading-tight">
              Paediatric Physical Therapy
            </h3>
            <p className="text-[#4A5E54] text-sm leading-relaxed font-light">
              Rehabilitation and developmental support for children with physical challenges.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
