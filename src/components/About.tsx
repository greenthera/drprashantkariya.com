import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import drImageAbout from "../assets/dr-image.jpg"
import drImageAboutOne from "../assets/dr-image-1.jpg"

const credentials = [
  "MBBS – B.J. Medical",
  "MD Pediatrics",
  "Param NICU Founder",
  "15+ Years Exp",
];

export default function About() {
  return (
    <section id="about" className="py-20 md:py-24 px-6 md:px-10 bg-white">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* LEFT: Images */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75 }}
          className="grid grid-cols-2 gap-4 order-2 lg:order-1"
        >
          <div className="rounded-2xl overflow-hidden h-52 md:h-64 group shadow-sm">
            <img
              src={drImageAbout}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              alt="Medical Professional"
            />
          </div>
          <div className="rounded-2xl overflow-hidden h-52 md:h-64 group shadow-sm">
            <img
              src={drImageAboutOne}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              alt="Neonatal Care"
            />
          </div>

          {/* Emerald stat card */}
          <div className="col-span-2 bg-[#0A4B38] text-white p-8 md:p-10 rounded-2xl relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#C4973A]/10 rounded-full group-hover:scale-125 transition-transform duration-600 pointer-events-none" />
            <div className="absolute -bottom-8 -left-8 w-28 h-28 bg-white/4 rounded-full pointer-events-none" />
            <div className="relative z-10">
              <p className="font-display text-6xl md:text-7xl font-bold italic text-[#C4973A] leading-none">
                15+
              </p>
              <p className="uppercase text-[10px] md:text-[11px] tracking-[0.3em] font-medium text-white/60 mt-3">
                Years of Clinical Mastery
              </p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT: Content */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75 }}
          className="order-1 lg:order-2"
        >
          <div className="inline-flex items-center gap-2 bg-[#E8F4EE] border border-[#C5DDD3] px-4 py-2.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C4973A]" />
            <span className="text-[#0A4B38] font-medium uppercase tracking-[0.22em] text-[10px]">
              Excellence in Care
            </span>
          </div>

          <h2 className="font-display font-bold text-[#063322] tracking-tight leading-[0.88] mb-6"
            style={{ fontSize: "clamp(2.8rem, 5vw, 4.5rem)" }}>
            Pediatrician &amp; <br />
            <span className="italic">Adolescent Health Expert.</span>
          </h2>

          <p className="text-[#4A5E54] text-base md:text-[17px] leading-relaxed mb-8 max-w-xl font-light">
            <b className="font-semibold text-[#063322]">Dr. Prashant Kariya</b> is a pediatrician and adolescent health expert
            with 15+ years of experience in child development, neonatal
            intensive care, and teenage health and wellness.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {credentials.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.09, duration: 0.5 }}
                className="flex items-center gap-3 p-4 bg-[#FAF9F6] rounded-xl border border-[#E0E8E2] hover:border-[#C5DDD3] hover:bg-[#E8F4EE]/40 hover:-translate-y-0.5 transition-all duration-200 group"
              >
                <CheckCircle2 size={17} className="text-[#0A4B38] shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-[12px] font-semibold text-[#063322] uppercase tracking-tight">
                  {item}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
