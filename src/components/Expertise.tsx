import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Baby, Activity, Heart, Shield } from "lucide-react";

const services = [
  { id: 1, title: "NICU", icon: <Baby />, desc: "Level III Newborn Intensive Care for premature and high-risk infants.", details: "Advanced ventilation, total parenteral nutrition, and 24/7 monitoring." },
  { id: 2, title: "Pediatrics", icon: <Heart />, desc: "Complete child development, growth, and general wellness tracking.", details: "Routine checkups, nutritional guidance, and physical assessments." },
  { id: 3, title: "Critical Care", icon: <Activity />, desc: "Emergency pediatric response and complex medical management.", details: "High-dependency care units and acute illness intervention." },
  { id: 4, title: "Vaccination", icon: <Shield />, desc: "Safe immunization following global painless protocol standards.", details: "International vaccine tracking and safe injection practices." },
];

export default function Expertise() {
  const [active, setActive] = useState(services[0]);

  return (
    <section id="expertise" className="py-16 md:py-24 px-4 md:px-6 bg-white">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Responsive Heading */}
        <h2 className="text-4xl md:text-5xl font-[900] mb-10 md:mb-16 text-slate-900 tracking-tighter uppercase text-center italic">
          Specialized <span className="text-blue-600">Services</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          
          {/* --- TAB NAVIGATION --- */}
          {/* Mobile: Horizontal scroll | Desktop: Vertical column */}
          <div className="lg:col-span-4 flex lg:flex-col gap-3 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide snap-x">
            {services.map((s) => (
              <button 
                key={s.id} 
                onClick={() => setActive(s)}
                className={`p-5 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] text-left transition-all flex items-center gap-4 shrink-0 lg:shrink snap-center group ${
                  active.id === s.id 
                    ? 'bg-blue-600 text-white shadow-xl shadow-blue-100' 
                    : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                }`}
              >
                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  active.id === s.id ? 'bg-white/20' : 'bg-white shadow-sm'
                }`}>
                  {/* Scaling icon for mobile */}
                  {cloneElement(s.icon, { size: 18, className: "md:w-5 md:h-5" })}
                </div>
                <span className="font-[900] uppercase tracking-tighter text-sm md:text-lg whitespace-nowrap">
                  {s.title}
                </span>
              </button>
            ))}
          </div>

          {/* --- CONTENT DISPLAY --- */}
          <div className="lg:col-span-8 bg-slate-50 rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-16 lg:p-24 relative overflow-hidden min-h-[350px] md:min-h-[500px] flex items-center">
             <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, x: 20 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: "circOut" }}
                  className="w-full"
                >
                  <h3 className="text-4xl md:text-6xl font-[900] text-slate-900 mb-6 md:mb-8 uppercase tracking-tighter leading-[0.9]">
                    {active.title}
                  </h3>
                  <p className="text-slate-500 text-lg md:text-2xl mb-6 md:mb-8 font-medium leading-relaxed max-w-2xl">
                    {active.desc}
                  </p>
                  <div className="border-l-4 border-blue-600 pl-4 md:pl-6">
                    <p className="text-slate-400 text-sm md:text-lg italic font-medium uppercase tracking-tight">
                      {active.details}
                    </p>
                  </div>
                </motion.div>
             </AnimatePresence>

             {/* Background Decoration for Premium Look */}
             <div className="absolute bottom-[-10%] right-[-5%] text-slate-100 font-black text-[15rem] select-none pointer-events-none uppercase tracking-tighter opacity-50 hidden md:block">
               {active.title.charAt(0)}
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Helper to handle icon sizing inside the map
import { cloneElement } from "react";