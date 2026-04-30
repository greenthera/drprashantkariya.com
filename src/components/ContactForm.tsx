import { motion } from "framer-motion";
import { Phone, MapPin, Send, MessageCircle } from "lucide-react";

export default function ContactForm() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-24 md:pt-32 pb-20 px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* LEFT: Info */}
        <motion.div
          initial={{ opacity: 0, x: -28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="order-2 lg:order-1"
        >
          <div className="flex items-center gap-2.5 mb-6 bg-[#E8F4EE] border border-[#C5DDD3] w-fit px-4 py-2.5 rounded-full">
            <MessageCircle size={13} className="text-[#0A4B38]" />
            <span className="text-[#0A4B38] font-medium uppercase tracking-[0.22em] text-[10px]">
              Get in Touch
            </span>
          </div>

          <h1
            className="font-display font-bold italic text-[#063322] leading-[0.88] tracking-tight mb-10"
            style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)" }}
          >
            Let's <br />
            <span className="not-italic text-[#0A4B38]">Connect.</span>
          </h1>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 md:p-6 bg-white rounded-xl border border-[#E0E8E2] hover:border-[#C5DDD3] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-250 group">
              <div className="w-12 h-12 bg-[#0A4B38] rounded-xl flex items-center justify-center text-[#C4973A] shadow-md shadow-[#063322]/15 shrink-0 group-hover:scale-110 transition-transform duration-250">
                <Phone size={19} />
              </div>
              <div>
                <p className="text-[#6B7B6A] font-medium uppercase text-[10px] tracking-[0.2em] mb-1">
                  Emergency Line
                </p>
                <p className="font-display text-xl font-semibold text-[#063322]">
                  (0261) 2492411
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 md:p-6 bg-white rounded-xl border border-[#E0E8E2] hover:border-[#C5DDD3] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-250 group">
              <div className="w-12 h-12 bg-[#E8F4EE] rounded-xl flex items-center justify-center text-[#0A4B38] shrink-0 group-hover:scale-110 transition-transform duration-250">
                <MapPin size={19} />
              </div>
              <div>
                <p className="text-[#6B7B6A] font-medium uppercase text-[10px] tracking-[0.2em] mb-1">
                  Our Hub
                </p>
                <p className="font-display text-base font-semibold text-[#063322]">
                  Lal Darwaja & Majura Gate, Surat
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT: Form */}
        <motion.form
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.75 }}
          className="order-1 lg:order-2 bg-white p-8 md:p-10 rounded-2xl border border-[#E0E8E2] shadow-[0_8px_50px_rgba(6,51,34,0.07)] space-y-5"
        >
          <div>
            <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6B7B6A] ml-1 mb-2 block">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full bg-[#FAF9F6] border border-[#E0E8E2] p-4 rounded-xl text-[#063322] outline-none focus:border-[#0A4B38] focus:bg-white transition-all font-medium text-sm placeholder:text-[#B0BDB8]"
            />
          </div>

          <div>
            <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6B7B6A] ml-1 mb-2 block">
              Email Address
            </label>
            <input
              type="email"
              placeholder="john@example.com"
              className="w-full bg-[#FAF9F6] border border-[#E0E8E2] p-4 rounded-xl text-[#063322] outline-none focus:border-[#0A4B38] focus:bg-white transition-all font-medium text-sm placeholder:text-[#B0BDB8]"
            />
          </div>

          <div>
            <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6B7B6A] ml-1 mb-2 block">
              Message
            </label>
            <textarea
              rows={4}
              placeholder="How can we help?"
              className="w-full bg-[#FAF9F6] border border-[#E0E8E2] p-4 rounded-xl text-[#063322] outline-none focus:border-[#0A4B38] focus:bg-white transition-all font-medium text-sm placeholder:text-[#B0BDB8]"
            />
          </div>

          <button className="w-full bg-[#0A4B38] text-[#F5E6C8] p-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2.5 hover:bg-[#063322] hover:shadow-lg hover:shadow-[#063322]/20 hover:-translate-y-px transition-all duration-250 tracking-wide">
            Send Message <Send size={15} />
          </button>
        </motion.form>
      </div>
    </div>
  );
}
