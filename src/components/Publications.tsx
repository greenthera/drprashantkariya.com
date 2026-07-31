import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import drBookSon from "../assets/dr-book-son.webp"
import drBookDaughter from "../assets/dr-book-daughter.webp"

const books = [
  {
    title: "Not Just A Daughter",
    desc: "A thoughtful guide for parents navigating the journey of raising a daughter in today's world. Dr. Kariya draws on decades of clinical experience and real patient stories to illuminate the emotional, physical, and social milestones that define a girl's growth — from early childhood through adolescence. With warmth and scientific grounding, this book empowers parents to listen more deeply, respond more wisely, and build bonds that last a lifetime.",
    link: "https://amzn.in/d/4xOaL5B",
    image: drBookDaughter
  },
  {
    title: "Not Just A Son",
    desc: "Raising a son is far more than teaching strength — it's about shaping empathy, resilience, and character. In this compelling read, Dr. Kariya explores the unique challenges boys face growing up, from identity and peer pressure to emotional expression and health. Backed by medical insight and a father's perspective, this book offers practical wisdom to help parents guide their sons with both discipline and deep understanding.",
    link: "https://amzn.in/d/bZR0MMH",
    image: drBookSon
  },
];

export default function Publications() {
  return (
    <section id="publication" className="py-20 md:py-24 px-6 md:px-10 bg-[#FAF9F6]">
      <div className="max-w-[1400px] mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-4"
        >
          <div>
            <span className="text-[#F2B33D] font-medium uppercase tracking-[0.25em] text-[10px] block mb-3">
              Author & Speaker
            </span>
            <h2 className="font-display font-bold text-[#2E3A9E] tracking-tight"
              style={{ fontSize: "clamp(2.6rem, 5vw, 4.2rem)" }}>
              The <span className="italic">Archive</span>
            </h2>
          </div>
          <p className="text-[#4F5A8A] text-sm max-w-[220px] leading-relaxed font-light">
            Titles on parenting, empathy, and raising the next generation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {books.map((book, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: i * 0.15 }}
              className="bg-white rounded-2xl p-7 md:p-9 border border-[#E0E8E2] hover:border-[#D6DBF5] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group flex flex-col sm:flex-row items-start gap-7 md:gap-10"
            >
              {/* Book cover */}
              <div className="shrink-0 w-36 md:w-44 rounded-xl overflow-hidden shadow-[0_8px_30px_rgba(6,51,34,0.15)] self-center sm:self-start">
                <img
                  src={book.image}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  alt={book.title}
                />
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 text-center sm:text-left min-h-0">
                <h4 className="font-display text-2xl md:text-3xl font-bold italic text-[#2E3A9E] mb-3 leading-tight">
                  {book.title}
                </h4>
                <p className="text-[#4F5A8A] text-sm leading-relaxed font-light flex-1">
                  {book.desc}
                </p>
                <div className="mt-6">
                  <a
                    href={book.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center sm:justify-start gap-2 bg-[#4353CF] text-[#F5E6C8] px-5 py-2.5 rounded-xl text-[11px] font-semibold uppercase tracking-[0.15em] hover:bg-[#2E3A9E] hover:shadow-lg hover:shadow-[#2E3A9E]/20 hover:-translate-y-px transition-all duration-250"
                  >
                    Buy on Amazon <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
