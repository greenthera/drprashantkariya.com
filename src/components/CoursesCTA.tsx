import { motion } from "framer-motion";
import { Link } from "react-router";
import { GraduationCap, ArrowRight, BookOpen } from "lucide-react";

export default function CoursesCTA() {
  return (
    <section className="py-16 md:py-20 px-6 md:px-10 bg-[#FAF9F6] relative overflow-hidden">

      {/* Decorative bg elements */}
      <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[#EAEDFB] pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-[#EAEDFB]/60 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="bg-[#4353CF] rounded-2xl px-8 md:px-14 py-10 md:py-12 flex flex-col items-center text-center gap-5 max-w-3xl mx-auto"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-[#F2B33D]/15 border border-[#F2B33D]/25 rounded-lg flex items-center justify-center">
              <GraduationCap size={14} className="text-[#F2B33D]" />
            </div>
            <span className="text-[#F2B33D] font-medium uppercase tracking-[0.25em] text-[10px]">
              Learn With Us
            </span>
          </div>

          <h2
            className="font-display font-bold text-white tracking-tight leading-[0.95]"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
          >
            Explore Our <span className="italic text-[#F2B33D]">Courses.</span>
          </h2>

          <p className="text-white/70 text-sm leading-relaxed max-w-md font-light">
            Practical, expert-led courses on parenting, safety, and clinical
            skill-building — learn at your own pace.
          </p>

          <div className="flex items-center gap-2 text-white/70 text-xs font-medium bg-white/10 px-4 py-2.5 rounded-full border border-white/15">
            <BookOpen size={13} className="text-[#F2B33D]" />
            <span>Self-Paced &nbsp;|&nbsp; Free &amp; Paid Courses</span>
          </div>

          <Link
            to="/courses"
            className="inline-flex items-center gap-2.5 bg-[#F2B33D] text-[#2E3A9E] px-8 py-3.5 rounded-xl font-semibold text-sm hover:bg-[#F5C264] hover:shadow-xl hover:-translate-y-0.5 transition-all duration-250 tracking-wide"
          >
            View Courses <ArrowRight size={15} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
