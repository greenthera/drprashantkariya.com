import { motion } from "framer-motion";

export default function Instagram() {
  return (
    <section className="py-10 md:py-20 px-6 md:px-10 bg-white">
      <div className="max-w-[1400px] mx-auto">

        {/* Grid container */}
        <div className="bg-[#FAF9F6] rounded-2xl p-3 md:p-4 min-h-[500px] lg:h-[580px] grid grid-cols-2 md:grid-cols-4 lg:grid-rows-2 gap-3 md:gap-4 border border-[#E0E8E2]">

          {/* Main image */}
          <div className="col-span-2 row-span-1 lg:row-span-2 rounded-xl overflow-hidden h-72 md:h-96 lg:h-auto group">
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              alt="Pediatric Care"
            />
          </div>

          {/* Small image 1 */}
          <div className="hidden sm:block rounded-xl overflow-hidden bg-[#E8F4EE] group">
            <img
              src="https://images.unsplash.com/photo-1551076805-e1869033e561"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              alt="NICU Setup"
            />
          </div>

          {/* Small image 2 */}
          <div className="hidden sm:block rounded-xl overflow-hidden bg-[#E8F4EE] group">
            <img
              src="https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              alt="Medical Equipment"
            />
          </div>

          {/* Quote card — emerald */}
          <div className="col-span-2 bg-[#063322] rounded-xl p-7 md:p-10 flex flex-col justify-between relative overflow-hidden group min-h-[200px] lg:min-h-0">
            {/* Decorative rings */}
            <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full border border-[#C4973A]/15 pointer-events-none" />
            <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full border border-[#C4973A]/10 pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#0A4B38]/60 rounded-full pointer-events-none" />

            {/* Gold open-quote */}
            <div className="font-display text-6xl text-[#C4973A]/30 leading-none mb-2 relative z-10 select-none">
              "
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-display text-lg md:text-xl font-semibold italic text-white leading-snug relative z-10 max-w-xs -mt-4"
            >
              Children don't need perfect parents. They need present ones.
            </motion.p>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 relative z-10 pt-5 border-t border-white/8 mt-4">
              <span className="text-[#A8C5BB] text-[11px] font-medium tracking-wide">
                @drprashantkariya
              </span>
              <button className="bg-[#C4973A] text-white px-5 py-2 rounded-lg text-[11px] font-semibold hover:bg-[#B8893A] transition-colors w-full sm:w-auto text-center tracking-wide">
                Follow
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
