import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section id="hero" className="pt-24 md:pt-32 pb-10 px-4 md:px-6 bg-[#F8FAFC]">
      {/* Grid: 1 column on mobile, 12 columns on desktop */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
        
        {/* --- LEFT CONTENT CARD --- */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          /* Responsive Padding: p-8 on mobile, p-16 on tablet, p-24 on desktop */
          className="order-2 lg:order-1 lg:col-span-8 bg-white rounded-[2.5rem] md:rounded-[4rem] border border-slate-100 shadow-sm p-8 md:p-16 lg:p-24 flex flex-col justify-center relative overflow-hidden"
        >
          {/* Blur decoration - hidden on small mobile to save performance */}
          <div className="hidden sm:block absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-full blur-3xl -mr-20 -mt-20" />

          <div className="max-w-2xl relative z-10">
            <div className="flex items-center gap-2 mb-6 md:mb-8 bg-blue-50 w-fit px-4 py-2 rounded-full border border-blue-100">
              <Sparkles size={12} className="text-blue-600 md:w-3.5 md:h-3.5" />
              <span className="text-blue-600 font-bold uppercase tracking-[0.3em] text-[8px] md:text-[9px]">
                Surat's Premier Pediatrician
              </span>
            </div>

            {/* Typography: Scales from text-5xl (mobile) to text-7xl (desktop) */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[6.5rem] xl:text-[7rem] font-black text-slate-900 leading-[0.9] md:leading-[0.85] tracking-tighter mb-6 md:mb-10 uppercase">
              Nurturing <br/> 
              <span className="text-blue-600 italic">Futures.</span>
            </h1>

            <p className="text-slate-400 text-base md:text-xl mb-8 md:mb-12 leading-relaxed font-medium max-w-lg">
              Advanced Level III NICU precision meets the warmth of a 
              doctor who treats every child like their own.
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-6 md:gap-8">
              <Link to="/contact"  className="w-full sm:w-auto bg-blue-600 text-white px-8 md:px-10 py-4 md:py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-transform shadow-xl shadow-blue-100">
                Book Appointment
              </Link>
              
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 md:border-4 border-white bg-slate-200" />
                  ))}
                </div>
                <p className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-slate-400 leading-tight">
                  Trusted by <br/> 5k+ Parents
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* --- RIGHT IMAGE CARD --- */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          /* Order-1 on mobile puts the image above the text card when stacking */
          className="order-1 lg:order-2 lg:col-span-4 rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-2xl relative min-h-[300px] sm:min-h-[400px] lg:h-auto"
        >
          <img 
            src="https://images.unsplash.com/photo-1516549655169-df83a0774514" 
            className="w-full h-full object-cover" 
            alt="Doctor caring for a child" 
          />
          
          {/* Floating Pill: Shrinks on mobile to fit */}
          <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 bg-white/90 backdrop-blur-md p-4 md:p-6 rounded-[2rem] md:rounded-[2.5rem] border border-white/50 flex justify-between items-center">
            <div>
              <p className="text-2xl md:text-3xl font-black text-blue-600 leading-none">15+</p>
              <p className="text-[7px] md:text-[8px] uppercase font-black tracking-widest text-slate-400 mt-1">Exp.</p>
            </div>
            <div className="w-[1px] h-8 md:h-10 bg-slate-200" />
            <div className="text-right">
              <p className="text-lg md:text-xl font-black text-slate-900 leading-none">PARAM</p>
              <p className="text-[7px] md:text-[8px] uppercase font-black tracking-widest text-slate-400 mt-1">Hospital</p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}