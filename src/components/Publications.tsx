import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import drBookSon from "../assets/dr-book-son.webp"
import drBookDaughter from "../assets/dr-book-daughter.webp"

const books = [
  {
    title: "Not Just A Daughter",
    desc: "A reflection on parenting and understanding the modern daughter.",
    coverBg: "bg-[#0A4B38]",
    spine: "bg-[#063322]",
    accentColor: "#C4973A",
    link: "https://amzn.in/d/4xOaL5B",
    image: drBookDaughter
  },
  {
    title: "Not Just A Son",
    desc: "Empathy, discipline, and awareness in raising the next generation.",
    coverBg: "bg-[#1A2E28]",
    spine: "bg-[#0D1F1B]",
    accentColor: "#A8C5BB",
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
            <span className="text-[#C4973A] font-medium uppercase tracking-[0.25em] text-[10px] block mb-3">
              Author & Speaker
            </span>
            <h2 className="font-display font-bold text-[#063322] tracking-tight"
              style={{ fontSize: "clamp(2.6rem, 5vw, 4.2rem)" }}>
              The <span className="italic">Archive</span>
            </h2>
          </div>
          <p className="text-[#4A5E54] text-sm max-w-[220px] leading-relaxed font-light">
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
              className="bg-white rounded-2xl p-8 md:p-10 border border-[#E0E8E2] hover:border-[#C5DDD3] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group flex flex-col sm:flex-row items-center gap-8"
            >
              {/* Book cover */}
              <div className="shrink-0 relative">
                {/* Shadow depth */}
                <div>
                  <img
                    src={book.image}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    alt="Medical Professional"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col justify-center text-center sm:text-left">
                <h4 className="font-display text-2xl md:text-3xl font-bold italic text-[#063322] mb-3 leading-tight">
                  {book.title}
                </h4>
                <p className="text-[#4A5E54] text-sm leading-relaxed mb-6 max-w-xs mx-auto sm:mx-0 font-light">
                  {book.desc}
                </p>
                <a
                  href={book.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center sm:justify-start gap-2 bg-[#0A4B38] text-[#F5E6C8] px-5 py-2.5 rounded-xl text-[11px] font-semibold uppercase tracking-[0.15em] hover:bg-[#063322] hover:shadow-lg hover:shadow-[#063322]/20 hover:-translate-y-px transition-all duration-250"
                >
                  Buy on Amazon <ExternalLink size={12} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
