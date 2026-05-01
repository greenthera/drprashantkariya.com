import { motion } from "framer-motion";
import { CalendarCheck, ArrowRight, Clock } from "lucide-react";

const DOCON_URL = "https://docon.co.in/webapp/info-card/prashantkariya?isWebView=false&isIOS=false";

export default function BookAppointment() {
  return (
    <section className="py-20 md:py-24 px-6 md:px-10 bg-[#FAF9F6] relative overflow-hidden">

      {/* Decorative bg elements */}
      <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[#E8F4EE] pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-[#E8F4EE]/60 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="bg-white rounded-2xl border border-[#E0E8E2] shadow-[0_8px_50px_rgba(6,51,34,0.06)] px-8 md:px-14 py-10 md:py-14 flex flex-col lg:flex-row items-center justify-between gap-10"
        >
          {/* Left */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2.5 mb-5">
              <div className="w-8 h-8 bg-[#E8F4EE] border border-[#C5DDD3] rounded-lg flex items-center justify-center">
                <CalendarCheck size={14} className="text-[#0A4B38]" />
              </div>
              <span className="text-[#0A4B38] font-medium uppercase tracking-[0.25em] text-[10px]">
                Online Appointment
              </span>
            </div>
            <h2
              className="font-display font-bold text-[#063322] tracking-tight leading-[0.9] mb-4"
              style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)" }}
            >
              Book Your Visit <br />
              <span className="italic text-[#0A4B38]">Instantly.</span>
            </h2>
            <p className="text-[#4A5E54] text-sm leading-relaxed max-w-md font-light mx-auto lg:mx-0">
              Schedule a consultation with Dr. Prashant Kariya online — quick, easy,
              and confirmed in seconds via Docon.
            </p>
          </div>

          {/* Right */}
          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <div className="flex items-center gap-2 text-[#6B7B6A] text-xs font-medium bg-[#FAF9F6] px-4 py-2.5 rounded-full border border-[#E0E8E2]">
              <Clock size={13} className="text-[#0A4B38]" />
              <span>Mon – Sat &nbsp;|&nbsp; 10am – 8pm</span>
            </div>
            <a
              href={DOCON_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 bg-[#0A4B38] text-[#F5E6C8] px-8 py-4 rounded-xl font-semibold text-sm hover:bg-[#063322] hover:shadow-xl hover:shadow-[#063322]/20 hover:-translate-y-0.5 transition-all duration-250 tracking-wide whitespace-nowrap"
            >
              Book via Docon <ArrowRight size={15} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
