import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { testimonialData } from "../data/testimonials";

const reviews = testimonialData.filter(t => t.rating_context === "Positive");

function toTitleCase(name: string) {
  return name.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ");
}

function initials(name: string) {
  return name.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();
}

function Card({ review }: { review: typeof reviews[0] }) {
  return (
    <div className="w-80 shrink-0 bg-white/8 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex flex-col gap-4 hover:bg-white/12 transition-colors duration-300">
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={13} className="text-[#C4973A] fill-[#C4973A]" />
        ))}
      </div>
      <p className="font-display italic text-white/85 text-base leading-relaxed flex-1">
        "{review.feedback}"
      </p>
      <div className="flex items-center gap-3 pt-2 border-t border-white/10">
        <div className="w-9 h-9 rounded-full bg-[#C4973A]/20 border border-[#C4973A]/30 flex items-center justify-center shrink-0">
          <span className="text-[#C4973A] text-[11px] font-bold tracking-wide">
            {initials(review.name)}
          </span>
        </div>
        <p className="text-white/60 text-xs font-medium tracking-wide">
          {toTitleCase(review.name)}
        </p>
      </div>
    </div>
  );
}

export default function Testimonial() {
  const doubled = [...reviews, ...reviews];

  return (
    <section className="py-20 md:py-24 bg-[#063322] overflow-hidden">

      {/* Header */}
      <div className="px-6 md:px-10 max-w-[1400px] mx-auto mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6"
        >
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 bg-[#C4973A]/15 border border-[#C4973A]/25 rounded-lg flex items-center justify-center">
                <Quote size={14} className="text-[#C4973A]" />
              </div>
              <span className="text-[#C4973A] font-medium uppercase tracking-[0.25em] text-[10px]">
                Patient Stories
              </span>
            </div>
            <h2
              className="font-display font-bold text-[#F5E6C8] tracking-tight leading-none"
              style={{ fontSize: "clamp(2.6rem, 5vw, 4.2rem)" }}
            >
              What Client <span className="italic text-[#C4973A]">Say.</span>
            </h2>
          </div>
          <p className="text-[#6B9A84] text-sm max-w-52 leading-relaxed font-light">
            Real experiences from families who trusted us with their children's care.
          </p>
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-linear-to-r from-[#063322] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-linear-to-l from-[#063322] to-transparent pointer-events-none" />

        <motion.div
          className="flex gap-5 w-max px-5"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {doubled.map((review, i) => (
            <Card key={i} review={review} />
          ))}
        </motion.div>
      </div>

      {/* Stat bar */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="px-6 md:px-10 max-w-[1400px] mx-auto mt-14 pt-10 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-6"
      >
        <div className="flex items-center gap-3">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={16} className="text-[#C4973A] fill-[#C4973A]" />
            ))}
          </div>
          <span className="font-display text-2xl font-bold italic text-[#F5E6C8]">4.8</span>
          <span className="text-[#6B9A84] text-xs font-medium uppercase tracking-[0.2em]">Average Rating</span>
        </div>
        <div className="flex items-center gap-8">
          <div className="text-center">
            <p className="font-display text-3xl font-bold italic text-[#C4973A]">500+</p>
            <p className="text-[#6B9A84] text-[10px] uppercase tracking-[0.2em] font-medium mt-1">Happy Families</p>
          </div>
          <div className="w-px h-10 bg-white/10" />
          <div className="text-center">
            <p className="font-display text-3xl font-bold italic text-[#C4973A]">15+</p>
            <p className="text-[#6B9A84] text-[10px] uppercase tracking-[0.2em] font-medium mt-1">Years Trusted</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
