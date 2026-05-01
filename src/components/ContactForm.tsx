import { motion } from "framer-motion";
import { useState } from "react";
import { MapPin, MessageCircle, CalendarCheck } from "lucide-react";

const WHATSAPP_NUMBER = "919727008881";
const DOCON_URL = "https://docon.co.in/webapp/info-card/prashantkariya?isWebView=false&isIOS=false";

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.554 4.124 1.525 5.857L.057 23.625a.5.5 0 0 0 .619.612l5.924-1.552A11.942 11.942 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.9a9.887 9.887 0 0 1-5.04-1.38l-.361-.214-3.741.981.998-3.648-.235-.374A9.862 9.862 0 0 1 2.1 12C2.1 6.533 6.533 2.1 12 2.1S21.9 6.533 21.9 12 17.467 21.9 12 21.9z"/>
    </svg>
  );
}

export default function ContactForm() {
  const [name, setName]       = useState("");
  const [phone, setPhone]     = useState("");
  const [message, setMessage] = useState("");

  function handleWhatsApp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const text = `Hello Dr. Prashant Kariya,\n\nName: ${name}\nPhone: ${phone}\n\nMessage: ${message}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
  }

  return (
    <div className="bg-[#FAF9F6] pt-24 md:pt-32 pb-20 px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

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
            {/* Docon */}
            <a
              href={DOCON_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 md:p-6 bg-[#0A4B38] rounded-xl hover:bg-[#063322] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-250 group"
            >
              <div className="w-12 h-12 bg-[#C4973A]/20 rounded-xl flex items-center justify-center text-[#C4973A] shrink-0 group-hover:scale-110 transition-transform duration-250">
                <CalendarCheck size={19} />
              </div>
              <div>
                <p className="text-white/50 font-medium uppercase text-[10px] tracking-[0.2em] mb-1">Online Booking</p>
                <p className="font-display text-xl font-semibold text-[#F5E6C8]">Book via Docon</p>
                <p className="text-[11px] text-white/50 mt-0.5">Instant appointment confirmation</p>
              </div>
            </a>

            {/* Address 1 */}
            <div className="flex flex-col sm:flex-row sm:items-start gap-4 p-5 md:p-6 bg-white rounded-xl border border-[#E0E8E2] group">
              <div className="w-12 h-12 bg-[#E8F4EE] rounded-xl flex items-center justify-center text-[#0A4B38] shrink-0">
                <MapPin size={19} />
              </div>
              <div>
                <p className="text-[#6B7B6A] font-medium uppercase text-[10px] tracking-[0.2em] mb-1">Param NICU & Children Hospital</p>
                <p className="font-display text-base font-semibold text-[#063322] leading-snug">
                  801-803, Param Doctor House,<br />Lal Darwaja, Surat – 395003
                </p>
              </div>
            </div>

            {/* Address 2 */}
            <div className="flex flex-col sm:flex-row sm:items-start gap-4 p-5 md:p-6 bg-white rounded-xl border border-[#E0E8E2] group">
              <div className="w-12 h-12 bg-[#E8F4EE] rounded-xl flex items-center justify-center text-[#0A4B38] shrink-0">
                <MapPin size={19} />
              </div>
              <div>
                <p className="text-[#6B7B6A] font-medium uppercase text-[10px] tracking-[0.2em] mb-1">Param Children Hospital</p>
                <p className="font-display text-base font-semibold text-[#063322] leading-snug">
                  305-306, Seven Square,<br />Majura Gate, Surat – 395002
                </p>
              </div>
            </div>

          </div>
        </motion.div>

        {/* RIGHT: Form */}
        <motion.form
          onSubmit={handleWhatsApp}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.75 }}
          className="order-1 lg:order-2 bg-white p-8 md:p-10 rounded-2xl border border-[#E0E8E2] shadow-[0_8px_50px_rgba(6,51,34,0.07)] space-y-5"
        >
          <div>
            <h2 className="font-display text-2xl font-bold italic text-[#063322] mb-1">Send a Message</h2>
            <p className="text-[#6B7B6A] text-sm font-light">Fill the form and we'll chat on WhatsApp.</p>
          </div>

          <div>
            <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6B7B6A] ml-1 mb-2 block">Full Name</label>
            <input
              type="text"
              required
              placeholder="John Doe"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full bg-[#FAF9F6] border border-[#E0E8E2] p-4 rounded-xl text-[#063322] outline-none focus:border-[#0A4B38] focus:bg-white transition-all font-medium text-sm placeholder:text-[#B0BDB8]"
            />
          </div>

          <div>
            <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6B7B6A] ml-1 mb-2 block">Phone Number</label>
            <input
              type="tel"
              required
              placeholder="+91 00000 00000"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="w-full bg-[#FAF9F6] border border-[#E0E8E2] p-4 rounded-xl text-[#063322] outline-none focus:border-[#0A4B38] focus:bg-white transition-all font-medium text-sm placeholder:text-[#B0BDB8]"
            />
          </div>

          <div>
            <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6B7B6A] ml-1 mb-2 block">Message</label>
            <textarea
              rows={4}
              required
              placeholder="How can we help?"
              value={message}
              onChange={e => setMessage(e.target.value)}
              className="w-full bg-[#FAF9F6] border border-[#E0E8E2] p-4 rounded-xl text-[#063322] outline-none focus:border-[#0A4B38] focus:bg-white transition-all font-medium text-sm placeholder:text-[#B0BDB8]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#25D366] text-white p-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2.5 hover:bg-[#1ebe5d] hover:shadow-lg hover:shadow-[#25D366]/25 hover:-translate-y-px transition-all duration-250 tracking-wide"
          >
            <WhatsAppIcon size={17} />
            Send via WhatsApp
          </button>

          <div className="pt-2 border-t border-[#E0E8E2] text-center">
            <p className="text-[11px] text-[#6B7B6A] font-light">
              Prefer online booking?{" "}
              <a href={DOCON_URL} target="_blank" rel="noopener noreferrer" className="text-[#0A4B38] font-semibold hover:underline">
                Book via Docon →
              </a>
            </p>
          </div>
        </motion.form>

      </div>
    </div>
  );
}
