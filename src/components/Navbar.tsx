import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "About", to: "/#about" },
    { name: "Expertise", to: "/#expertise" },
    { name: "Clinics", to: "/#clinics" },
    { name: "Books", to: "/#publication" },
  ];

  return (
    <>
      <motion.nav 
        initial={{ y: -50, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-4 md:top-8 left-0 right-0 z-[100] flex justify-center px-4 md:px-6"
      >
        <div className="bg-white/80 backdrop-blur-2xl border border-white/20 px-5 md:px-10 py-3 md:py-4 rounded-full flex items-center justify-between w-full max-w-[1400px] shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
          
          {/* --- LOGO SECTION --- */}
          <HashLink smooth to="/#hero" className="flex items-center gap-2 md:gap-3 group">
            <div className="bg-blue-600 p-2 md:p-2.5 rounded-xl text-white shadow-lg shadow-blue-100 group-hover:scale-110 transition-transform">
              <Activity size={18} strokeWidth={3} className="md:w-5 md:h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm md:text-lg font-[900] tracking-tighter text-slate-900 uppercase leading-none italic">
                Dr. Prashant <span className="text-blue-600">Kariya</span>
              </span>
              <span className="text-[6px] md:text-[7px] font-black uppercase tracking-[0.2em] text-slate-400 leading-none mt-1">
                Pediatric Excellence
              </span>
            </div>
          </HashLink>

          {/* --- DESKTOP LINKS --- */}
          <div className="hidden lg:flex gap-10 text-[10px] font-black uppercase tracking-widest text-slate-400">
            {navLinks.map((link) => (
              <HashLink key={link.name} smooth to={link.to} className="hover:text-blue-600 transition-colors">
                {link.name}
              </HashLink>
            ))}
          </div>

          {/* --- RIGHT ACTIONS --- */}
          <div className="flex items-center gap-2">
            <Link to="/contact" className="hidden sm:block bg-slate-900 text-white px-6 md:px-8 py-2.5 md:py-3 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] hover:bg-blue-600 transition-all">
              Book Now
            </Link>
            
            {/* Mobile Toggle */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-slate-900 hover:bg-slate-50 rounded-full transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* --- MOBILE OVERLAY MENU --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[90] bg-white pt-32 px-8 lg:hidden"
          >
            <div className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <HashLink 
                  key={link.name} 
                  smooth 
                  to={link.to} 
                  onClick={() => setIsOpen(false)}
                  className="text-4xl font-[900] text-slate-900 uppercase tracking-tighter italic border-b border-slate-100 pb-4"
                >
                  {link.name}
                </HashLink>
              ))}
              <Link 
                to="/contact" 
                onClick={() => setIsOpen(false)}
                className="bg-blue-600 text-white p-6 rounded-3xl text-center font-black uppercase tracking-widest text-sm shadow-xl shadow-blue-100"
              >
                Book Appointment
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}