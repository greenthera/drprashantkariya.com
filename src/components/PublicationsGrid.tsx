import { motion } from "framer-motion";
import { ExternalLink, FileText, BookOpen, Newspaper, Microscope, GraduationCap } from "lucide-react";
import { PublicationsData } from "../data/publications";

const ICONS = [FileText, BookOpen, Newspaper, Microscope, GraduationCap];

function ordinal(i: number): string {
  return String(i + 1).padStart(2, "0");
}

export default function PublicationsGrid() {
  return (
    <div className="bg-[#FAF9F6] pt-24 md:pt-32 pb-20 px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-4"
        >
          <div>
            <span className="text-[#F2B33D] font-medium uppercase tracking-[0.25em] text-[10px] block mb-3">
              Research &amp; Academia
            </span>
            <h1
              className="font-display font-bold text-[#2E3A9E] tracking-tight"
              style={{ fontSize: "clamp(2.6rem, 5vw, 4.2rem)" }}
            >
              Published <span className="italic">Research.</span>
            </h1>
          </div>
          <p className="text-[#4F5A8A] text-sm md:max-w-70 leading-relaxed font-light">
            Peer-reviewed articles, clinical studies, and academic contributions across pediatric
            and adolescent health.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PublicationsData.map((pub, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: (i % 6) * 0.06 }}
                className="bg-white rounded-2xl border border-[#E0E8E2] hover:border-[#D6DBF5] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group flex flex-col overflow-hidden"
              >
                {/* "Image" — icon panel */}
                <div className="relative h-36 bg-linear-to-br from-[#4353CF] to-[#2E3A9E] flex items-center justify-center overflow-hidden shrink-0">
                  <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full border border-[#F2B33D]/15 pointer-events-none" />
                  <div className="absolute bottom-0 right-2 font-display text-6xl leading-none font-bold text-white/8 select-none pointer-events-none">
                    {ordinal(i)}
                  </div>
                  <div className="relative z-10 w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-[#F2B33D]/20 group-hover:scale-105 transition-all duration-300">
                    <Icon size={24} className="text-[#F2B33D]" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#4353CF] mb-2.5">
                    {pub.expert}
                  </span>
                  <h3 className="font-display text-[16px] font-bold text-[#2E3A9E] leading-snug mb-5 line-clamp-3 flex-1">
                    {pub.title}
                  </h3>
                  <a
                    href={pub.buttonurl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-[#4353CF] text-[#F5E6C8] px-4 py-2.5 rounded-lg text-[11px] font-semibold uppercase tracking-[0.15em] hover:bg-[#2E3A9E] hover:shadow-lg hover:shadow-[#2E3A9E]/20 hover:-translate-y-px transition-all duration-250 mt-auto"
                  >
                    Explore <ExternalLink size={12} />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
