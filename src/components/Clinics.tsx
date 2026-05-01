import { motion } from "framer-motion";
import { MapPin, Phone } from "lucide-react";

export default function Clinics() {
  return (
    <section id="clinics" className="py-20 md:py-24 px-6 md:px-10 bg-white">
      <div className="max-w-[1400px] mx-auto">

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#C4973A] font-medium uppercase tracking-[0.25em] text-[10px] block mb-3">
              Find Us
            </span>
            <h2 className="font-display font-bold text-[#063322] tracking-tight"
              style={{ fontSize: "clamp(2.6rem, 5vw, 4.2rem)" }}>
              Our <span className="italic">Centers.</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#4A5E54] text-sm max-w-[210px] leading-relaxed font-light"
          >
            Providing critical care across two prime locations in Surat.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* Card 1 — dark emerald */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="bg-[#0A4B38] text-white rounded-2xl p-8 md:p-12 flex flex-col justify-between min-h-[380px] relative overflow-hidden group"
          >
            <div className="absolute -top-10 -right-10 w-44 h-44 bg-[#C4973A]/8 rounded-full group-hover:scale-125 transition-transform duration-600 pointer-events-none" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/4 rounded-full pointer-events-none" />

            <div className="relative z-10">
              <span className="inline-block bg-[#C4973A]/15 text-[#C4973A] border border-[#C4973A]/25 px-3.5 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-wider mb-7">
                Level III NICU Specialist
              </span>
              <h3 className="font-display text-2xl md:text-3xl font-bold italic text-white mb-6 leading-tight">
                Param NICU & Children Hospital
              </h3>
              <div className="flex items-start gap-3 mb-4">
                <MapPin size={15} className="text-[#C4973A] shrink-0 mt-0.5" />
                <p className="text-white/65 text-sm leading-relaxed font-light">
                  801-803, Param Doctor House, Lal Darwaja, Surat
                </p>
              </div>
            </div>

            <div className="relative z-10 flex items-center gap-3 pt-6 border-t border-white/10">
              <div className="w-9 h-9 bg-white/8 rounded-lg flex items-center justify-center">
                <Phone size={15} className="text-[#C4973A]" />
              </div>
              <a href="tel:02612492411" className="font-display text-xl font-semibold text-white">
                (0261) 2492411
              </a>
            </div>
          </motion.div>

          {/* Card 2 — warm cream */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="bg-[#FAF9F6] rounded-2xl p-8 md:p-12 flex flex-col justify-between min-h-[380px] border border-[#E0E8E2] hover:border-[#C5DDD3] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 w-44 h-44 bg-[#0A4B38]/4 rounded-full group-hover:scale-125 transition-transform duration-600 pointer-events-none" />

            <div className="relative z-10">
              <span className="inline-block bg-[#E8F4EE] text-[#0A4B38] border border-[#C5DDD3] px-3.5 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-wider mb-7">
                General Pediatrics
              </span>
              <h3 className="font-display text-2xl md:text-3xl font-bold italic text-[#063322] mb-6 leading-tight">
                Param Children Hospital
              </h3>
              <div className="flex items-start gap-3 mb-4">
                <MapPin size={15} className="text-[#0A4B38] shrink-0 mt-0.5" />
                <p className="text-[#4A5E54] text-sm leading-relaxed font-light">
                  305-306, Seven Square, Majura Gate, Surat
                </p>
              </div>
            </div>

            <div className="relative z-10 flex items-center gap-3 pt-6 border-t border-[#E0E8E2]">
              <div className="w-9 h-9 bg-[#E8F4EE] rounded-lg flex items-center justify-center">
                <Phone size={15} className="text-[#0A4B38]" />
              </div>
              <a href="tel:+919727008881" className="font-display text-xl font-semibold text-[#063322]">
                +91 97270 08881
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
