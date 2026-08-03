import { motion } from "framer-motion";
import { MapPin, Phone } from "lucide-react";

const MAPS_URL_NICU =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("Param NICU & Children Hospital, 801-803, Param Doctor House, Lal Darwaja, Surat - 395003");
const MAPS_URL_CHILDREN =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("Param Children Hospital, 305-306, Seven Square, Majura Gate, Surat - 395002");

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
            <span className="text-[#F2B33D] font-medium uppercase tracking-[0.25em] text-[10px] block mb-3">
              Find Us
            </span>
            <h2 className="font-display font-bold text-[#2E3A9E] tracking-tight"
              style={{ fontSize: "clamp(2.6rem, 5vw, 4.2rem)" }}>
              Our <span className="italic">Centers.</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#4F5A8A] text-sm md:max-w-52.5 leading-relaxed font-light"
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
            className="bg-[#4353CF] text-white rounded-2xl p-8 md:p-12 flex flex-col justify-between min-h-[380px] relative overflow-hidden group"
          >
            <div className="absolute -top-10 -right-10 w-44 h-44 bg-[#F2B33D]/8 rounded-full group-hover:scale-125 transition-transform duration-600 pointer-events-none" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/4 rounded-full pointer-events-none" />

            <a
              href={MAPS_URL_NICU}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Param NICU & Children Hospital in Google Maps"
              className="absolute inset-0"
            />

            <div className="relative z-10 pointer-events-none">
              <span className="inline-block bg-[#F2B33D]/15 text-[#F2B33D] border border-[#F2B33D]/25 px-3.5 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-wider mb-7">
                Level III NICU Specialist
              </span>
              <h3 className="font-display text-2xl md:text-3xl font-bold italic text-white mb-6 leading-tight">
                Param NICU & Children Hospital
              </h3>
              <div className="flex items-start gap-3 mb-4">
                <MapPin size={15} className="text-[#F2B33D] shrink-0 mt-0.5" />
                <p className="text-white/65 text-sm leading-relaxed font-light">
                  801-803, Param Doctor House, Lal Darwaja, Surat
                </p>
              </div>
            </div>

            <div className="relative z-10 flex items-center gap-3 pt-6 border-t border-white/10 pointer-events-none">
              <div className="w-9 h-9 bg-white/8 rounded-lg flex items-center justify-center">
                <Phone size={15} className="text-[#F2B33D]" />
              </div>
              <a href="tel:02612492411" className="font-display text-xl font-semibold text-white pointer-events-auto">
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
            className="bg-[#FAF9F6] rounded-2xl p-8 md:p-12 flex flex-col justify-between min-h-[380px] border border-[#E0E8E2] hover:border-[#D6DBF5] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 w-44 h-44 bg-[#4353CF]/4 rounded-full group-hover:scale-125 transition-transform duration-600 pointer-events-none" />

            <a
              href={MAPS_URL_CHILDREN}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Param Children Hospital in Google Maps"
              className="absolute inset-0"
            />

            <div className="relative z-10 pointer-events-none">
              <span className="inline-block bg-[#EAEDFB] text-[#4353CF] border border-[#D6DBF5] px-3.5 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-wider mb-7">
                General Pediatrics
              </span>
              <h3 className="font-display text-2xl md:text-3xl font-bold italic text-[#2E3A9E] mb-6 leading-tight">
                Param Children Hospital
              </h3>
              <div className="flex items-start gap-3 mb-4">
                <MapPin size={15} className="text-[#4353CF] shrink-0 mt-0.5" />
                <p className="text-[#4F5A8A] text-sm leading-relaxed font-light">
                  305-306, Seven Square, Majura Gate, Surat
                </p>
              </div>
            </div>

            <div className="relative z-10 flex items-center gap-3 pt-6 border-t border-[#E0E8E2] pointer-events-none">
              <div className="w-9 h-9 bg-[#EAEDFB] rounded-lg flex items-center justify-center">
                <Phone size={15} className="text-[#4353CF]" />
              </div>
              <a href="tel:+919727008881" className="font-display text-xl font-semibold text-[#2E3A9E] pointer-events-auto">
                +91 97270 08881
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
